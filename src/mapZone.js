class MapZone {

  static all = [];
  static mapContainer = document.querySelector("#map");

  constructor(zoneClass) {
    this.element = document.querySelector(`.${zoneClass}`)
    this.name = this.element.parentElement.id;
    this.zoneId = this.element.dataset["id"];

    this.element.addEventListener('click', this.handleClick);

    MapZone.all.push(this);
  }

  handleClick = (e) => {
    MapZone.all.forEach(zone => {
      zone.element.classList.add("inactive");
    });

    this.element.classList.remove("inactive");
    const zoneInfo = Zone.all.find(zone => parseInt(this.zoneId, 10) === zone.id);
    zoneInfo.attachToDom();
  }   
}