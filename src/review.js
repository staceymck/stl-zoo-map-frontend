class Review {

  static all = {};
  static reviewContainer = document.querySelector("#review-card-container");
  static newReviewModal = document.querySelector("#review-modal");

  static ratingPaws = []

  constructor({id, username, content, review_image, rating, date}) {
    this.id = id;
    this.username = username;
    this.content = content;
    this.imageLink = review_image["cloudinary"];
    this.rating = rating;
    this.date = date;

    this.element = document.createElement('div');
    this.element.classList.add("review-card");
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
    const contentDiv = document.createElement("div");
    const flexDiv = document.createElement("div");
    const date = document.createElement("p");
    const user = document.createElement("h3");
    const content = document.createElement("p");
    const rating = this.displayRating();
   
    img.src = this.imageLink; //or one of the default images - could handle this with a separate 'displayImage' function
    user.innerText = this.username;
    content.innerText = this.content;
    date.innerText = this.date;
    flexDiv.classList.add("flex-row");
    
    flexDiv.appendChild(user);
    flexDiv.appendChild(date);
    contentDiv.appendChild(flexDiv);
    contentDiv.appendChild(rating);
    contentDiv.appendChild(content);

    this.element.appendChild(img);
    this.element.appendChild(contentDiv);
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
      const reviewApi = new ReviewApi("http://localhost:3000") //how to make this dynamic?
      reviewApi.getReviews();
    } else {
      Review.renderReviews();
    }

    document.querySelector("#exhibits").style.display = "none";
    document.querySelector("#reviews").style.display = "block";
    document.querySelector("#main-display").style.display = "none";
    document.querySelector("#to-top").style.display = "block";
  }

  //is this the best place for this code?

  static handleClick = (e) => {
    if (e.target === addReviewButton) {
      Review.newReviewModal.style.display = "block";
      Review.renderModalContent();
    } else if (e.target === document.querySelector("#close-review-modal")) {
      Review.newReviewModal.style.display = "none";
    }
  }

  static handleSubmit = (e) => {
      e.preventDefault();
      const reviewApi = new ReviewApi("http://localhost:3000") //how to make this dynamic?
      reviewApi.createReview(e);
  }

  static renderModalContent = () => {
    Review.newReviewModal.innerHTML = "";

    const modalContent = document.createElement("div");
    modalContent.id = "review-modal-content";
    modalContent.classList.add("modal-content");

    modalContent.innerHTML = `
      <button id="close-review-modal" class="close text-button">&times;</button>
      <h2>Add a review</h2>
      <form id="new-review">
        <div class="grid">
          <div>
            <label for="username">Display name:*</label><br>
            <input type="text" name="username" id="review-username"><br>
            <label for="rating">Rating:*</label><br>
            <input type="number" name="rating" id="review-rating"><br>
            <label for="image">Upload image:</label><br>
            <input type="file" name="image" accept="image/*"><br>
          </div>
          <div>
            <label for="content">Share your experience:*</label><br>
            <textarea id="review-content" name="content" rows="10" cols="20" wrap="hard" maxlength="1000" placeholder="1000 character limit"></textarea><br>
          </div>
        </div>
        <input type="submit" value="Save">
      </form>
    `
    Review.newReviewModal.appendChild(modalContent);
    document.querySelector("#new-review").addEventListener("submit", Review.handleSubmit);
    document.querySelector("#close-review-modal").addEventListener("click", Review.handleClick);
  }


}

