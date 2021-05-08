// Initialize and add the map

function initMap(latitude, longitude) {
	const coord = document.querySelector(".coord").id.split(",");
	let [strLat, strLon] = coord;
	let lat = parseFloat(strLat);
	let lon = parseFloat(strLon);

	const center = { lat: lat, lng: lon };
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 18,
		center: center,
	});

	setTimeout(() => {
		const marker = new google.maps.Marker({
			position: {
				lat: lat,
				lng: lon,
			},
			map: map,
		});
	}, 200);
}
