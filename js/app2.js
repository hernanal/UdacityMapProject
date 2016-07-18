// This file contains all the code to implement the APIs in the app

// Google maps API

// var map;

var markers = [];

var model = {
	styles: [
		{
			"elementType":"geometry",
			"stylers":[
				{
					"hue":"#ff4400"
				},
				{
					"saturation":-68
				},
				{
					"lightness":-4
				},
				{
					"gamma":0.72
				}
			]
		},
		{
			"featureType":"road",
			"elementType":"labels.icon"
		},
		{
			"featureType":"landscape.man_made",
			"elementType":"geometry",
			"stylers":[
				{
					"hue":"#0077ff"
				},
				{
					"gamma":3.1
				}
			]
		},
		{
			"featureType":"water",
			"stylers":[
				{
					"hue":"#00ccff"
				},
				{
					"gamma":0.44
				},
				{"saturation":-33
				}
			]
		},
		{
			"featureType":"poi.park",
			"stylers":[
				{
					"hue":"#44ff00"
				},
				{
					"saturation":-23
				}
			]
		},
		{
			"featureType":"water",
			"elementType":"labels.text.fill",
			"stylers":[
				{
					"hue":"#007fff"
				},
				{
					"gamma":0.77
				},
				{
					"saturation":65
				},
				{
					"lightness":99
				}
			]
		},
		{
			"featureType":"water",
			"elementType":"labels.text.stroke",
			"stylers":[
				{
					"gamma":0.11
				},
				{
					"weight":5.6
				},
				{
					"saturation":99
				},
				{
					"hue":"#0091ff"
				},
				{
					"lightness":-86
				}
			]
		},
		{
			"featureType":"transit.line",
			"elementType":"geometry",
			"stylers":[
				{
					"lightness":-48
				},
				{
					"hue":"#ff5e00"
				},
				{
					"gamma":1.2
				},
				{
					"saturation":-23
				}
			]
		},
		{
			"featureType":"transit",
			"elementType":"labels.text.stroke",
			"stylers":[
				{
					"saturation":-64
				},
				{
					"hue":"#ff9100"
				},
				{
					"lightness":16
				},
				{
					"gamma":0.47
				},
				{
					"weight":2.7
				}
			]
		}
	],
	locations: [
		{
			title: 'Raines Law Room',
			location: {lat: 40.73871310000001, lng: -73.99460060000001}
		},
		{
			title: 'Please Don’t Tell',
			location: {lat: 40.72716399999999, lng: -73.98371500000002}
		},
		{
			title: 'Employees Only',
			location: {lat: 40.7334327, lng: -74.0060815}
		},
		{
			title: 'Dear Irving',
			location: {lat: 40.7362291, lng: -73.9874304}
		},
		{
			title: 'Death & Co',
			location: {lat: 40.7259632, lng: -73.98462059999997}
		},
		{
			title: 'Apothéke',
			location: {lat: 40.7143818, lng: -73.99818290000002}
		},
		{
			title: 'Little Branch',
			location: {lat: 40.7299746, lng: -74.00504910000001}
		},
		{
			title: 'Middle Branch',
			location: {lat: 40.7452845, lng: -73.97946159999998}
		},
		{
			title: 'Nitecap',
			location: {lat: 40.7199088, lng: -73.98718259999998}
		},
		{
			title: 'The Back Room',
			location: {lat: 40.7187348, lng: -73.98694309999996}
		},
	    // {
	    // 	title: 'Park Ave Penthouse', 
	    // 	location: {lat: 40.7713024, lng: -73.9632393}
	    // }		
	]
};

var octopus = {
	init: function() {
		viewMap.init();
	}
};

var viewMap = {
	init: function() {
		this.render();
	},
	render: function() {
		var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 40.750568, lng: -73.99351899999999},
			zoom: 13,
			styles: model.styles
		});
	}
};
// octopus.init();

// function initMap() {
// 	// https://snazzymaps.com/style/70/unsaturated-browns
 
// 	// Tell the API where to create the map
// 	// Create the first marker
// 	// var home =	{lat: 40.4458893, lng: -74.52377100000001};
// 	// var marker = new google.maps.Marker({
// 	// 	position: home,
// 	// 	map: map,
// 	// 	title: 'Home!'
// 	// });
	

// 	var infoWindow = new google.maps.InfoWindow();
// 	var bounds = new google.maps.LatLngBounds();

// 	// Style the speakeasy icon
// 	var defaultIcon = makeMarkerIcon('0091ff');

// 	// Change the color of the icon when the mouse is over it
// 	var highlightIcon = makeMarkerIcon('FFFF24');

// 	// Loop through and create markers for each speakeasy object using 
// 	// the locations array when the app loads.

// 	var locationsArray = model.locations;

// 	for(var i = 0; i < locationsArray.length; i++) {
		
// 		var position = locationsArray[i].location;
// 		var title = locationsArray[i].title;

// 		var marker = new google.maps.Marker({
// 			map: map,
// 			position: position,
// 			title: title,
// 			animation: google.maps.Animation.DROP,
// 			id: i
// 		});
// 		// Put the new marker into our markers array
// 		markers.push(marker);
// 		// Give each marker a onclick event to open an info window
// 		marker.addListener('click', function() {
// 			fillInfoWindow(this, infoWindow);
// 		});
// 		bounds.extend(markers[i].position);

// 		// Click events for icons during mouseover and mouseout
// 		marker.addListener('mouseover', function() {
// 			this.setIcon(highlightIcon);
// 		});
// 		marker.addListener('mouseout', function() {
// 			this.setIcon(defaultIcon);
// 		});
// 	}
// 	// Extend the boundaries of the map for each marker
// 	map.fitBounds(bounds);
// }

// function fillInfoWindow(marker, infowindow) {
// 	// First check to make sure the infowindow is already open
// 	if(infowindow.marker != marker) {
// 		// Clear the infowindow content to give streetview time to load
// 		infowindow.setContent('');
// 		infowindow.marker = marker;
// 		// infowindow.open(map, marker);
// 		// Clear marker property when window is closed
// 		infowindow.addListener('closeclick', function() {
// 			infowindow.marker = null;
// 		});
// 		var streetViewService = new google.maps.StreetViewService();
// 		var radius = 50;

// 		// If the pano is found, compute position of the streetview image,
// 		// then calculate heading, get the pano and set options
// 		function getStreetView(data, status) {
// 			if(status == google.maps.StreetViewStatus.OK) {
// 				var nearStreetViewLocation = data.location.latLng;
// 				var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
// 					infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
// 					var panoramaOptions = {
// 						position: nearStreetViewLocation,
// 						pov: {
// 							heading: heading,
// 							pitch: 0
// 						}
// 					};
// 				var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
// 			} else {
// 				infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No Street View Found</div>');
// 			}
// 		}
// 		// Use the streetview to get an image witin 50 meters of the marker
// 		streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
// 		infowindow.open(map, marker);
// 	}
// }

// function makeMarkerIcon(markerColor) {
// 	var markerImage = new google.maps.MarkerImage('http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
//           '|40|_|%E2%80%A2',
//           new google.maps.Size(21, 34),
//           new google.maps.Point(0, 0),
//           new google.maps.Point(10,34),
//           new google.maps.Size(21, 34));
// 	return markerImage;
// }