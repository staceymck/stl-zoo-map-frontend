class Review {

  static all = [];
  static reviewContainer = document.querySelector("#review-card-container");
  static newReviewModal = document.querySelector("#review-modal");

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
   
    img.src = this.imageLink;
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

  static renderReviews = (sortFilter) => {
    if (sortFilter === "highest-rating") {
      const sortedAll = Review.all.sort((a, b) => b.rating - a.rating);
      sortedAll.forEach(review => review.attachToDom());
    } else if(sortFilter === "lowest-rating") {
      const sortedAll = Review.all.sort((a, b) => a.rating - b.rating);
      sortedAll.forEach(review => review.attachToDom());
    } else {
      Review.all.forEach(review => review.attachToDom());
    } 
  }

  static displayReviews = (sortFilter) => {
    Review.reviewContainer.innerHTML = "";

    if(Review.all.length === 0) {
      const reviewApi = new ReviewApi("http://localhost:3000") //how to make this dynamic?
      reviewApi.getReviews();
    } else {
      Review.renderReviews(sortFilter);
    }

    document.querySelector("#exhibits").style.display = "none";
    document.querySelector("#reviews").style.display = "block";
    document.querySelector("#main-display").style.display = "none";
    document.querySelector("#to-top").style.display = "block";
  }

  //is this the best place for this code?

  static handleClick = (e) => {
    //e.preventDefault();
    if (e.target === document.querySelector("#add-review")) {
      Review.newReviewModal.style.display = "block";
      Review.renderModalContent();
    } else if (e.target === document.querySelector("#close-review-modal")) {
      Review.newReviewModal.style.display = "none";
    } else if (e.target === document.querySelector("#highest-rating")) {
      Review.displayReviews("highest-rating");
    } else if (e.target === document.querySelector("#lowest-rating")) {
      Review.displayReviews("lowest-rating");
    }
  }

  static handleSubmit = (e) => {
      e.preventDefault();
      let reviewApi = new ReviewApi("http://localhost:3000") //how to make this dynamic?
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
            <select name="rating" id="review-rating">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label for="image">Upload image:</label><br>
            <input type="file" name="image" accept="image/jpeg, image/png" id="review-image"><br>
          </div>
          <div>
            <label for="content">Share your experience:*</label><br>
            <textarea id="review-content" name="content" rows="10" cols="20" wrap="soft" maxlength="1000" placeholder="1000 character limit"></textarea><br>
          </div>
        </div>
        <input type="submit" value="Save" class="button-primary">
      </form>
    `
    Review.newReviewModal.appendChild(modalContent);
    document.querySelector("#new-review").addEventListener("submit", Review.handleSubmit);
    //document.querySelector("#close-review-modal").addEventListener("click", Review.handleClick);
    //document.querySelector("#rating-selector").addEventListener("click", Review.selectRating);
  }


  // static colorRatingPaws = (e) => {
  //   const clickedPawValue = parseInt(e.target.title);
  //   let i=0;
  //   while (i<=clickedPawValue) {
  //     const pawId = i.toString()
  //   }
  // }

  // calculateRating = () => {

  // }

}

