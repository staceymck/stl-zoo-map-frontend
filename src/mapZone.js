class MapZone {

  static all = [];
  static mapContainer = document.querySelector(".js-map");

  constructor(mapGroup) {
    this.element = mapGroup.querySelector(".js-map-zone");
    //this.name = this.element.parentElement.id;
    this.zoneId = this.element.dataset["id"];

    this.element.parentElement.addEventListener('click', this.handleClick);

    MapZone.all.push(this);
  }

  handleClick = () => { //had e here but don't think I need it
    MapZone.all.forEach(zone => {
      zone.element.classList.add("js-inactive");
      zone.element.classList.remove("js-active");
    });

    this.element.classList.remove("js-inactive");
    this.element.classList.add("js-active")

    const zoneInfo = Zone.all.find(zone => parseInt(this.zoneId, 10) === zone.id);
    zoneInfo.attachToDom();

    //Display exhibits
    document.querySelector(".js-exhibits").style.display = "block"
    document.querySelector(".js-exhibit-card-container").innerHTML = "";

    const exhibits = Exhibit.all.filter(exhibit => parseInt(this.zoneId, 10) === exhibit.zoneId);
    exhibits.forEach(e => e.attachToDom());

    //Display button to get to top of page
    document.querySelector(".js-to-top").style.display = "block";
  }   
}