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
    this.element.classList.add("exhibit-card");
    this.element.id = `exhibit-${id}`

    this.element.addEventListener("click", this.handleClick);
  }

  render() { //figure out alt text for already loaded images and user submitted images 
    //create image
    const img = document.createElement("img");
    img.src = this.imageLink;
    
    //info - front
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    
    h4.innerText = this.name;
    p.innerText = this.description;

    //build card
    this.element.appendChild(img);
    this.element.appendChild(h4);
    this.element.appendChild(p);
    this.element.classList.add("front");
  }

  attachToDom() {
    this.element.innerHTML = "";
    this.render();
    Exhibit.exhibitContainer.appendChild(this.element);
  }

  handleClick = (e) => {
    const card = this.element;

    if(card.classList.contains("front")) {
      card.classList.remove("front");
      card.classList.add("back");

      card.querySelector("h4").innerText = "Did you know?";
      card.querySelector("p").innerText = this.fact;
    }
    else {
      card.classList.remove("back");
      card.classList.add("front");
      card.querySelector("h4").innerText = this.name;
      card.querySelector("p").innerText = this.description;
    }
  }
}