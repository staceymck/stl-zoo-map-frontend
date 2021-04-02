class Review {

  static all = {};
  static reviewContainer = document.querySelector("#review-card-container");
  static ratingPaws = []

  constructor({id, username, content, review_image, rating}) {
    this.id = id;
    this.username = username;
    this.content = content;
    this.imageLink = review_image["cloudinary"];
    this.rating = rating;

    this.element = document.createElement('div');
    this.element.classList.add("review-card");
    //this.element.id = `review-${id}`;
    Review.all[this.id] = this;
  }

  displayRating() {
    const ratingDiv = document.createElement("div")
    for(let i=1; i <= 5; i++) {
      const classStatus = (i <= this.rating) ? " checked" : ""
      const icon = `<i class="fas fa-paw${classStatus}" title="${i}" value="${i}"></i>`
      ratingDiv.innerHTML += icon;
    }
    return ratingDiv;
  }

  render() {
    this.element.innerHTML = "";

    const img = document.createElement("img");
    const div = document.createElement("div");
    const user = document.createElement("h3");
    const content = document.createElement("p");
    const rating = this.displayRating();
   
    img.src = this.imageLink;
    user.innerText = this.username;
    content.innerText = this.content;
    
    div.appendChild(user);
    div.appendChild(rating);
    div.appendChild(content);

    this.element.appendChild(img);
    this.element.appendChild(div);
  }

  attachToDom() {
    this.render();
    Review.reviewContainer.appendChild(this.element)
  }

  static renderReviews = () => {
    Object.values(Review.all).forEach(review => review.attachToDom());
  }

  static displayReviews = () => {
    Review.reviewContainer.innerHTML = "";

    if(Object.keys(Review.all).length === 0) {
      console.log("hill");
      const reviewApi = new ReviewApi("http://localhost:3000") //how to make this dynamic?
      reviewApi.getReviews();
    } else {
      Review.renderReviews();
      console.log("hi")
    }

    document.querySelector("#exhibits").style.display = "none";
    document.querySelector("#reviews").style.display = "block";
    document.querySelector("#main-display").style.display = "none";
  }
}

