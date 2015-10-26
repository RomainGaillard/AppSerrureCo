/**
 * Created by Romain Gaillard on 25/10/2015.
 */


angular.module("groups.controllers")

    .controller('GroupsCtrl', ['$scope','$state','GroupsSrv','$ionicModal', function($scope, $state, GroupsSrv,$ionicModal) {
        $scope.locks = GroupsSrv.getLocks();

        $scope.gotoLocks = function(){
            $state.go("locks")
        }

        // Create and load the Modal
        $ionicModal.fromTemplateUrl('templates/delete_group.html', function(modal) {
            $scope.deleteGroupModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        })

        $scope.deleteGroup = function(){
            $scope.deleteGroupModal.show();
        }

        $scope.closeDeleteGroup = function() {
            $scope.deleteGroupModal.hide();
        }

        $scope.doDeleteGroup = function(){

        }
    }])