/**
 * Created by Romain Gaillard on 25/10/2015.
 */


angular.module('groups.services')

    .service('GroupsSrv',['LocksSrv', function(LocksSrv) {
        var groups = new Array();

        this.addGroup = function(id,code,name,admin,validate){
            groups[groups.length] =  {id:id,code:code,name:name,admin:admin,validate:validate};
        }

        this.getGroups = function(){
            return groups;
        }

        this.getLocks = function(id){
            return LocksSrv.getLocks(id);
        }

        this.addLock = function(id,locks){
            LocksSrv.addLock(id,locks);
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
            }
        });
    }]);
