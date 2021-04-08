class Zone {
  static container = document.querySelector(".js-zone-info");
  static all = [];

  constructor({id, name, description}) {
    this.id = id;
    this.name = name;
    this.description = description;

    this.nameAsClass = this.name.replace(/'/g, "").replace(/ /g, '-').toLowerCase();
    this.mapElement = document.querySelector(`.js-${this.nameAsClass}`);
    this.mapElement.dataset["id"] = id;

    Zone.all.push(this);
  }

  attractions() {
    return Attraction.all.filter(att => parseInt(att.zoneId, 10) === this.id)
  }

  renderAttractionList(attractions) {
    const header = document.createElement("h2");
    const list = document.createElement("ul");

    header.innerText = "Attractions";

    attractions.forEach(att => {
      list.appendChild(att.renderAsLi());
    })

    Zone.container.appendChild(header);
    Zone.container.appendChild(list);
  }

  attachToDom() {
    Zone.container.parentElement.classList.add("zone-selected");
    Zone.container.innerHTML = "";

    Zone.container.style.backgroundColor = `var(--${this.nameAsClass}-primary)`

    const name = document.createElement("h1");
    name.innerText = this.name;
    Zone.container.appendChild(name);

    const desc = document.createElement("p");
    desc.innerText = this.description;
    Zone.container.appendChild(desc);

    if (this.attractions().length !== 0) {
      this.renderAttractionList(this.attractions());
    }
  }
}