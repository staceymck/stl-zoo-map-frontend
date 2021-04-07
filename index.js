const port = "http://localhost:3000";
const zoneApi = new ZoneApi(port);
const attractionApi = new AttractionApi(port);
const exhibitApi = new ExhibitApi(port);

const logo = document.querySelector(".logo");
const mainDisplay = document.querySelector(".main-display");
const mapGroups = document.querySelectorAll("g");
const viewReviewsButton = document.querySelector(".view-reviews");
const reviewsContainer = document.querySelector(".reviews");
const toTopIcon = document.querySelector(".to-top-btn");

//Get core data and setup map
attractionApi.getAttractions();
zoneApi.setupZonesWithMap(mapGroups);
exhibitApi.getExhibits();

// Reset page to home view on logo click
renderHomeView = () => {
  MapZone.all.forEach(zone => zone.element.classList.remove("inactive"));
  mainDisplay.classList.remove("zone-selected")
  
  mainDisplay.style.display = "";
  document.querySelector(".reviews").style.display = "none";
  document.querySelector(".exhibits").style.display = "none";
  document.querySelector(".exhibit-card-container").innerHTML = "";
  document.querySelector(".to-top").style.display = "none";
}

//Set event listeners on already-present DOM elements
viewReviewsButton.addEventListener("click", Review.displayReviews);
reviewsContainer.addEventListener("click", Review.handleClick);
logo.addEventListener('click', renderHomeView);

toTopIcon.addEventListener("click", (e) => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
  setTimeout(() => {
    document.querySelector(".site-name").focus()
  }, 2000)
})