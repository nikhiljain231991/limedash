var restApp = angular.module('restApp',[]);
	
var restClass = function(){
	this.restArray = new Object();
}

restClass.prototype.getData = function(entry){
	var self = this;
	self.restArray.orderId = entry.orderId;
	self.restArray.state = entry.state;
	self.restArray.amount = entry.amount;
	self.restArray.name = entry.customer.name;
	self.restArray.phone = entry.customer.phone;
	self.restArray.address = entry.customer.address;
	self.restArray.lat = entry.customer.latitude;
	self.restArray.long = entry.customer.longitude;

	var newDate = new Date();
	newDate.setTime(entry.createdAt);

	self.restArray.createdAt = newDate.toUTCString();
	return self.restArray;
}

//model

restApp.factory('restDataAPI', function($http){
    return {
        list: function($scope){
            $http.get($scope.link).then(function successCallback(response) {
                response.data.forEach(function(entry) {
					var rest = new restClass();
                    $scope.restArray.push(rest.getData(entry));
                });
				//document.getElementById("loading").style.display = 'none';
				//document.getElementById("loading").className = 'after';
            });
        }
    };
});


//controller

restApp.controller('mainController', function($scope,restDataAPI) {
	$scope.link = "json/sample-order-dump.json";
	$scope.myFilter="accepted";
    $scope.restArray = new Array();
    restDataAPI.list($scope);
    console.log($scope.restArray);
});