/**
 * Created by Romain Gaillard on 13/11/2015.
 */

angular.module('directives', ['authentification.services'])

    .directive('lockGroup', ['AuthSrv',function (AuthSrv) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'templates/directives/lock_group.html',
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

