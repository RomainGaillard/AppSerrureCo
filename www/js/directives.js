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

                io.socket.on('lock',function(msg){
                    switch(msg.verb) {
                        case "updated":
                            var lock = $filter('filter')($scope.locks, {id: msg.id})[0];
                            if(lock){
                                $scope.$apply(function() {
                                    lock.state = msg.data.lock.state;
                                })
                            }

                            break;
                    }
                })

                $scope.$on('$destroy', function(){
                    io.socket.removeAllListeners();
                })

                $scope.updateLock = function(lock){
                    var lock = new Lock(lock);
                    lock.$update().then(function(data){
                    },function(err){
                        alert("Erreur:"+data);
                        console.log(err);
                    })
                }

                $rootScope.$on("majLock",function(event,data){
                    if(data.groupCode == code){
                        $scope.$apply(function() {
                            $scope.locks.push(data.lock);
                        })
                    }
                })

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
                            break;
                    }
                })
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
                io.socket.get('/group/'+code+'/lock',{token:AuthSrv.getUser().token},function(locks,jwres){
                    if(jwres.statusCode == 200){
                        $scope.$apply(function(){
                            $scope.locks = locks;
                        })
                    }

                })

                io.socket.on('lock',function(msg){
                    alert('EVENT LOCK RECU');
                    console.log(msg);
                });

                $scope.$on('$destroy', function(){
                    io.socket.removeAllListeners();
                })

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

                $rootScope.$on("majLock",function(event,data){
                    if(data.groupCode == code){
                        $scope.$apply(function() {
                            $scope.locks.push(data.lock);
                        })
                    }
                })
            }
        }
    }])

