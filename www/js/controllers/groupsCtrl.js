/**
 * Created by Romain Gaillard on 25/10/2015.
 */


angular.module("groups.controllers")

    .controller('GroupsCtrl', ['$scope','$state','GroupsSrv','$ionicModal','$rootScope', function($scope, $state, GroupsSrv,$ionicModal,$rootScope) {
        $scope.locks = GroupsSrv.getLocks();

        $scope.gotoLocks = function(){
            $state.go("locks")
        }

        // ===== POPUP - DELETE GROUP! ====
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
            LocksCtrl.newLock()
        }

        // ===== POPUP - ASK LOCK! ====
        $ionicModal.fromTemplateUrl('templates/ask_lock.html', function(modal) {
            $scope.askLockModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        })

        $scope.closeAskLock = function() {
            $scope.askLockModal.hide();
        }

        $scope.askLock = function(){
            $scope.askLockModal.show();
        }

        $scope.addLock = function(){
            $scope.addLock()
        }

        $scope.newLock = function(){
            $scope.closeAskLock()

        }

        // ===== POPUP - ADD LOCK! ====
        $ionicModal.fromTemplateUrl('templates/add_lock.html', function(modal) {
            $scope.addLockModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        })

        $scope.closeAddLock = function() {
            $scope.addLockModal.hide();
        }

        $scope.addLock = function(){
            $scope.addLockModal.show();
            $scope.closeAskLock()
        }

        $scope.doAddLock = function(){

        }

        $scope.newLock = function(){
            //alert("merde")
            $scope.closeAskLock()
            $rootScope.$emit("callNewLock");
        };

    }])