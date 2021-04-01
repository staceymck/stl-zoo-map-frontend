class AttractionApi {
  constructor(port) {
    this.baseUrl = `${port}/attractions`
  }

  getAttractions() {
    fetch(this.baseUrl)
    .then(res => res.json())
    .then(data => {
      data.forEach(att => {
        new Attraction(att);
      })
    })
  }
}