angular.module('login.controllers')

.controller('LoginCtrl', function($scope) {
    $scope.data = "test";

    $scope.gotoRegister = function() {
        alert("ok");
        $state.go("register");
    }

    $scope.test = function(){
        return "TESTING"
    }

    $scope.login = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
    }
})