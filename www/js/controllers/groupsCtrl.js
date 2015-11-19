/**
 * Created by Romain Gaillard on 25/10/2015.
 */


angular.module("groups.controllers")

    .controller('GroupsCtrl', ['$scope','$state','$ionicModal','$rootScope','$stateParams','Group', function($scope, $state,$ionicModal,$rootScope, $stateParams, Group) {
        $scope.group =  new Group($stateParams.group.group);
        $scope.locks = {}

        $scope.gotoLocks = function(){
            $state.go("locks")
        }

        $scope.removeLock = function(i){
            $scope.group.lockId = $("#"+$scope.group.code).scope().locks[i].id;
            $scope.group.$removeLock().then(function(data){
                console.log(data);
                $("#"+$scope.group.code).scope().locks.splice(i,1);
            },function(err){
                console.log(err);
            })
        }
        // ===== MANAGE MEMBER ====
        $scope.goToManageMembers = function() {
            $state.go("member", {group:$scope.group});
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
            var t = $scope.group.$delete();
            t.then(function(data){
                $scope.closeDeleteGroup();
                $state.go("locks");
            },function(err){
                console.log(err);
            })
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
            $scope.closeAskLock()
            $rootScope.$emit("callNewLock");
        };

        $rootScope.$on("majLock",function(event,lock){
            if($("#"+$scope.group.code).scope())
                $("#"+$scope.group.code).scope().locks.push(lock);
        })

    }])