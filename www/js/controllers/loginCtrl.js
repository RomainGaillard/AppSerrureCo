angular.module('login.controllers')


.controller('LoginCtrl', ['$scope','$state','$ionicModal','$http','ConstantsSrv', function($scope, $state,$ionicModal,$http,ConstantsSrv) {

    $scope.gotoRegister = function() {
        $state.go("register");
    }

    $scope.doLogin = function(loginData){
/*
 https://blog.nraboy.com/2014/08/make-http-requests-android-ios-ionicframework/

        http({method: 'GET', url: 'https://creatorup.com/wp-json/users/me',
            headers: { 'Authorization': 'Basic ' + encodedString }
        })
            .success(function(data, status){
                $ionicLoading.hide();
                deferred.resolve(data);
            }).error(){
            console.log("Error while received data.");
            $ionicLoading.hide();
            deferred.reject();
        });

 */
        //$http.defaults.headers.post["Authorization"] = "token";
        alert("LOGIN user: " + loginData.email + " - PW: " + loginData.password);
        alert(ConstantsSrv.login);
        $http.post(ConstantsSrv.login,{data:{email:loginData.email,password:loginData.password}})
            .success(function(data,status,headers){
                alert("Success:"+data);
            })
            .error(function(data,status,headers){
                alert("Error:"+data);
            })

        //$state.go("locks");
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
