'use strict';

var app = angular.module('app', [ 'ngRoute','restangular' ,'dashNavigation' ,'dashTextMeasure' ,'dashWeatherbig']);

app.config(function(RestangularProvider) {
	RestangularProvider
			.setBaseUrl('http://localhost:3000');
});

// declare the routes
app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'app/views/home.html'
	});
	$routeProvider.otherwise({
		redirectTo : '/home'
	});
} ]);