/**
 * Created by Romain Gaillard on 25/10/2015.
 */


angular.module('groups.services')

    .service('GroupsSrv',['LocksSrv', function(LocksSrv) {
        var groups = [
            { code: 'FG215C20', name: "Ingesup 1" },
            { code: 'XF5C80', name: "Ingesup 2" }
        ]

        this.getGroups = function(){
            return groups;
        }

        this.getLocks = function(){
            return LocksSrv.getLocks();
        }
}]);


    .factory('Group',['$resource','ConstantsSrv', function ($resource,ConstantsSrv) {
        return $resource(ConstantsSrv.group,{code:'@code'});
    }])