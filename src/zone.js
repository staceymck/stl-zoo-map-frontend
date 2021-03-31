class Zone {
  static container = document.querySelector("#zone-info");
  static all = [];

  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;

    const nameAsClass = this.name.replace(/ /g, '-').toLowerCase();
    this.mapElement = document.querySelector(`#${nameAsClass} .map-zone`);
    this.mapElement.dataset["id"] = id;

    Zone.all.push(this);
  }

  attachToDom() {
    Zone.container.parentElement.classList.add("zone-selected");
    Zone.container.innerHTML = "";
    const name = document.createElement("h1");
    name.innerText = this.name;
    Zone.container.appendChild(name);

    const desc = document.createElement("p");
    desc.innerText = this.description;
    Zone.container.appendChild(desc);
  }

}