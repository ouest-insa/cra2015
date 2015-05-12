var map;
var directionDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {
	var latlng = new google.maps.LatLng(48.122359,-1.636877);
	// set direction render options
	var rendererOptions = {
		draggable: false
	};
	directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
	var myOptions = {
		zoom: 10,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false
	};
	// add the map to the map placeholder
	var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("directionsPanel"));
	// Add a marker to the map for the end-point of the directions.
	var marker = new google.maps.Marker({
		position: latlng, 
		map: map, 
		title:"INSA Rennes, Rennes"
	}); 
}

function calcRoute() {
	// get the travelmode, startpoint and via point from the form   
	var travelMode = $('input[name="travelMode"]:checked').val();
	var start = $("#routeStart").val();
	var via = $("#routeVia").val();

	if (travelMode == 'TRANSIT') {
		via = ''; // if the travel mode is transit, don't use the via waypoint because that will not work
	}
	var end = "48.122359,-1.636877"; // endpoint is a geolocation
	var waypoints = []; // init an empty waypoints array
	if (via != '') {
		// if waypoints (via) are set, add them to the waypoints array
		waypoints.push({
			location: via,
			stopover: true
		});
	}
	var request = {
		origin: start,
		destination: end,
		waypoints: waypoints,
		travelMode: google.maps.DirectionsTravelMode[travelMode]
	};
	directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					$('#directionsPanel').empty(); // clear the directions panel before adding new directions
					directionsDisplay.setDirections(response);
				} else {
					// alert an error message when the route could nog be calculated.
					if (status == 'ZERO_RESULTS') {
						alert('Impossible de vous trouver un itinéraire... :(');
					} else if (status == 'UNKNOWN_ERROR') {
						alert('Impossible de vous trouver un itinéraire... :(');
					} else if (status == 'REQUEST_DENIED') {
						alert('Impossible de vous trouver un itinéraire... :(');
					} else if (status == 'OVER_QUERY_LIMIT') {
						alert('Impossible de vous trouver un itinéraire... :(');
					} else if (status == 'NOT_FOUND') {
						alert('Impossible de vous trouver un itinéraire... :(');
					} else if (status == 'INVALID_REQUEST') {
						alert('Impossible de vous trouver un itinéraire... :(');         
					} else {
						alert("Impossible de vous trouver un itinéraire... :( nn"+status);
					}
				}
			});
}
