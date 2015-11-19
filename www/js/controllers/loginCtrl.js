angular.module('login.controllers')


.controller('LoginCtrl', ['$scope','$state','$ionicModal','$http','User','AuthSrv', function($scope, $state,$ionicModal,$http,User,AuthSrv) {

    $scope.myUser = new User();
    $("[id='errorCo']").hide();

    $scope.myUser.identifier = "romain2.gaillard@ynov.com"
    $scope.myUser.password = "mdpRomain2"

    $scope.gotoRegister = function() {
        $state.go("register");
    }

    var finVerif = true;
    $scope.doLogin = function(myUser){
        //get(), query(), save() post, et delete() (ou remove() au choix)
        if(verifCase()){
            myUser.$login(function(user){
                AuthSrv.setUser(user);
                $state.go("locks");
            },function(err){
                errorCase();
                showError("Identifiant ou mot de passe incorrect.");
            });
        }
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


    var verifCase = function(){
        var noEmpty = true;
        if($("[ng-model='myUser.identifier']").val() == ""){
            errorCaseEmpty($("[ng-model='myUser.identifier']"));
            noEmpty = false;
        }
        if($("[ng-model='myUser.password']").val() == ""){
            errorCaseEmpty($("[ng-model='myUser.password']"));
            noEmpty = false;
        }
        if(!noEmpty)
            showError("Remplissez les champs");
        return noEmpty;
    }

    var errorCaseEmpty = function(elem){
        elem.parent().css("border","1px solid red");
    }

    var errorCase = function(){
        $("[ng-model='myUser.password']").css({"color":"red"})
        $("[ng-model='myUser.identifier']").css({"color":"red"})
    }

    $scope.reinitCase = function(elem){
        $(elem.target).css("color","").parent().css("border","");
    }

    var showError = function(msgError){
        if(finVerif){
            finVerif = false;
            $scope.msgBtConnexion = msgError;
            $("[id='successCo']").fadeOut("fast",function(){
                $("[id='errorCo']").fadeIn("fast");
            });

            $("[id='btConnexion']").switchClass("button-balanced","button-assertive","fast","easeInQuart",function() {
                $("[id='btConnexion']").delay(1500).switchClass("button-assertive", "button-balanced", "fast", "easeInQuart",function(){
                    $("[id='errorCo']").fadeOut("fast",function(){
                        $("[id='successCo']").fadeIn("fast");
                        finVerif = true;
                    });
                })
            })
        }
    };

    $scope.logout = function(){
        $scope.myUser.$logout(function(user){
            AuthSrv.removeUser();
            $state.go("app");
        },function(err){
            alert(err);
        });
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
