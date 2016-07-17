// This file contains all the code to implement the APIs in the app

// Google maps API

var map;

var markers = [];

function initMap() {
	// Tell the API where to create the map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.750568, lng: -73.99351899999999},
		zoom: 13
	});
	// Create the first marker
	// var home =	{lat: 40.4458893, lng: -74.52377100000001};
	// var marker = new google.maps.Marker({
	// 	position: home,
	// 	map: map,
	// 	title: 'Home!'
	// });
	var locations = [
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
		}		
	];

	var infoWindow = new google.maps.InfoWindow();
	var bounds = new google.maps.LatLngBounds();

	// Loop through and create markers for each speakeasy object using 
	// the locations array when the app loads.

	for(var i = 0; i < locations.length; i++) {
		
		var position = locations[i].location;
		var title = locations[i].title;

		var marker = new google.maps.Marker({
			map: map,
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			id: i
		});
		// Put the new marker into our markers array
		markers.push(marker);
		// Give each marker a onclick event to open an info window
		marker.addListener('click', function() {
			fillInfoWindow(this, infoWindow);
		});
		bounds.extend(markers[i].position);
	}
	// Extend the boundaries of the map for each marker
	map.fitBounds(bounds);
}

function fillInfoWindow(marker, infowindow) {
	// First check to make sure the infowindow is already open
	if(infowindow.marker != marker) {
		infowindow.marker = marker;
		infowindow.setContent('<div>' + marker.title + '</div>');
		infowindow.open(map, marker);
		// Clear marker property when window is closed
		infowindow.addListener('closeclick', function() {
			infowindow.setMarker(null);
		});
	}
}