
// bus data
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}
// marker for bus location
async function dataToMapMarkers() {
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);

	markers.forEach((marker) => marker.remove());
	markers = []; 
	locations.forEach( ( location ) => {
		const stops = [];
		const lat = location.attributes && location.attributes.latitude;
		const lon = location.attributes && location.attributes.longitude;
		stops.push({lon, lat});
	
		let lastLocation = stops[ stops.length - 1]
 

		markers.push(new mapboxgl.Marker()
			.setLngLat(lastLocation)
			.addTo(map));
	
	} );
}
dataToMapMarkers();
//refreshes after 15 seconds
setInterval(dataToMapMarkers, 15000);