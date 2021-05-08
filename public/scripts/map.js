// Initialize and add the map

function initMap(latitude, longitude) {
	const worcester = { lat: 42.269, lng: -71.802 };
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 13,
		center: worcester,
	});
	// this sucks but couldn't get ejs to pass vars to scripts
	const coord = document.querySelector(".coord").id.split(",");
	let [strLat, strLon] = coord;
	let lat = parseFloat(strLat);
	let lon = parseFloat(strLon);
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
