class MapZone {

  static all = [];
  static mapContainer = document.querySelector("#map");

  constructor(zoneClass) {
    this.element = document.querySelector(`.${zoneClass}`)
    this.name = this.element.parentElement.id;
    this.zoneId = this.element.dataset["id"];

    this.element.addEventListener('click', this.handleClick);
    console.log(this.zoneId)
    MapZone.all.push(this);
  }

  handleClick = (e) => {
    MapZone.all.forEach(zone => {
      zone.element.classList.add("inactive");
    });
    this.element.classList.remove("inactive");
    
    const zone = Zone.all.find(zone => this.zoneId === zone.id);
    zone.attachToDom();
  }   
}