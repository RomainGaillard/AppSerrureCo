angular.module('login.controllers')

.controller('LoginCtrl', ['$scope','$state','$ionicModal', function($scope, $state,$ionicModal) {
    $scope.loginData = {};

    $scope.gotoRegister = function() {
        $state.go("register");
    }

    $scope.doLogin = function(){
        var email = 'jordi@set.com';
        var password = '1234';
        /* var answer = loginSendToapi($scope.loginData.email, $scope.loginData.password)
        
        if(anwser == 1){
            $state.go("locks");
            alert('good ...');
        }
        else{
            alert('bad request, please check your login or password');   
        }

        */
        if(email == $scope.loginData.email && password == $scope.loginData.password){
            $state.go("locks");
            alert('good');
        }
        else{
            alert('bad');
        }
        alert("LOGIN user: " + $scope.loginData.email + " - PW: " + $scope.loginData.password);
        
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