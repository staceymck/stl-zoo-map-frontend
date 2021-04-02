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

//Scroll to top button
document.querySelector("#top").addEventListener("click", (e) => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  }) //how to make the focus happen after the scroll?
  document.querySelector("#site-name").focus();
})
