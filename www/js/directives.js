/**
 * Created by Romain Gaillard on 13/11/2015.
 */

angular.module('directives', ['authentification.services','groups.services'])

    .directive('lock-group', ['AuthSrv','GroupsSrv',function (AuthSrv,GroupsSrv) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'templates/lock_group.html',
            link: function ($scope, element, attributes) {
                console.log('mydirective');
                var code = attributes.code;
                console.log(code);
                io.socket.get('/group/'+group.code+'/lock',{token:AuthSrv.getUser().token},function(locks,jwres){
                    console.log(group.id);
                    GroupsSrv.addLock(group.id,locks);
                    $scope.locks = GroupsSrv.getLocks(group.id);
                })
            }
        }
    }]);
