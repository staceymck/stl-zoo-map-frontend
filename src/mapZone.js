class MapZone {

  static all = [];
  static mapContainer = document.querySelector(".js-map");

  constructor(mapGroup) {
    this.element = mapGroup;
    this.path = mapGroup.querySelector(".js-map-zone");
    this.zoneId = this.path.dataset["id"];

    this.element.addEventListener('click', this.handleClick);
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);

    MapZone.all.push(this);
  }

  handleMouseEnter = () => {
    this.path.classList.add("js-hover");
  }
  
  handleMouseLeave = () => {
    this.path.classList.remove("js-hover");
  }

  handleClick = () => {
    MapZone.all.forEach(zone => {
      zone.path.classList.add("js-inactive");
      zone.path.classList.remove("js-active");
    });

    this.path.classList.remove("js-inactive");
    this.path.classList.add("js-active")

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