const port = "http://localhost:3000";
const zoneApi = new ZoneApi(port);
const attractionApi = new AttractionApi(port);
const exhibitApi = new ExhibitApi(port);
const reviewApi = new ReviewApi(port);

const logo = document.querySelector(".js-logo");
const mainDisplay = document.querySelector(".js-main-display");
const mapGroups = document.querySelectorAll(".js-map-group");
const viewReviewsButton = document.querySelector(".js-view-reviews-btn");
const reviewsContainer = document.querySelector(".js-reviews");
const toTopIcon = document.querySelector(".js-to-top-btn");

//Get core data and setup map
attractionApi.getAttractions();
zoneApi.setupZonesWithMap(mapGroups);
exhibitApi.getExhibits();

// Reset page to home view on logo click
const renderHomeView = () => {
  MapZone.all.forEach(zone => zone.element.classList.remove("inactive"));
  mainDisplay.classList.remove("zone-selected")
  
  mainDisplay.style.display = "";
  document.querySelector(".js-reviews").style.display = "none";
  document.querySelector(".js-exhibits").style.display = "none";
  document.querySelector(".js-exhibit-card-container").innerHTML = "";
  document.querySelector(".js-to-top").style.display = "none";
}

//Set event listeners on already-present DOM elements
viewReviewsButton.addEventListener("click", (e) => {
  Review.setSelectedQuery(e.target);
  reviewApi.getReviews()
});

reviewsContainer.addEventListener("click", Review.handleClick);
logo.addEventListener('click', renderHomeView);

const scrollUp = (focusElement) => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
  setTimeout(() => {
    focusElement.focus()
  }, 1000)
}

toTopIcon.addEventListener("click", () => {
  scrollUp(document.querySelector(".js-site-name"));
})


//Display Toggle

// const toggleVisibility = (element, visibleStyle) => {
//   if (element.style.display === "none") {
//     element.style.display === visibleStyle;
//   } else {
//     element.style.display === "none";
//   }
// }






