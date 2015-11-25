/**
 * Created by Romain Gaillard on 26/10/2015.
 */

angular.module("account.controllers")

    .controller('AccountCtrl', ['$scope','$state','$ionicModal','User','AuthSrv','$rootScope', function($scope, $state, $ionicModal, User,AuthSrv,$rootScope) {

        $("[id='msgError']").hide();

        $scope.myNewUser = new User(AuthSrv.getUser());
        var finVerif = true;


        var verifCase = function(){
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
            if(!noEmpty)
                showError("Remplissez les champs");
            return noEmpty;
        }

        var errorCaseEmpty = function(elem){
            //elem.parent().css("border","1px solid red");
        }

        var errorCase = function(model){
            $("[ng-model='"+model+"']").css({"color":"red"})
        }

        var showError = function(msgError,numBt){
            if(numBt == undefined) numBt = "";
            if(finVerif){
                finVerif = false;
                $scope.msgBtError = msgError;
                $("[id='msgNormal"+numBt+"']").fadeOut("fast",function(){
                    $("[id='msgError"+numBt+"']").fadeIn("fast");
                });

                $("[id='btValidate"+numBt+"']").switchClass("button-balanced","button-assertive","fast","easeInQuart",function() {
                    $("[id='btValidate"+numBt+"']").delay(1500).switchClass("button-assertive", "button-balanced", "fast", "easeInQuart",function(){
                        $("[id='msgError"+numBt+"']").fadeOut("fast",function(){
                            $("[id='msgNormal"+numBt+"']").fadeIn("fast");
                            finVerif = true;
                        });
                    })
                })
            }
        };


        // ========= LES ROUTES ======================================

        $scope.goToLocks = function(){
            $state.go("locks")
        };

        // ========= LES ACTIONS DU SCOPE =====================================

        $scope.updateUser = function() {
            if(verifCase()){
                $scope.myNewUser.$update().then(function (data) {
                    $state.go("locks")
                }, function (err) {
                    errorCase("myNewUser.email");
                    showError("Ce mail existe déjà ou est incorrect !");
                })
            }
        };

        $scope.reinitCase = function(elem){
            $(elem.target).css("color","").parent().css("border","");
        }


        // ===== POPUP - EDIT PASSWORD ================================

        // Create and load the Modal
        $ionicModal.fromTemplateUrl('templates/edit_password.html', function(modal) {
            $scope.editPasswordModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $scope.editPassword = function(){
            $scope.editPasswordModal.show();
            $scope.user = new User();
            $("[id='msgError2']").hide();
        };

        $scope.closeEditPassword = function() {
            $scope.editPasswordModal.hide();
        };

        $scope.doEditPassword = function(){
            if($scope.user.oldPassword == undefined || $scope.user.oldPassword == "" || $scope.user.newPassword == undefined || $scope.user.newPassword == "" || $scope.user.confirmNewPassword == undefined || $scope.user.confirmNewPassword == "")
                showError("Tous les champs ne sont pas remplis !",2)
            else if($scope.user.newPassword != $scope.user.confirmNewPassword) {
                showError("La confirmation ne correspond pas au nouveau mot de passe !", 2)
                errorCase("user.newPassword");
                errorCase("user.confirmNewPassword");
            }
            else{
                $scope.user.$editPassword().then(function(data){
                    $scope.closeEditPassword();
                    $rootScope.logout();
                },function(err){
                    console.log(err);
                    if(err.status == 403) {
                        showError("Le mot de passe actuel n'est pas bon !", 2);
                        errorCase("user.oldPassword");
                    }
                    else {
                        showError("Le mot de passe doit faire au moins 8 caractères !", 2)
                        errorCase("user.newPassword");
                        errorCase("user.confirmNewPassword");
                    }
                })
            }

        };


    }]);
