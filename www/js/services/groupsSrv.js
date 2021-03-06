/**
 * Created by Romain Gaillard on 25/10/2015.
 */


angular.module('groups.services')

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
            }/*,
            save:{
                method:'POST',
                url:ConstantsSrv.createGroup,
                params:{name:'@name'},
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            }*/,
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
                params:{code:'@code',email:'@email',admin:'@admin'},
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            },
            exclude:{
                method:"DELETE",
                url:ConstantsSrv.exclude,
                params:{code:'@code',email:'@email'},
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            },
            join:{
                method:"POST",
                url:ConstantsSrv.join,
                params:{code:'@code',email:"@email",admin:"@admin"},
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            },
            askAccess:{
                method:"POST",
                url:ConstantsSrv.askAccess,
                params:{code:'@code'},
                headers:{
                    'Authorization':AuthSrv.getUser().token
                }
            },
            usersWait:{
                method:"POST",
                url:ConstantsSrv.groupUsersWait,
                params:{code:'@code'},
                headers:{
                    'Authorization':AuthSrv.getUser().token
                }
            },
            update:{
                method:"PUT",
                url:ConstantsSrv.groupUpdate,
                params:{code:'@code'},
                headers:{
                    'Authorization':AuthSrv.getUser().token
                }
            },
            addLock:{
                method:"POST",
                url:ConstantsSrv.addLock,
                params:{code:'@code',id:'@id'},
                headers:{
                    'Authorization':AuthSrv.getUser().token
                }
            }
        });
    }]);
