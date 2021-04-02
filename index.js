// Reset map colors and home image on logo click
const logo = document.querySelector("#logo");
const mainDisplay = document.querySelector("#main-display");

logo.addEventListener('click', e => {
  MapZone.all.forEach(zone => zone.element.classList.remove("inactive"));
  mainDisplay.classList.remove("zone-selected")
  mainDisplay.style.display = "";
  document.querySelector("#reviews").style.display = "none";
  document.querySelector("#exhibits h3").style.display = "none";
  document.querySelector("#exhibit-card-container").innerHTML = "";
})
