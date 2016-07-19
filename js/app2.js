// This file contains all the code to implement the APIs in the app

// Google maps API

var map;

var model = {
	// https://snazzymaps.com/style/70/unsaturated-browns
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
			location: {lat: 40.73871310000001, lng: -73.99460060000001},
			placeId: 'ChIJ8wOZzaJZwokR6impURvzUbE'
		},
		{
			title: 'Please Don’t Tell',
			location: {lat: 40.72716399999999, lng: -73.98371500000002},
			placeId: 'ChIJb67-ZZ1ZwokRRxBYr3GlFp0'
		},
		{
			title: 'Employees Only',
			location: {lat: 40.7334327, lng: -74.0060815},
			placeId: 'ChIJLztrVJNZwokRTmcQJheGNR4'
		},
		{
			title: 'Dear Irving',
			location: {lat: 40.7362291, lng: -73.9874304},
			placeId: 'ChIJN40c3qFZwokRXMy2Eb1vKj8'
		},
		{
			title: 'Death & Company',
			location: {lat: 40.7259632, lng: -73.98462059999997},
			placeId: 'ChIJKU1MNJ1ZwokRQ7eiWK511vI'
		},
		{
			title: 'Apothéke the bar',
			location: {lat: 40.7143818, lng: -73.99818290000002},
			placeId: 'ChIJNxEu8SZawokRARkMLjXhyBY'
		},
		{
			title: 'Speakeasy Room at the Gin Mill',
			location: {lat: 40.7847532, lng: -73.9775376},
			placeId: 'ChIJc6GIBIZYwokRVBogFb1MvKI'
		},
		{
			title: 'Middle Branch',
			location: {lat: 40.7452845, lng: -73.97946159999998},
			placeId: 'ChIJW9_FLwZZwokRTb3xWwh9tDs'
		},
		{
			title: 'Nitecap',
			location: {lat: 40.7199088, lng: -73.98718259999998},
			placeId: 'ChIJYVwmFYFZwokRuSJWe5CgaNw'
		},
		{
			title: 'Back Room',
			location: {lat: 40.7187348, lng: -73.98694309999996},
			placeId: 'ChIJnY19HoFZwokRfs9FwDLVRKw'
		},
	    // {
	    // 	title: 'Park Ave Penthouse', 
	    // 	location: {lat: 40.7713024, lng: -73.9632393}
	    // }		
	],
	markers: []
};

var octopus = {
	init: function() {
		viewMap.init();
	},
	getStyles: function() {
		return model.styles;
	},
	getLocations: function() {
		return model.locations;
	},
	getMarkers: function() {
		return model.markers;
	},
	fillInfoWindow: function(marker, infowindow) {
		// First check to make sure the infowindow is already open
		if(infowindow.marker != marker) {
			// Clear the infowindow content to give streetview time to load
			// infowindow.setContent('');
			infowindow.marker = marker;
			// infowindow.open(map, marker);
			// Clear marker property when window is closed
			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
				marker.setAnimation(null);
			});
			// var streetViewService = new google.maps.StreetViewService();
			// var radius = 50;

			// Get details about location
			var innerHTML;
			var request = {placeId: marker.placeId};
			var service = new google.maps.places.PlacesService(map);
			service.getDetails(request, function(place, status) {
				if(status === google.maps.places.PlacesServiceStatus.OK) {
					infowindow.marker = marker;
					var innerHTML = '<div>';
					if(place.name) {
						innerHTML += '<strong>' + marker.title + '</strong>';
					}
					if(place.formatted_address) {
						innerHTML += '<br>' + place.formatted_address;
					}
					if(place.formatted_phone_number) {
						innerHTML += '<br>' + place.formatted_phone_number;
					} else if(place.formatted_phone_number === undefined) {
						innerHTML += '<br><em>In true speakeasy fashion, no phone number</em>' 
					}
					if(place.rating) {
						innerHTML += '<br><br>Rating: ' + place.rating;
					}
					if(place.opening_hours) {
						innerHTML += '<br><br><strong>Hours:</strong><br>' +
							place.opening_hours.weekday_text[0] + '<br>' +
							place.opening_hours.weekday_text[1] + '<br>' +
							place.opening_hours.weekday_text[2] + '<br>' +
							place.opening_hours.weekday_text[3] + '<br>' +
							place.opening_hours.weekday_text[4] + '<br>' +
							place.opening_hours.weekday_text[5] + '<br>' +
							place.opening_hours.weekday_text[6];
					}
					if(place.photos) {
						innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
							{maxHeight: 150, maxWidth: 250}) + '">';
					}
					innerHTML += '</div>';
					infowindow.setContent(innerHTML);
					// console.log(innerHTML);
					infowindow.open(map, marker);
				}
			});

			// // If the pano is found, compute position of the streetview image,
			// // then calculate heading, get the pano and set options
			// function getStreetView(data, status) {
			// 	if(status == google.maps.StreetViewStatus.OK) {
			// 		var nearStreetViewLocation = data.location.latLng;
			// 		var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
			// 			infowindow.setContent(/*'<div><strong>' + marker.title + '</strong></div>*/innerHTML + '<br><div id="pano"></div>');
			// 				// <br><div class="info-window">Address: ' + address + '</div><br><div>Phone number: ' + phone + '</div><br><div class="info-window">Hours: ' + hours + '</div>');
			// 			var panoramaOptions = {
			// 				position: nearStreetViewLocation,
			// 				pov: {
			// 					heading: heading,
			// 					pitch: 0
			// 				}
			// 			};
			// 			// NEED TO HANDLE POSSIBLE ERROR
			// 		var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
			// 	} else {
			// 		innerHTML += '<div>' + marker.title + '</div>' + '<div>No Street View Found</div>';
			// 	}
			// }
			// // Use the streetview to get an image witin 50 meters of the marker
			// streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
		}
	},
	// toggleBounce: function(marker) {
	// 	if(marker.getAnimation() !== null) {
	// 		marker.setAnimation(null);
	// 	} else {
	// 		marker.setAnimation(google.maps.Animation.BOUNCE);
	// 	}
	// } 
};

var viewMap = {
	init: function() {
		this.render();
	},
	render: function() {
		// Render map
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 40.750568, lng: -73.99351899999999},
			zoom: 13,
			styles: octopus.getStyles()
		});
		// Render markers with infowindow click events
		var infoWindow = new google.maps.InfoWindow();
		var bounds = new google.maps.LatLngBounds();
		var locations = octopus.getLocations();
		var markers = octopus.getMarkers();
		var barIcon = 'img/bar_icon.svg';
		var drinkIcon = 'img/drink_icon.svg';

		// Loop through and create markers for each speakeasy object  
		// using the locations array when the app loads.
		for(var i = 0; i < locations.length; i++) {
			
			var position = locations[i].location;
			var title = locations[i].title;
			var id = locations[i].placeId;

			var marker = new google.maps.Marker({
				map: map,
				position: position,
				title: title,
				placeId: id,
				animation: google.maps.Animation.DROP,
				id: i,
				icon: barIcon
			});
			// Put the new marker into our markers array
			markers.push(marker);
			// Give each marker a onclick event to open an info window
			marker.addListener('click', function() {
				// octopus.getLocationDetails(this, infoWindow);
				octopus.fillInfoWindow(this, infoWindow);
				this.setAnimation(google.maps.Animation.BOUNCE);
			});
			bounds.extend(markers[i].position);

			// Click events for icons during mouseover and mouseout
			marker.addListener('mouseover', function() {
				this.setIcon(drinkIcon);
			});
			marker.addListener('mouseout', function() {
				this.setIcon(barIcon);
			});
		}
		// Extend the boundaries of the map for each marker
		map.fitBounds(bounds);
	}
};



// function initMap() {
 
// 	// Create the first marker
// 	// var home =	{lat: 40.4458893, lng: -74.52377100000001};
// 	// var marker = new google.maps.Marker({
// 	// 	position: home,
// 	// 	map: map,
// 	// 	title: 'Home!'
// 	// });
	

// 	// Style the speakeasy icon

// 	// Change the color of the icon when the mouse is over it
// 	var highlightIcon = makeMarkerIcon('FFFF24');


	
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

/*
***** Additional Features *****

-- Draw tools

-- Zoom

-- Commute distance matrix for speakeasys near an entered location

-- Autocomplete search bar for near by places

--
*/