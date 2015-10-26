/**
 * Created by Romain Gaillard on 26/10/2015.
 */

angular.module("account.controllers")

    .controller('AccountCtrl', ['$scope','$state','$ionicModal', function($scope, $state, $ionicModal) {

        $scope.gotoLocks = function(){
            $state.go("locks")
        }

        // Create and load the Modal
        $ionicModal.fromTemplateUrl('templates/edit_password.html', function(modal) {
            $scope.editPasswordModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        })

        $scope.editPassword = function(){
            $scope.editPasswordModal.show();
        }

        $scope.closeEditPassword = function() {
            $scope.editPasswordModal.hide();
        }

        $scope.doEditPassword = function(){

        }

    }])
