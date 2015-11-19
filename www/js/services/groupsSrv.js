/**
 * Created by Romain Gaillard on 25/10/2015.
 */


angular.module('groups.services')

    .service('GroupsSrv',['LocksSrv', function(LocksSrv) {
        var groups = new Array();

        this.addGroup = function(group){
            groups[groups.length] = group;
            return groups;
        }

        this.getGroups = function(){
            return groups;
        }

        this.removeGroup = function(group){
            var index = groups.indexOf(group);
            groups.splice(index,1);
            return groups;
        }
    }])


    .factory('Group',['$resource','ConstantsSrv','AuthSrv', function ($resource,ConstantsSrv,AuthSrv) {
        return $resource(ConstantsSrv.group,{code:'@code'},{
            exit:{
                method:'DELETE',
                url:ConstantsSrv.exitGroup,
                params:{code:'@code'},
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            },
            delete:{
                method:'DELETE',
                url:ConstantsSrv.destroyGroup,
                params:{code:'@code'},
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            },
            save:{
                method:'POST',
                url:ConstantsSrv.createGroup,
                params:{name:'@name'},
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            },
            removeLock:{
                method:"POST",
                url:ConstantsSrv.removeLock,
                params:{code:'@code',id:'@lockId'},
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            },

            user:{
                method:'GET',
                url:ConstantsSrv.user,
                params:{code:'@code'},
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            },
            giveAccess:{
                method:'PUT',
                url:ConstantsSrv.giveAccess,
                params:{code:'@code'},
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            },
            exclude:{
                method:"DELETE",
                url:ConstantsSrv.exclude,
                params:{code:'@code'},
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            },
        });
    }]);
