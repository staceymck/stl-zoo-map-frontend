class AttractionApi {
  
  constructor(port) {
    this.baseUrl = `${port}/attractions`
  }

  getAttractions() {
    fetch(this.baseUrl)
    .then(res => {
      if(!res.ok) {throw res}
      return res.json()
    })
    .then(data => {
      data.forEach(att => {
        new Attraction(att);
      })
    })
    .catch(error => {
      alert("Unable to process request. Please try again.");
      console.log(error.message);
    })
  }
}