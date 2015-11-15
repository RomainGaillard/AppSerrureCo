/**
 * Created by Romain Gaillard on 23/10/2015.
 */


angular.module('locks.services')

    .service('LocksSrv', function() {
        var locks = new Array();

        this.getLocks = function(id){
            for(var i=0;i<locks.length;i++){
                if(locks[i].indexOf(id) >= 0){
                    var locks2 = new Array();
                    for (var j = 1; j < locks[i].length; j++){
                        locks2[j-1] = locks[i][j];
                    }
                    return locks2;
                }
            }
        }

        this.addLock = function(id,locks_){
            if(locks.length == 0) {
                locks[0] = new Array(id, locks_);
            }else {
                locks[locks.length] = new Array(id,locks_);
            }
        }

    })

    .factory('Lock',['$resource','ConstantsSrv','AuthSrv', function ($resource,ConstantsSrv,AuthSrv) {
        return $resource(null,null,{
            save:{
                method:"POST",
                url:ConstantsSrv.createLock,
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            }
        });
    }]);