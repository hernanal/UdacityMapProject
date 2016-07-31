// This file contains all the code to implement the APIs in the app

// Google maps API

var map, checkInButton, infoWindow, bounds;

var model = {
	visits: 0,
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
	markers: ko.observableArray([]),
	yelpMarkers: ko.observableArray([]),
	states: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
			 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
			 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
			 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
			 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
			 ]
};

var locations = [
	{
		title: 'Raines Law Room',
		location: {lat: 40.73871310000001, lng: -73.99460060000001},
		placeId: 'ChIJ8wOZzaJZwokR6impURvzUbE',
		clicked: ko.observable(false)
	},
	{
		title: 'Please Don’t Tell',
		location: {lat: 40.72716399999999, lng: -73.98371500000002},
		placeId: 'ChIJb67-ZZ1ZwokRRxBYr3GlFp0',
		clicked: ko.observable(false)
	},
	{
		title: 'Employees Only',
		location: {lat: 40.7334327, lng: -74.0060815},
		placeId: 'ChIJLztrVJNZwokRTmcQJheGNR4',
		clicked: ko.observable(false)
	},
	{
		title: 'Dear Irving',
		location: {lat: 40.7362291, lng: -73.9874304},
		placeId: 'ChIJN40c3qFZwokRXMy2Eb1vKj8',
		clicked: ko.observable(false)
	},
	{
		title: 'Death & Company',
		location: {lat: 40.7259632, lng: -73.98462059999997},
		placeId: 'ChIJKU1MNJ1ZwokRQ7eiWK511vI',
		clicked: ko.observable(false)
	},
	{
		title: 'Apothéke the bar',
		location: {lat: 40.7143818, lng: -73.99818290000002},
		placeId: 'ChIJNxEu8SZawokRARkMLjXhyBY',
		clicked: ko.observable(false)
	},
	{
		title: 'Speakeasy Room at the Gin Mill',
		location: {lat: 40.7847532, lng: -73.9775376},
		placeId: 'ChIJc6GIBIZYwokRVBogFb1MvKI',
		clicked: ko.observable(false)
	},
	{
		title: 'Middle Branch',
		location: {lat: 40.7452845, lng: -73.97946159999998},
		placeId: 'ChIJW9_FLwZZwokRTb3xWwh9tDs',
		clicked: ko.observable(false)
	},
	{
		title: 'Nitecap',
		location: {lat: 40.7199088, lng: -73.98718259999998},
		placeId: 'ChIJYVwmFYFZwokRuSJWe5CgaNw',
		clicked: ko.observable(false)
	},
	{
		title: 'Back Room',
		location: {lat: 40.7187348, lng: -73.98694309999996},
		placeId: 'ChIJnY19HoFZwokRfs9FwDLVRKw',
		clicked: ko.observable(false)
	}
]

// var yelpLocations = [];	

var octopus = {
	init: function() {
		viewMap.init();
		// viewCommute.init();
	},
	getStyles: function() {
		return model.styles;
	},
	getMarkers: function() {
		return model.markers();
	},
	getYelpMarkers: function() {
		return model.yelpMarkers();
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
	fillYelpInfoWindow: function(marker, infowindow) {
		if(infowindow.marker != marker) {
			infowindow.setContent('');
			infowindow.marker = marker;
			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
				marker.setAnimation(null);
			});
			infowindow.marker = marker;
			var innerHTML = '<div class="yelpInfoWin">';
			if(marker.title) {
				innerHTML += '<strong>' + marker.title + '</strong>';
			}
			if(marker.address) {
				innerHTML += '<br>' + marker.address;
			}
			if(marker.phone) {
				innerHTML += '<br>' + marker.phone;
			} else if(marker.phone === undefined) {
				innerHTML += '<br><em>In true speakeasy fashion, no phone number</em>' 
			}
			if(marker.rating) {
				innerHTML += '<br><br>Rating: <br><img src="' + marker.rating + '">';
			}
			if(marker.review) {
				innerHTML += '<br><br>Review: <br><br>' + marker.review;
			}
			if(marker.url) {
				innerHTML += '<br><a href="' + marker.url + '">See all Yelp reviews</a>'			
			}
			if(marker.image) {
				innerHTML += '<br><br><img src="' + marker.image + '">';
			}
			innerHTML += '</div>';
			infowindow.setContent(innerHTML);
			infowindow.open(map, marker);
		}
	},
	nonce_generator: function() {
		return (Math.floor(Math.random() * 1e12).toString());
	}
};

var ViewModel = function() {
	var self = this;

	self.markers = octopus.getMarkers();
	self.yelpMarkers = octopus.getYelpMarkers();
	self.locationListItems = ko.observableArray(locations);
	// self.yelpLocationItems = ko.observableArray(yelpLocations);
	self.filter = ko.observable('');
	self.states = ko.observableArray([]);

	model.states.forEach(function(state) {
		self.states().push({abbreviation: state});
	});

	self.filteredItems = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		if(!filter) {
			for(var i = 0; i < self.markers.length; i++) {
				self.markers[i].setMap(map);
			}
			return self.locationListItems();
		} else {
			return ko.utils.arrayFilter(self.locationListItems(), function(item) {
				for(var i = 0; i < self.markers.length; i++) {
					if(self.markers[i].title.toLowerCase().indexOf(filter) === -1) {
						self.markers[i].setMap(null);
					} else {
						self.markers[i].setMap(map);
					}
				}
				return item.title.toLowerCase().indexOf(filter) !== -1;
			});
		}
	}, self);

	self.changeItemMarker = function(clickedLocation) {
		// var infoWindow = new google.maps.InfoWindow();
		var markers = self.markers;
		for(var i = 0; i < markers.length; i++) {
			var marker = markers[i];
			// console.log(clickedLocation.title);

			if(marker.title === clickedLocation.title) {
				octopus.fillInfoWindow(marker, infoWindow);
				marker.setAnimation(google.maps.Animation.BOUNCE);
			} 
		}
	};
	// self.changeYelpMarker = function(clickedLocation) {
	// 	var infoWindow = new google.maps.InfoWindow();
	// 	var yelpMarkers = self.yelpMarkers;
	// 	console.log(yelpMarkers.length);
	// 	for(var i = 0; i < yelpMarkers.length; i++) {
	// 		var yelpMarker = yelpMarkers[i];
	// 		console.log(clickedLocation.yelpMarkers[0].title);

	// 		if(yelpMarker.title === clickedLocation.yelpMarkers[i].title) {
	// 			octopus.fillYelpInfoWindow(yelpMarker, infoWindow);
	// 			yelpMarker.setAnimation(google.maps.Animation.BOUNCE);
	// 			console.log(yelpMarker.title);
	// 		}		
	// 	}
	// };

	self.visits = ko.observable(0);

	self.increaseVisits = function(clickedButton) {
		if(clickedButton.clicked !== true) {
			self.visits(model.visits += 1);
			clickedButton.clicked(true);
		}
	};
};

ko.applyBindings(new ViewModel());

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
        // This autocomplete is for use in the search within time entry box.
        var timeAutocomplete = new google.maps.places.Autocomplete(
            document.getElementById('search-time-text'));
		// Render markers with infowindow click events
		infoWindow = new google.maps.InfoWindow();
		bounds = new google.maps.LatLngBounds();
		// var locations = octopus.getLocations();
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
		document.getElementById('show-all-listings').addEventListener('click', showAllListings);
        document.getElementById('search-time').addEventListener('click', function() {
          searchWithinTime();
        });
        function showAllListings() {
        	for (var i = 0; i < markers.length; i++) {
        		markers[i].setMap(map);
        		bounds.extend(markers[i].position);
        	}
        	map.fitBounds(bounds);
        }
		function hideMarkers(markers) {
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
		}
      	function searchWithinTime() {
	        var distanceMatrixService = new google.maps.DistanceMatrixService;
	        var address = document.getElementById('search-time-text').value;
			// Check to make sure the address was inputted
	        if (address == '') {
	          	window.alert('You must enter an address.');
	        } else {
				hideMarkers(markers);
				// Use the distance matrix to calcuate the time it will take
				// to get to each location from the destination address entered
				// by the user.
				var origins = [];
				for (var i = 0; i < markers.length; i++) {
				origins[i] = markers[i].position;
				}
				var destination = address;
				var mode = document.getElementById('mode').value;
				// Now that both the origins and destination are defined, get all the
				// info for the distances between them.
				distanceMatrixService.getDistanceMatrix({
					origins: origins,
					destinations: [destination],
					travelMode: google.maps.TravelMode[mode],
					unitSystem: google.maps.UnitSystem.IMPERIAL,
				}, function(response, status) {
					if (status !== google.maps.DistanceMatrixStatus.OK) {
					  window.alert('Error was: ' + status);
					} else {
					  findMarkersWithinTime(response);
					}
				});
	        }
	    }
		// This function will go through each response and if the distance 
		// is less than the value selected, it will show it on the map.
		function findMarkersWithinTime(response) {
			var maxDuration = document.getElementById('max-duration').value;
			var origins = response.originAddresses;
			var destinations = response.destinationAddresses;
			// Parse through the respones and get the distance and duration
			// for each. Then, make sure atleast 1 result was found.
			var atLeastOne = false;
			for (var i = 0; i < origins.length; i++) {
				var results = response.rows[i].elements;
				for (var j = 0; j < results.length; j++) {
			    	var element = results[j];
					if (element.status === "OK") {
						var distanceText = element.distance.text;
						// Convert duration value from seconds to minutes
						// using the value and text
						var duration = element.duration.value / 60;
						var durationText = element.duration.text;
						if (duration <= maxDuration) {
							//the origin [i] should = the markers[i]
							markers[i].setMap(map);
							atLeastOne = true;
							// Create infowindow to show distance and duration
							var infowindow = new google.maps.InfoWindow({
								content: durationText + ' away, ' + distanceText +
			                    '<div><input type=\"button\" value=\"View Route\" onclick =' +
			                    '\"displayDirections(&quot;' + origins[i] + '&quot;);\"></input></div>'
			            	});
							// console.log(displayDirections(origins[i]));
							infowindow.open(map, markers[i]);
							// Tell the app to close the small infowindow when the user
							// clicks a marker and opens a large infowindow
							markers[i].infowindow = infowindow;
							google.maps.event.addListener(markers[i], 'click', function() {
						  		this.infowindow.close();
							});
						}
					}
				}
			}
			if (!atLeastOne) {
		  		window.alert('We could not find any locations within that distance!');
			}
		}
      	// This will show the route on the map when button is clicked.
		function displayDirections(origin) {
	        hideMarkers(markers);
	        var directionsService = new google.maps.DirectionsService;
	        var destinationAddress = document.getElementById('search-time-text').value;
        	var mode = document.getElementById('mode').value;
        	directionsService.route({
	        	origin: origin,
				destination: destinationAddress,
				travelMode: google.maps.TravelMode[mode]
	        }, function(response, status) {
	        	if (status === google.maps.DirectionsStatus.OK) {
					var directionsDisplay = new google.maps.DirectionsRenderer({
						map: map,
						directions: response,
						draggable: true,
						polylineOptions: {
						strokeColor: 'orange'
						}
    	        	});
				} else {
					window.alert('Directions request failed due to ' + status);
				}
        	});
      	}
		// Extend the boundaries of the map for each marker
		map.fitBounds(bounds);
	}
};

var loadData = function() {
	var city = $('#city').val(); 
	var state = $('#state_selection').val(); 
	var $yelpElem = $('#yelp_results');
	var $yelpItem = $('#yelpItem');
	var $yelpForm = $('#yelp_form_container');

	$yelpElem.text("");
	// var yelpMarkers = [];

	var yelp_url = 'https://api.yelp.com/v2/search';
	var yelp_parameters = {
		location: city + state,
		term: 'speakeasy',
		limit: 10,
		sort: 2,
		category_filter: 'cocktailbars',
		oauth_consumer_key: 'ZvnJ-cSFo6XqeIfL-lVUsQ',
		oauth_token: '4GHYiXGXLbSjBfr7v8PqSvKbdkb4mBA6',
		oauth_nonce: octopus.nonce_generator(),
		oauth_timestamp: Math.floor(Date.now()/1000),
		oauth_signature_method: 'HMAC-SHA1',
		oauth_version: '1.0',
		callback: 'cb'
	};
	var yelp_consumerS = 'Y54xj9QUSLPpKo69rlGORv621SA';
	var yelp_TokenS = '7LFA0VSnN8t4F_dpv2FhGtlPuzw';

	var encodedSignature = oauthSignature.generate('GET', yelp_url, yelp_parameters, yelp_consumerS, yelp_TokenS);
	yelp_parameters.oauth_signature = encodedSignature;

	var settings = {
		url: yelp_url,
		data: yelp_parameters,
		cache: true,
		dataType: 'jsonp',
		success: function(results) {
			var businesses = results.businesses;
			// console.log(businesses[0]);
			map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: businesses[0].location.coordinate.latitude, lng: businesses[0].location.coordinate.longitude},
				zoom: 12,
				styles: octopus.getStyles()
			});
			// var infoWindow = new google.maps.InfoWindow();
			// var bounds = new google.maps.LatLngBounds();
			var yelpMarkers = octopus.getYelpMarkers();
		    var barIcon = 'img/bar_icon.svg';
		    var drinkIcon = 'img/drink_icon.svg';
			// var yelpLocationItems = ko.observableArray([]);

			for(var i = 0; i < businesses.length; i++) {
				var title = businesses[i].name;
				var position = {lat: businesses[i].location.coordinate.latitude, lng: businesses[i].location.coordinate.longitude};
				var rating_img = businesses[i].rating_img_url;
				var address = businesses[i].location.display_address;
				var phone = businesses[i].display_phone;
				var image = businesses[i].image_url;
				var review = businesses[i].snippet_text;
				var url = businesses[i].url;

				// console.log(i);

				// yelpLocations.push({title: title, location: position, clicked: ko.observable(false)});
				// console.log(yelpLocations);

				var marker = new google.maps.Marker({
					map: map,
					position: position,
					title: title,
					animation: google.maps.Animation.DROP,
					id: i,
					icon: barIcon,
					rating: rating_img,
					address: address,
					phone: phone,
					image: image,
					review: review,
					url: url
				});
				yelpMarkers.push(marker);
				yelpMarkers[i] = marker;
				marker.addListener('click', function() {
					octopus.fillYelpInfoWindow(this, infoWindow);
					this.setAnimation(google.maps.Animation.BOUNCE);
				});
				marker.addListener('mouseover', function() {
					this.setIcon(drinkIcon);
				});
				marker.addListener('mouseout', function() {
					this.setIcon(barIcon);
				});
				bounds.extend(yelpMarkers[i].position);
				$yelpElem.append('<li id="' + i + '">' + title + '</li><hr>');
			}
			document.getElementById('yelp_results').addEventListener('click', function(e) {
				for(var j = 0; j < businesses.length; j++) {
					var yelp_marker = yelpMarkers[j];
					if(e.target.innerHTML === yelp_marker.title) {
						// console.log(yelp_marker.title);
						// infoWindow.open(map, yelp_marker);
						octopus.fillYelpInfoWindow(yelp_marker, infoWindow);
						yelp_marker.setAnimation(google.maps.Animation.BOUNCE);
						console.log('test');
					}
				}
					// console.log(e.target.id);
			});
		},
		fail: function() {
			window.alert('No results found!');
		}
	};
	$.ajax(settings);

	return false;
};

$('#yelp_form_container').submit(loadData);

	
	
/*
***** Additional Features *****

-- 	Add a showFullList button

-- 	Add getStreetView to octopus. When the marker is clicked on the map
	the streetView and name should pop up. When the listItem is clicked
	place details should pop up	

-- 	Autocomplete search bar for near by places using yelp api

-- 	Keep track of how many times an item is clicked and display the list
	items from most clicks to least clicks

-- 	Draw tools

-- 	Zoom

-- 	Devise a way for the app to confirm if someone is actually at a location
	when they press the check in button

*/