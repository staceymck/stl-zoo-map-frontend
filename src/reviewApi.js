class ReviewApi {

  constructor(port) {
    this.baseUrl = `${port}/reviews`
  }

  getReviews = () => {
    fetch(this.baseUrl)
    .then(resp => resp.json())
    .then(data => {
      data.forEach(reviewData => {
        const r = new Review(reviewData);
        r.attachToDom();
      })
    })
  }

  createReview = () => {
    //const formData = new FormData(e.target);
    const imageFile = document.querySelector("#review-image").files[0];
    
    const formData = new FormData();
    formData.append('review[username]', document.querySelector("#review-username").value);
    formData.append('review[rating]', document.querySelector("#review-rating").value);
    formData.append('review[content]', document.querySelector("#review-content").value);
    formData.append('review[image]', imageFile, imageFile.name); 

    console.log(formData);

    const configObj = {
      method: "POST",
      headers: {
        //no content-type for FormData
        "Accept": "application/json" 
      },
      body: formData
    }

    fetch(this.baseUrl, configObj)
    .then(res => res.json())
    .then(data => {
      new Review(data)
      //would I need to re-render the reviews page?
    })
    .catch(error => {
      alert("Unable to process request");
      console.log(error.message);
    })
  }
}
