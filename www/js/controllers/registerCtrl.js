/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("register.controllers")

    .controller('RegisterCtrl',['$scope','$state','$http','User','AuthSrv', function($scope,$state,$http, User,AuthSrv) {

        $scope.myNewUser = new User();
        $("[id='errorRegister']").hide();

        $scope.goToLogin = function() {
            $state.go("app");
        };

        var finVerif = true;
            $scope.doRegister = function(confirmPassword) {
            if(verifCase()){
                $scope.myNewUser.$register(function(user){
                    AuthSrv.setUser(user)
                    $state.go("locks");
                },function(err) {
                    ErrorCase($("[ng-model='myNewUser.email']"));
                    ErrorCase($("[ng-model='myNewUser.username']"));
                    showError("Inscription refusée: Identifiant existant !");
                });
            }
        };
        
        var test_email = function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }

        var verifCase= function(){
            var email = $("[ng-model='myNewUser.email']").val();
            var noEmpty = true;
            if($("[ng-model='myNewUser.firstname']").val() == ""){
                errorCaseEmpty($("[ng-model='myNewUser.firstname']"));
                noEmpty = false;
            }
            if($("[ng-model='myNewUser.lastname']").val() == ""){
                errorCaseEmpty($("[ng-model='myNewUser.lastname']"));
                noEmpty = false;
            }
            if($("[ng-model='myNewUser.email']").val() == ""){
                errorCaseEmpty($("[ng-model='myNewUser.email']"));
                noEmpty = false;
            }
            if($("[ng-model='myNewUser.username']").val() == ""){
                errorCaseEmpty($("[ng-model='myNewUser.username']"));
                noEmpty = false;
            }
            var password = $("[ng-model='myNewUser.password']").val();
            if(password == ""){
                errorCaseEmpty($("[ng-model='myNewUser.password']"));
                noEmpty = false;
            }
            var confirm_password = $("[ng-model='confirmPassword']").val();
            if(confirm_password == ""){
                errorCaseEmpty($("[ng-model='confirmPassword']"));
                noEmpty = false;
            }
            if(!noEmpty){
                showError("Remplissez les champs");
            }
            else if(!test_email(email)){
                ErrorCase();
                showError("L'email n'est pas valide");
            }
            else if(password != confirm_password){
                alert('ok');
                ErrorCase();
                showError("Les mots de passe ne correspondent pas !");
            }
            else if(password.length < 8){
                ErrorCase();
                showError("Le mot de passe est trop court. Minimum 8 caractères !");
            }
            else
                return true;
            return false;
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
            elem.parent().css("border","1px solid red");
        }

        var ErrorCase = function(elem){
            if(elem){
                $(elem.target).css({"color":"red"})
            }
            else{
                $("[ng-model='myNewUser.password']").css({"color":"red"})
                $("[ng-model='confirmPassword']").css({"color":"red"})
            }
        }
        $scope.reinitCase = function(elem){
            $(elem.target).css("color","").parent().css("border","");
        }
    }]);
