class Exhibit {

  static all = [];
  static exhibitContainer = document.querySelector("#card-container");

  constructor({id, name, description, zone_id, exhibit_image, species_fact}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.zoneId = zone_id;
    this.imageLink = exhibit_image["cloudinary"];
    this.fact = species_fact;
    this.element = document.createElement("div");
  }

  renderFront() {
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const img = document.createElement("img");
    
    this.element.classList.add("exhibit-card");

    h4.innerText = this.name;
    p.innerText = this.description;
    img.src = this.imageLink;
    //figure out alt text for already loaded images and user submitted images 

    this.element.appendChild(img);
    this.element.appendChild(h4);
    this.element.appendChild(p);
  }

  attachToDom() {
    this.element.innerHTML = "";
    this.renderFront();
    Exhibit.exhibitContainer.appendChild(this.element);
  }
}