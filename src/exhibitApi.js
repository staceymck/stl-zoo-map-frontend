class ExhibitApi {
  
  constructor(port) {
    this.baseUrl = `${port}/exhibits`;
  }

  getExhibits = () => {
    fetch(this.baseUrl)
    .then(res => {
      if(!res.ok) {throw res}
      return res.json();
    })
    .then(data => {
      data.forEach(exhibit => {
        new Exhibit(exhibit);
      })
    })
    .catch(error => {
      alert("Unable to process request. Please try again.");
      console.log(error.message);
    })
  }
}