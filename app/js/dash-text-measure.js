'use strict';

//create the text-measure module
var dashTextMeasure = angular.module('dashTextMeasure',['restangular']);
// the module controller
dashTextMeasure.controller('dashTextMeasureController',  ['$scope', '$element', '$attrs' ,'$timeout', 'Restangular', 
	function ($scope, $element, $attrs ,$timeout, Restangular) {
	
	$scope.value = 0;
    $scope.init = function(name){
    	$scope.sensor = name; 
  	};
  	
    function update() {
        $timeout(function() {
        	var headerObj = { 'Content-Type' : 'application/json' ,'accept': 'application/json' };
        	var devices = Restangular.all('/sensehat');
        	devices.get($scope.sensor, {}, headerObj).then(function(response) {
        		//$scope.value = device.status.SinglePhaseActivePowerMeasurementState[0].value.split(' ')[0];
        		// $scope.value = parseFloat(response.value);
                $scope.value = parseInt(response.value);
        	});
            update();
        }, 5000);
    }
    
    update();

}]);

//define the text-measure component
dashTextMeasure.component('dashTextMeasure',{
	//the component template
	templateUrl: 'app/templates/dash-text-measure.html',
	bindings:{
		dashId: '<',
		value: '<',
		dashUnit: '<',
		dashIcon: '<',
		dashLabel: '<'
	},
	controller: dashTextMeasureController
});

// the widget controller, actually does nothing as no data can be changed / modified
function dashTextMeasureController($scope, $element, $attrs){
	//sensor = $attrs.dashLabel;
}