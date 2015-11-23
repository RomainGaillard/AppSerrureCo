/**
 * Created by Romain Gaillard on 26/10/2015.
 */

angular.module("account.controllers")

    .controller('AccountCtrl', ['$scope','$state','$ionicModal','User','AuthSrv', function($scope, $state, $ionicModal, User,AuthSrv) {

        $("[id='errorSave']").hide();

        $scope.myNewUser = new User(AuthSrv.getUser());
        var finVerif = true;



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
                    errorCase();
                    showError("ce mail existe déjà ou est incorrecte, veuillez en rentrer un autre");
                })
            }
        };

        var errorCaseEmpty = function(elem){
            elem.parent().css("border","1px solid red");
        }

        var errorCase = function(){
            $("[ng-model='myNewUser.firstname']").css({"color":"red"})
            $("[ng-model='myNewUser.lastname']").css({"color":"red"})
            $("[ng-model='myNewUser.email']").css({"color":"red"})
        }

        $scope.reinitCase = function(elem){
            $(elem.target).css("color","").parent().css("border","");
        }

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

        var showError = function(msgError){
            if(finVerif){
                finVerif = false;
                $scope.msgBtSave = msgError;
                $("[id='successSave']").fadeOut("fast",function(){
                    $("[id='errorSave']").fadeIn("fast");
                });

                $("[id='btSave']").switchClass("button-balanced","button-assertive","fast","easeInQuart",function() {
                    $("[id='btSave']").delay(1500).switchClass("button-assertive", "button-balanced", "fast", "easeInQuart",function(){
                        $("[id='errorSave']").fadeOut("fast",function(){
                            $("[id='successSave']").fadeIn("fast");
                            finVerif = true;
                        });
                    })
                })
            }
        };

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
        };

        $scope.closeEditPassword = function() {
            $scope.editPasswordModal.hide();
        };

        $scope.doEditPassword = function(){

        };


    }]);
