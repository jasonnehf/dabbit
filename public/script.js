'use strict';

var app = angular.module('dabbit',[]);

app.controller('dabbitCtrl', function($scope, $http) {
	$scope.newXaction={};

	$scope.getBalance = function() {
		if(!$scope.xactions)	return 0;
		return $scope.xactions.reduce((p,c)=>parseFloat(p)+parseFloat(c.amount),0);
	}


	$scope.addNewXaction = function()	{

	}

	$scope.removeXaction = function(xa) {


	}

	$scope.updateXaction = function(id) {

	}

	$scope.getAllXactions = function() {
		console.log("GET DB");
		$http({
			method:'GET',
			url:'http://localhost:8008/xactions/',
		})
		.then(function(res) {
			console.log("res.data: ",res.data);
			$scope.xactions=res.data;
			$scope.xactions.amount = parseFloat($scope.xactions.amount);
			}, function(err) {
				console.log(err);
		});
	}

	console.log("Controller Loaded!");
	// $scope.xactions=[];
	$scope.getAllXactions();



});