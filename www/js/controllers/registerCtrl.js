/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("register.controllers")

    .controller('RegisterCtrl',['$scope','$state','$http','User', function($scope,$state,$http, User) {

        $scope.myUser = new User();
        $("[id='errorRegister']").hide();

        $scope.gotoLogin = function() {
            $state.go("app");
        };

        var finVerif = true;
        $scope.doRegister = function(confirmPassword) {
            if(verifCase()){
                $scope.myUser.$register(function(user){
                    $http.defaults.headers.post["Authorization"] = user.token;
                    $state.go("locks");
                },function(err) {
                    ErrorCase($("[ng-model='myUser.email']"));
                    ErrorCase($("[ng-model='myUser.username']"));
                    showError("Inscription refusée: Identifiant existant !");
                });
            }
        }

        var verifCase= function(){
            var noEmpty = true;
            if($("[ng-model='myUser.firstname']").val() == ""){
                errorCaseEmpty($("[ng-model='myUser.firstname']"));
                noEmpty = false;
            }
            if($("[ng-model='myUser.lastname']").val() == ""){
                errorCaseEmpty($("[ng-model='myUser.lastname']"));
                noEmpty = false;
            }
            if($("[ng-model='myUser.email']").val() == ""){
                errorCaseEmpty($("[ng-model='myUser.email']"));
                noEmpty = false;
            }
            if($("[ng-model='myUser.username']").val() == ""){
                errorCaseEmpty($("[ng-model='myUser.username']"));
                noEmpty = false;
            }
            var password = $("[ng-model='myUser.password']").val();
            if(password == ""){
                errorCaseEmpty($("[ng-model='myUser.password']"));
                noEmpty = false;
            }
            var confirm_password = $("[ng-model='confirmPassword']").val();
            if(confirm_password == ""){
                errorCaseEmpty($("[ng-model='confirmPassword']"));
                noEmpty = false;
            }
            if(!noEmpty){
                showError("Remplissez les champs");
                return false;
            }
            else if(password != confirm_password){
                ErrorCase();
                showError("Les mots de passe ne correspondent pas !")
                return false;
            }
            else if(password.length < 8){
                ErrorCase();
                showError("Le mot de passe est trop court. Minimum 8 caractères !");
                return false;
            }
            return true;
        }

        var showError = function(msgError){
            if(finVerif){
                finVerif = false;
                $scope.msgBtRegister = msgError;
                $("[id='successRegister']").fadeOut("fast",function(){
                    $("[id='errorRegister']").fadeIn("fast");
                });

                $("[id='btRegister']").switchClass("button-balanced","button-assertive","fast","easeInQuart",function() {
                    $("[id='btRegister']").delay(1500).switchClass("button-assertive", "button-balanced", "fast", "easeInQuart",function(){
                        $("[id='errorRegister']").fadeOut("fast",function(){
                            $("[id='successRegister']").fadeIn("fast");
                            finVerif = true;
                        });
                    })
                })
            }
        }

        var errorCaseEmpty = function(elem){
            $(elem.target).parent().css("border","1px solid red");
        }

        var ErrorCase = function(elem){
            if(elem){
                $(elem.target).css({"color":"red"})
            }
            else{
                $("[ng-model='myUser.password']").css({"color":"red"})
                $("[ng-model='confirmPassword']").css({"color":"red"})
            }
        }
        $scope.reinitCase = function(elem){
            $(elem.target).css("color","").parent().css("border","");
        }
    }]);
