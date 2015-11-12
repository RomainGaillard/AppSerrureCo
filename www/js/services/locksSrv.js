/**
 * Created by Romain Gaillard on 23/10/2015.
 */


angular.module('locks.services')

    .service('LocksSrv', function() {
        var locks = new Array();
        this.getLocks = function(id){
            for(var i=0;i<locks.length;i++){
                if(locks[i].indexOf(id) >= 0){
                    alert("kkkk")
                    return locks[i]
                }
            }
        }

        this.addLock = function(id,lock){
            if(locks.length>0){
                alert("test");
                locks[0] = new Array(id,lock);
            }

            for(var i=0;i<locks.length;i++){
                if(locks[i].indexOf(id) >= 0){
                    locks[i][locks[i].length] = lock;
                    alert("ok");
                }
                else if(i==locks.length-1){
                    alert("ko")
                    locks[i] = new Array(id,lock);
                }
            }
        }
    });