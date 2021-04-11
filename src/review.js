class Review {

  static all = [];
  static reviewContainer = document.querySelector(".js-review-card-container");
  static reviewModal = document.querySelector(".js-modal");
  static reviewPgTitle = document.querySelector(".js-reviews-header");
  
  static hiLoSortBtn = document.querySelector(".js-sort-high-low");
  static loHiSortBtn = document.querySelector(".js-sort-low-high");

  static params = {query: "", page: ""};
  static lastPg = "";
  static nextPg = "";
  static prevPg = "";

  static firstPgBtn = document.querySelector(".js-first-pg-btn");
  static lastPgBtn = document.querySelector(".js-last-pg-btn");
  static nextPgBtn = document.querySelector(".js-next-pg-btn");
  static prevPgBtn = document.querySelector(".js-prev-pg-btn");

  constructor({id, username, content, review_image, rating, created_at}) {
    this.id = id;
    this.username = username;
    this.content = content;
    this.imageLink = review_image ? review_image["cloudinary"] : `/images/review-images/review-img-${Review.setImgNum(1, 6)}.png`;
    this.rating = rating;
    this.created_at = created_at;
    this.formattedDateTime = Review.formatDateTime(created_at);

    this.element = document.createElement('article');
    this.element.classList.add("review-card");
    Review.all.push(this);
  }

  static formatDateTime = (dateTime) => {
    const d = new Date(dateTime);
    const formattedDateTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " - " + d.toLocaleDateString();
    return formattedDateTime;
  }

  static setImgNum = (min, max) => {
    let x = Math.random() * (max-min + 1);
    return Math.floor(x) + min;
  }

  displayRating() {
    const ratingDiv = document.createElement("div")
    for(let i=1; i <= 5; i++) {
      const classStatus = (i <= this.rating) ? " checked" : "";
      const icon = `<i class="fas fa-paw${classStatus}" title="${i}" value="${i}"></i>`;
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
    date.innerText = this.formattedDateTime;
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
    Review.reviewContainer.appendChild(this.element);
  }

  static attachReviewsToDom = () => {
    Review.all.forEach(review => review.attachToDom());
  } 

  static displayReviews = () => {
    Review.reviewContainer.innerHTML = "";
    Review.attachReviewsToDom();

    document.querySelector(".js-exhibits").style.display = "none";
    document.querySelector(".js-reviews").style.display = "block";
    document.querySelector(".js-main-display").style.display = "none";
    document.querySelector(".js-to-top").style.display = "block";
  }

  static handleClick = (e) => {
    if (e.target === document.querySelector(".js-add-review-btn")) {
      Review.reviewModal.style.display = "block";
      Review.renderModalContent();
    } else if (e.target === document.querySelector(".js-close-modal")) {
      Review.reviewModal.style.display = "none";
    } else if (e.target.classList.contains("js-fetch")) {
        Review.handleSortablePagination(e.target);
    }
  }

  static handleSortablePagination = (target) => {
    if (target === Review.hiLoSortBtn) {
      Review.params = {query: "hi-lo", page: 1};
      Review.setSelectedQuery(target);
    } else if (target === Review.loHiSortBtn) {
      Review.params = {query: "lo-hi", page: 1};
      Review.setSelectedQuery(target);
    } else if (document.querySelector(".js-pagination-btns").contains(target)) {
        if (target === Review.firstPgBtn) {
          Review.params["page"] = 1;
        } else if (target === Review.lastPgBtn) {
          Review.params["page"] = Review.lastPg;
        } else if (target === Review.prevPgBtn || target === Review.prevPgBtn.firstElementChild) {
          Review.params["page"] = Review.prevPg;
        } else if (target === Review.nextPgBtn || target === Review.nextPgBtn.firstElementChild) {
          Review.params["page"] = Review.nextPg;
        }
        scrollUp(Review.reviewPgTitle);
      }
    reviewApi.getReviews(Review.params);
  }

  static setSelectedQuery = (clickTarget) => {
    document.querySelectorAll(".js-sort-btns button").forEach(btn => {
      if (clickTarget === btn) {
        btn.classList.add("js-selected-query");
      } else {
        btn.classList.remove("js-selected-query");
      }
    });
  }

  static setPaginationBtns = (pageData) => {
    Review.currentPg = pageData.current_page;
    Review.prevPg = pageData.prev_page;
    Review.lastPg = pageData.total_pages;
    Review.nextPg = pageData.next_page;

    (Review.prevPg === 1 || Review.currentPg === 1) ? Review.firstPgBtn.style.display = "none" : Review.firstPgBtn.style.display = "inline-block";
    Review.prevPg ? Review.prevPgBtn.style.display = "inline-block" : Review.prevPgBtn.style.display = "none";
    Review.nextPg ? Review.nextPgBtn.style.display = "inline-block" : Review.nextPgBtn.style.display = "none";
    Review.lastPg.to_i <= 2 ? Review.lastPgBtn.style.display = "inline-block" : Review.lastPgBtn.style.display = "none";
  }

  static handleSubmit = (e) => {
      e.preventDefault();
      let reviewApi = new ReviewApi(port);
      reviewApi.createReview(e);
  }

  static renderModalContent = () => {
    Review.reviewModal.innerHTML = "";

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalContent.classList.add("js-modal-content");

    modalContent.innerHTML = `
      <button class="js-close-modal close text-button">&times;</button>
      <h2>Add a review</h2>
      <form class="js-review-form">
        <div class="grid">
          <div>
            <label for="username">Display name:*</label><br>
            <input type="text" name="username" class="js-review-username" required><br>
            <label for="rating">Rating:*</label><br>
            <select name="rating" class="js-review-rating" required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label for="image">Upload image:</label><br>
            <input type="file" name="image" accept="image/jpeg, image/png" class="js-review-image"><br>
          </div>
          <div>
            <label for="content">Share your experience:*</label><br>
            <textarea class="js-review-content" name="content" rows="10" cols="20" wrap="soft" maxlength="1000" placeholder="1000 character limit"required ></textarea><br>
          </div>
        </div>
        <input type="submit" value="Save" class="button-primary">
      </form>
    `;
    Review.reviewModal.appendChild(modalContent);
    document.querySelector(".js-review-form").addEventListener("submit", Review.handleSubmit);
  }

  static handleSuccessfulReview = () => {
    const modalContent = document.querySelector(".js-modal-content");
    modalContent.innerHTML = "";

    const successMsg = document.createElement("h2");
    successMsg.innerText = "Thanks for the review!";
    modalContent.appendChild(successMsg);
    setTimeout(() => {
      Review.reviewModal.style.display = "none";
      reviewApi.getReviews({query: "", page: 1});
    }, 2000);
  }
}