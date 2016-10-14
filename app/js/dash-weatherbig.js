'use strict';

//create the weather module
var dashWeatherbig = angular.module('dashWeatherbig',[]);



dashWeatherbig.factory('weatherService', ['$http', '$q', function ($http, $q){
  function getWeather (city , country) {
    var deferred = $q.defer();
    $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"
      + city +"%2C%20"+ country +"%22)%20and%20u%3D'"+"c"+"'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
      .success(function(data){
        deferred.resolve(data.query.results.channel);
        //console.log (data.query.results.channel.item.condition.code)
        //console.log(data)
      })
      .error(function(err){
        console.log('Error retrieving weather');
        deferred.reject(err);
      });
    return deferred.promise;
  }
  
  return {
    getWeather: getWeather
  };
}]);


// two big components
//**************************************************************
dashWeatherbig.component('dashWeatherbigtoday',{
  //the component template
  templateUrl: 'app/templates/dash-weatherbigtoday.html',
  bindings:{
    content: '<'
  },
  controller: dashWeatherController
});



dashWeatherbig.component('dashWeatherbigforecast',{
  //the component template
  templateUrl: 'app/templates/dash-weatherbigforecast.html',
  bindings:{
    content: '<'
  },
  controller: dashWeatherController
});


// Controller definition
//**********************************************************************
function dashWeatherController(){}

dashWeatherbig.controller('dashWeatherController', ['$scope', 'weatherService', function($scope, weatherService) {
  function fetchWeather(city ,country) {
    weatherService.getWeather(city ,country).then(function(data){
      $scope.place = data;
    }); 
  }
    
  $scope.findWeather = function(city, country) {
    $scope.place = '';
    fetchWeather(city , country);
  };
}]);
