/**
 * Created by Romain Gaillard on 23/10/2015.
 */


angular.module('locks.services')

    .service('LocksSrv', function() {
        var locks = new Array();

        this.getLocks = function(id){
            for(var i=0;i<locks.length;i++){
                if(locks[i].indexOf(id) >= 0){
                    return locks[i]
                }
            }
        }

        this.addLock = function(id,locks_){
            if(locks.length == 0) {
                locks[0] = new Array(id, locks_);
            }else {
                locks[locks.length] = new Array(id,locks_);
            }
            /*
            if(locks.length == 0){
                locks[0] = new Array(id,lock);
            }
            else{
                for(var i=0;i<locks.length;i++){
                    alert(locks[i].indexOf(id))
                    if(locks[i].indexOf(id) >= 0){
                        locks[i][locks[i].length] = lock;
                    }
                    else if(i==locks.length-1){
                        locks[i] = new Array(id,lock);
                    }
                }
            }
            */
        }
    });