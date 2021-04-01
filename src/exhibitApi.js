class ExhibitApi {
  
  constructor(port) {
    this.baseUrl = `${port}/exhibits`
  }

  getExhibits = () => {
    fetch(this.baseUrl)
    .then(res => res.json())
    .then(data => {
      data.forEach(exhibit => {
        new Exhibit(exhibit);
      })
    })
  }
}