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

        this.addLock = function(id,name,state,addressMac,camera,bell,micro,isRegister){
            var locks = {name:name,state:state,addressMac:addressMac,camera:camera,bell:bell,micro:micro,isRegister:isRegister}
            LocksSrv.addLock(id,locks);
        }

}]);