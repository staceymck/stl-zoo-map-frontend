class MapZone {

  static all = [];
  static mapContainer = document.querySelector("#map");

  constructor(mapGroup) {
    this.element = document.querySelector(`#${mapGroup.id} .map-zone`)
    this.name = this.element.parentElement.id;
    this.zoneId = this.element.dataset["id"];

    this.element.parentElement.addEventListener('click', this.handleClick);

    MapZone.all.push(this);
  }

  handleClick = (e) => {
    MapZone.all.forEach(zone => {
      zone.element.classList.add("inactive");
      zone.element.classList.remove("active");
    });

    this.element.classList.remove("inactive");
    this.element.classList.add("active")

    document.querySelector("#exhibits h3").style.display = "block";

    const zoneInfo = Zone.all.find(zone => parseInt(this.zoneId, 10) === zone.id);
    zoneInfo.attachToDom();

    document.querySelector("#exhibits").style.display = "block"
    document.querySelector("#exhibit-card-container").innerHTML = "";
    const exhibits = Exhibit.all.filter(exhibit => parseInt(this.zoneId, 10) === exhibit.zoneId);
    exhibits.forEach(e => e.attachToDom());
    document.querySelector("#to-top").style.display = "block";
  }   
}