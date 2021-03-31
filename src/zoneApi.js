class ZoneApi {
  constructor(port) {
    this.baseUrl = `${port}/zones`
  }

  getZones(mapSections) {
    fetch(this.baseUrl)
    .then(res => res.json())
    .then(data => {
      data.forEach(zoneData => {
        console.log(zoneData)
        const zone = new Zone(zoneData);
      })
      mapSections.forEach(zone => {
        new MapZone(zone)
      })
    })
  }
}