/**
 * Created by Romain Gaillard on 13/11/2015.
 */

angular.module('directives', ['authentification.services'])

    .directive('lockGroup', ['AuthSrv','Lock','$filter',function (AuthSrv,Lock,$filter) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'templates/directives/lock_group.html',
            link: function ($scope, element, attributes) {
                $scope.locks = {};
                var code = attributes.code;
                io.socket.get('/group/'+code+'/lock',{token:AuthSrv.getUser().token},function(locks,jwres){
                    $scope.$apply(function(){
                        for(var i=0;i<locks.length;i++){
                            if(locks[i].state == 1)
                                locks[i].state = true;
                            else
                                locks[i].state = false;
                        }
                        $scope.locks = locks;
                    })
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
            }
        }
    }])

    .directive('editLockGroup',['AuthSrv',function(AuthSrv){
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'templates/directives/edit_lock_group.html',
            link: function ($scope, element, attributes) {
                $scope.locks = {};
                var code = attributes.code;
                io.socket.get('/group/'+code+'/lock',{token:AuthSrv.getUser().token},function(locks,jwres){
                    $scope.$apply(function(){
                        $scope.locks = locks;
                    })
                })

                io.socket.on('lock',function(msg){
                    alert('EVENT LOCK RECU');
                    console.log(msg);
                })
            }
        }
    }])

