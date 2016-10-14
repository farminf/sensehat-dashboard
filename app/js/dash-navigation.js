'use strict';
var dashNavigation = angular.module('dashNavigation', []);


dashNavigation.controller( "dashNavigationController",  function() {});

//define the switch component
dashNavigation.component('dashNavigation',{
	//the component template
	templateUrl: 'app/templates/dash-navigation.html'
});

function dashNavigationController(){}