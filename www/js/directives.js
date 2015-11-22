/**
 * Created by Romain Gaillard on 13/11/2015.
 */

angular.module('directives', ['authentification.services'])

    .directive('lockGroup', ['AuthSrv','Lock','$filter','$rootScope',function (AuthSrv,Lock,$filter,$rootScope) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'templates/directives/lock_group.html',
            link: function ($scope, element, attributes) {
                $scope.locks = new Array();
                var code = attributes.code;

                var getLocks = function(){
                    io.socket.get('/group/'+code+'/lock',{token:AuthSrv.getUser().token},function(locks,jwres){
                        if(jwres.statusCode == 200)
                        {
                            $scope.$apply(function(){
                                for(var i=0;i<locks.length;i++){
                                    if(locks[i].state == 1)
                                        locks[i].state = true;
                                    else
                                        locks[i].state = false;
                                }
                                $scope.locks = locks;
                            })
                        }
                    })
                }

                getLocks();

                $scope.updateLock = function(lock){
                    var lock = new Lock(lock);
                    lock.$update().then(function(data){
                    },function(err){
                        alert("Erreur:"+data);
                        console.log(err);
                    })
                }

                // =========== GESTION DES LISTENERS ROOTSCOPE ========================

                $rootScope.$on("lockUpdated",function(event,data){
                    $scope.$apply(function(){
                        for(var i=0;i<$scope.locks.length;i++){
                            if($scope.locks[i].id == data.msg.data.lock.id){
                                $scope.locks[i] = data.msg.data.lock;
                            }
                        }
                    })
                })

                $rootScope.$on("removeLock",function(event,data){
                    $scope.$apply(function(){
                        if(code == data.msg.data.group.code){
                            for(var i=0;i<$scope.locks.length;i++){
                                if($scope.locks[i].id == data.msg.data.lock.id){
                                    $scope.locks.splice(i,1);
                                }
                            }
                        }
                    })
                })

                $rootScope.$on("addLock",function(event,data){
                    if(code == data.msg.data.group.code)
                        getLocks();
                })

                /*
                io.socket.on('group',function(msg){
                    switch(msg.verb){
                        case "updated":
                            if(msg.data.lockRemove){
                                $scope.$apply(function(){
                                    if(code == msg.data.group.code){
                                        for(var i=0;i<$scope.locks.length;i++){
                                            if($scope.locks[i].id == msg.data.lockRemove.id){
                                                $scope.locks.splice(i,1);
                                            }
                                        }
                                    }
                                })
                            }
                            if(msg.data.lockAdd){
                                // Appel à la socket get lock obligatoire pour avoir l'écoute (subscibe) sur la nouvelle lock.
                                if(code == msg.data.group.code)
                                    getLocks();
                            }
                            break;
                    }
                })*/
            }
        }
    }])

    .directive('nbUsersWait',['AuthSrv','Group',function(AuthSrv,Group){
        return{
            restrict:'E',
            scope:true,
            template:"<button class='button-clear ion-person-add black' ng-hide='nbUsersWait == 0'> {{nbUsersWait}} demande(s) d'accès</button>",
            link:function($scope,element,attributes){
                var group = new Group();
                group.code = attributes.code;
                group.$usersWait().then(function(data){
                    $scope.nbUsersWait = data.usersWait.length;
                },function(err){
                    console.log(err);
                })
            }
        }
    }])

    .directive('editLockGroup',['AuthSrv','Group','$rootScope',function(AuthSrv,Group,$rootScope){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'templates/directives/edit_lock_group.html',
            link: function ($scope, element, attributes) {
                $scope.locks = {};
                var code = attributes.code;

                var getLocks = function(){
                    io.socket.get('/group/'+code+'/lock',{token:AuthSrv.getUser().token},function(locks,jwres){
                        if(jwres.statusCode == 200) {
                            $scope.$apply(function(){
                                $scope.locks = locks;
                            })
                        }
                    })
                }

                getLocks();

                $scope.removeLock = function(lock,index){
                    var group = new Group();
                    group.code = code
                    group.lockId = lock.id;
                    group.$removeLock().then(function(data){
                        $scope.locks.splice(index,1);
                    },function(err){
                        console.log(err);
                    })
                }

                // =========== GESTION DES LISTENERS ROOTSCOPE ========================

                var majLockListener = $rootScope.$on("lockUpdated",function(event,data){
                    $scope.$apply(function(){
                        for(var i=0;i<$scope.locks.length;i++){
                            if($scope.locks[i].id == data.msg.data.lock.id){
                                $scope.locks[i] = data.msg.data.lock;
                            }
                        }
                    })
                })

                var lockRemoveListener = $rootScope.$on("removeLock",function(event,data){
                    $scope.$apply(function(){
                        if(code == data.msg.data.group.code){
                            for(var i=0;i<$scope.locks.length;i++){
                                if($scope.locks[i].id == data.msg.data.lock.id){
                                    $scope.locks.splice(i,1);
                                }
                            }
                        }
                    })
                })

                var addLockListener = $rootScope.$on("addLock",function(event,data){
                    if(code == data.msg.data.group.code)
                        getLocks();
                })

                $rootScope.removeListenerEditGroup = function(){
                    majLockListener();
                    lockRemoveListener();
                    addLockListener();
                }
            }
        }
    }])

