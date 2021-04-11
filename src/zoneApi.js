class ZoneApi {
  constructor(port) {
    this.baseUrl = `${port}/zones`;
  }

  setupZonesWithMap(mapGroups) {
    fetch(this.baseUrl)
    .then(res => {
      if(!res.ok) {throw res}
      return res.json();
    })
    .then(data => {
      data.forEach(zoneData => {
        const zone = new Zone(zoneData);
      })
      mapGroups.forEach(group => {
        new MapZone(group);
      })
    })
    .catch(error => {
      alert("Unable to process request. Please try again.");
      console.log(error.message);
    })
  }
}