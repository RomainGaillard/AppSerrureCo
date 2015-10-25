angular.module('login.controllers')

.controller('LoginCtrl', ['$scope','$state', function($scope, $state) {
    $scope.gotoRegister = function() {
        $state.go("register");
    }

    $scope.doLogin = function(){
        alert('En contruction');
    }

    $scope.login = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
    }
}])