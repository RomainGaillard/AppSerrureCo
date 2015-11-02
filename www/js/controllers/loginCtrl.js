angular.module('login.controllers')

.controller('LoginCtrl', ['$scope','$state','$ionicModal','$http', function($scope, $state,$ionicModal,$http) {
    $scope.gotoRegister = function() {
        $state.go("register");
    }

    $scope.doLogin = function(){
        $http.get()
        $state.go("locks");
    }

    $scope.forgetPassword = function(){
        alert("Indisponible")
    }

    $scope.login = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
    }

    $scope.logOut = function(){
        $state.go("app");
    }

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('templates/forget_password.html', function(modal) {
        $scope.forgetPasswordModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    })

    $scope.forgetPassword = function(){
        $scope.forgetPasswordModal.show();
    }

    $scope.closeForgetPassword = function() {
        $scope.forgetPasswordModal.hide();
    }

    $scope.resetPassword = function(){

    }

    }])