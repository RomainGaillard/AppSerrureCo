/**
 * Created by Romain Gaillard on 25/10/2015.
 */
angular.module("groups.controllers")

    .controller('GroupsCtrl', ['$scope','$state','$ionicModal','$rootScope','$stateParams','Group','AuthSrv', function($scope, $state,$ionicModal,$rootScope, $stateParams, Group,AuthSrv) {
        $scope.group = new Group($stateParams.group.group);

        // ===== ROUTES ========

        $scope.goToLocks = function(){
            $rootScope.removeListenerEditGroup();
            removeListener();
            $state.go("locks")
        }

        $scope.goToManageMembers = function() {
            $rootScope.removeListenerEditGroup();
            removeListener();
            $state.go("mwm.member", {group:$scope.group});
        }

        // =========== GESTION DES LISTENERS ROOTSCOPE ========================

        var removeListener = function(){
            giveAccessListener();
            excludeListener();
        }

        var giveAccessListener = $rootScope.$on("giveAccess",function(event,data){
            if($scope.group.code == data.msg.data.codeGroup) {
                if (data.msg.data.email == AuthSrv.getUser().email)
                    $scope.goToLocks();
            }
        })

        var excludeListener = $rootScope.$on("exclude",function(event,data){
            if($scope.group.code == data.msg.data.codeGroup){
                if (data.msg.data.email == AuthSrv.getUser().email)
                    $scope.goToLocks();
            }
        })

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
            $scope.group.$delete().then(function(data){
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

    }])