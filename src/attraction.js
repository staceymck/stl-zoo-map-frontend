class Attraction {
  
  static all = [];

  constructor({id, name, zone_id}) {
    this.id = id;
    this.name = name;
    this.zoneId = zone_id;

    Attraction.all.push(this);
  }

  renderAsLi() {
    const li = document.createElement("li");
    li.innerText = this.name;
    return li;
  }
}