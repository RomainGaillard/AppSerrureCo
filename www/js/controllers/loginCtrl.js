angular.module('login.controllers')


.controller('LoginCtrl', ['$scope','$state','$ionicModal','$http','ConstantsSrv', function($scope, $state,$ionicModal,$http,ConstantsSrv) {

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
        
 /*   $scope.doLogin = function(loginData){

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

            $http.put('https://api.parse.com/1/classes/Todo/'+id,data,{
            headers:{
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json'
            }
            });

 /////////////////////// décommenté ///////////////////////////////////////
        //$http.defaults.headers.post["Authorization"] = "token";
        alert("LOGIN user: " + loginData.email + " - PW: " + loginData.password);
        alert(ConstantsSrv.login);
        var data = {identifier:loginData.email,password:loginData.password};
        $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        $http.post(ConstantsSrv.login,data,{
            headers:{
                'Content-Type':'application/json'
            }
        }).success(function(data,status,headers){

        }).error(function(data,status,headers){
            alert("Error:"+headers);
        });
    //////////////////////////////////////////////////////////////////
    */
        /*
        $http.post(ConstantsSrv.login,{data:{identifier:loginData.email,password:loginData.password}})
            .success(function(data,status,headers){
                alert("Success:"+data);
            })
            .error(function(data,status,headers){
                alert("Error:"+data);
            })
        */
        //$state.go("locks");
        /*$http.defaults.headers.post["Authorization"] = "wx6h30Kf+zqf5onU4lo0mRArM4uhGl9A08UYteSB/cA4PenMPsXSqhLQb8j+0Sy9";
        $http.post(ConstantsSrv.createGroup,{data:{name:"toto"}})
            .success(function(data,status,headers){
                alert("Success:"+data);
            })
            .error(function(data,status,headers){
                alert("Error:"+data);
            })
        */
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
