class ReviewApi {

  constructor(port) {
    this.baseUrl = `${port}/reviews`;
  }

  getReviews = (params = {query: "", page: ""}) => {
    let page = "";
    let query = "";

    if (params.page) {page = "page=" + params['page']};
    if (params.query) {query = "q=" + params['query']};

    let url = this.baseUrl;
    if (page || query) {url = url + "?"};

    if (page && query) {
      url = url + page + "&" + query;
    } else if (page) {
      url = url + page;
    } else if (query) {
      url = url + query;
    }

    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      Review.setPaginationBtns(data["metadata"]);

      Review.all = [];
      data["reviews"].forEach(reviewData => {
        const r = new Review(reviewData);
        Review.displayReviews();
      })
    })
  }

  createReview = () => {
    const imageFile = document.querySelector(".js-review-image").files[0];
    
    const formData = new FormData();
    formData.append('review[username]', document.querySelector(".js-review-username").value);
    formData.append('review[rating]', document.querySelector(".js-review-rating").value);
    formData.append('review[content]', document.querySelector(".js-review-content").value);
    if(imageFile) {
      formData.append('review[image]', imageFile, imageFile.name); 
    }
    
    const configObj = {
      method: "POST",
      headers: {
        //no content-type for FormData
        "Accept": "application/json" 
      },
      body: formData
    }

    fetch(this.baseUrl, configObj)
    .then(res => {
      if(!res.ok) {throw res}
      return res.json();
    })
    .then(data => {
      new Review(data)
      Review.handleSuccessfulReview();
    })
    .catch(error => {
      alert("Unable to process request. Please try again.");
      console.log(error.message);
    })
  }
}
