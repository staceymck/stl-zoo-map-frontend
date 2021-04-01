class ZoneApi {
  constructor(port) {
    this.baseUrl = `${port}/zones`
  }

  setupZonesWithMap(mapGroups) {
    fetch(this.baseUrl)
    .then(res => res.json())
    .then(data => {
      data.forEach(zoneData => {
        const zone = new Zone(zoneData);
      })
      mapGroups.forEach(group => {
        new MapZone(group);
      })
    })
  }
}