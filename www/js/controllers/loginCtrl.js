angular.module('login.controllers')


.controller('LoginCtrl', ['$scope','$state','$ionicModal','$http', function($scope, $state,$ionicModal,$http) {

    $scope.gotoRegister = function() {
        $state.go("register");
    }

    $scope.doLogin = function(){
        $http.get()
        $state.go("locks");
        alert("LOGIN user: " + $scope.loginData.username + " - PW: " + $scope.loginData.password);
        
    }

    $scope.logOut = function(){
        $state.go("app");
    }


    $scope.forgetPassword = function(){
        alert("Indisponible")
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
