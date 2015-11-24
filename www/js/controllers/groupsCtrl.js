/**
 * Created by Romain Gaillard on 25/10/2015.
 */
angular.module("groups.controllers")

    .controller('GroupsCtrl', ['$scope','$state','$ionicModal','$rootScope','$stateParams','Group','AuthSrv','Lock','$filter', function($scope, $state,$ionicModal,$rootScope, $stateParams, Group,AuthSrv,Lock,$filter) {
        $scope.group = new Group($stateParams.group.group);
        var lockInGroup = {}
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

        // ========= LES ACTIONS DU SCOPE =====================================

        $scope.updateGroupName = function(){
            var myGroup = new Group($scope.group)
            myGroup.$update().then(function(data){
            },function(err){
                console.log(err);
            })
        }

        $scope.nbLockDispo = function(){
            if($scope.locks){
                if($scope.locks.locks.length < 1)
                    return 0;
                var nb = 0;
                for(var i=0;i<$scope.locks.locks.length;i++) {
                    if(!$scope.locks.locks[i].isInGroup)
                        nb++;
                }
                return nb;
            }
        }

        // =========== GESTION DES LISTENERS ROOTSCOPE ========================

        var removeListener = function(){
            giveAccessListener();
            excludeListener();
            updateGroupListener();
            lockInGroupListener();
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

        var updateGroupListener = $rootScope.$on("updateGroup",function(event,data){
            if($scope.group.code == data.msg.data.codeGroup){
                $scope.$apply(function(){
                    $scope.group.name = data.msg.data.name;
                })
            }
        })

        var lockInGroupListener = $rootScope.$on("lockInGroup",function(event,data){
            // function utilisé pour la popup ajouter serrure existante.
            lockInGroup = data.locks;
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
            $scope.locks = new Lock();
            $scope.locks.$lock().then(function(data){
                // Afficher uniquement les serrues qui ne sont pas déjà présente dans le groupe.
                for(var i=0;i<$scope.locks.locks.length;i++){
                    var inGroup = $filter('filter')(lockInGroup, {id: $scope.locks.locks[i].id}).length;
                    if(inGroup > 0){
                        // Si la serrure est déjà dans le groupe
                        $scope.locks.locks[i].isInGroup = true;
                    }
                    else{
                        $scope.locks.locks[i].isInGroup = false;
                    }
                }
            },function(err){
                console.log(err);
            })
            $scope.closeAskLock()
        }

        $scope.doAddLock = function(){
            if($scope.locks.locks.length > 0) {
                for (var i = 0; i < $scope.locks.locks.length; i++) {
                    if ($scope.locks.locks[i].selected) {
                        var myGroup = new Group($scope.group);
                        myGroup.id = $scope.locks.locks[i].id;
                        myGroup.$addLock().then(function (data) {
                        }, function (err) {
                            console.log(err);
                        })
                    }
                }
                $scope.closeAddLock();
            }
            else{
                alert("Cocher au moins une serrure");
            }

        }

        $scope.newLock = function(){
            $scope.closeAskLock()
            $rootScope.$emit("callNewLock");
        };

    }])