angular.module('login.controllers')


.controller('LoginCtrl', ['$scope','$state','$ionicModal','$http','ConstantsSrv','User', function($scope, $state,$ionicModal,$http,ConstantsSrv,User) {


    $scope.myUser = new User();
    $scope.gotoRegister = function() {
        $state.go("register");
    }

    $scope.doLogin = function(myUser){

        //get(), query(), save() post, et delete() (ou remove() au choix)

        myUser.$save(function(user){
            $http.defaults.headers.post["Authorization"] = user.token;
            $state.go("locks");
        },function(err){
            console.log(err);
        });


        /***********************************************************************
        *                                                                      *
        *     LAISSER LES COMMENTAIRES CI-DESSOUS POUR LE MOMENT. Merci !      *
        *                                                                      *
        ************************************************************************/

        /*io.socket.on('connect',function(){
            console.log('connected to sails ok')
            io.socket.get('/mylocks/3',function(data,jwres){
                console.log(data);
                $scope.locks = data;
            })
            io.socket.on('lock',function(msg){
                console.log(msg);
            })
        })

        */
        /*
        var data = {identifier:loginData.email,password:loginData.password};
        $http.post(ConstantsSrv.login,data,{
            headers:{
                'Content-Type':'application/json'
            }
        }).success(function(data,status,headers){
            alert(status);
            document.getElementById("test").innerHTML = data.token;
        }).error(function(data,status,headers){
            alert("Error:"+headers);
        });
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
