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
                            $scope.$apply(function() {
                                lock.state = msg.data.lock.state;
                            })
                            break;
                    }
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
            }
        }
    }])

    .directive('editLockGroup',['AuthSrv','Group','$rootScope',function(AuthSrv,Group,$rootScope){
        return {
            restrict: 'E',
            scope: false,
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

