angular.module('login.controllers')

.controller('LoginCtrl', ['$scope','$state', function($scope, $state) {
    $scope.gotoRegister = function() {
        $state.go("register");
    }

    $scope.doLogin = function(){
        $state.go("locks");
    }

    $scope.forgetPassword = function(){
        alert("Indisponible")
    }

    $scope.login = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
    }
}])