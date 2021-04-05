
const logo = document.querySelector("#logo");
const mainDisplay = document.querySelector("#main-display");
const port = "http://localhost:3000";
const mapGroups = document.querySelectorAll("g");
const zoneApi = new ZoneApi(port);
const attractionApi = new AttractionApi(port);
const exhibitApi = new ExhibitApi(port);
const reviewApi = new ReviewApi(port);

attractionApi.getAttractions();
zoneApi.setupZonesWithMap(mapGroups);
exhibitApi.getExhibits();

//Is this the best place for this?
const viewReviewsButton = document.querySelector("#view-reviews");
viewReviewsButton.addEventListener("click", Review.displayReviews);

const addReviewButton = document.querySelector("#add-review");
addReviewButton.addEventListener("click", Review.handleClick);

// Reset map colors and home image on logo click
logo.addEventListener('click', e => {
  MapZone.all.forEach(zone => zone.element.classList.remove("inactive"));
  mainDisplay.classList.remove("zone-selected")
  mainDisplay.style.display = "";
  document.querySelector("#reviews").style.display = "none";
  document.querySelector("#exhibits h3").style.display = "none";
  document.querySelector("#exhibit-card-container").innerHTML = "";
  document.querySelector("#to-top").style.display = "none";
})

//Scroll to top button
document.querySelector("#to-top-btn").addEventListener("click", (e) => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  }) //how to make the focus happen after the scroll?
  document.querySelector("#site-name").focus();
})
