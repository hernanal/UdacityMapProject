Find A Speakeasy!
===============================

## Introduction

This application was developed as part of the Udacity Front End Developer Nanodegree. We were required to utilize the knowledge gained from 'Neighborhood Map' modules to create an application from scratch.  It utilizes the JavaScript Google Maps API to display a map, markers, and info windows for each marker. There is a list of ten Speakeasy locations that will be displayed on initial load of the application. The application allows the user to filter the default list items by entering text into the search bar. Locations can also be filtered by entering a specific place, distance, and travel mode. 

The Yelp API is used to display a list of additional Speakeasy locations based on city and state inputs. Markers and info windows for each location are displayed on the Google Map for each Yelp list item. 

## Files

There is one main JavaScript file, three JavaScript libraries, one HTML file, one main CSS file, the bootstrap start template files, and two SVG image files that were used to create this application from scratch. 


The app2.js file utilizes the knockout.js framework and jquery library to display the Google map, markers, and info windows on the page. All click events are handled in this file, as well as any application animations.

An AJAX asynchronous Yelp request is also implemented and handled within this file using the oauth-signature library. This library was used because the Yelp API utilizes oauth 1.0 to serve data to the user. 


The HTML and CSS files are used to load the JavaScript file and APIs into the browser.


The bootstrap starter template was used in order to make the application responsive to different screen sizes. 


The images were used to change the look of the markers that are displayed on the Google Map.   


## Getting Started

1. Clone the repository.

2. Open the file directory locally. 

3. Double click the *index.html* file. (Google Chrome browser is recommended)

## References

https://developers.google.com/maps/documentation/javascript/tutorial

https://www.yelp.com/developers/documentation/v2/overview

http://knockoutjs.com/documentation/introduction.html

http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html


I hope you enjoy exploring the hidden and mysterious world of Speakeasys!





