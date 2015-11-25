/**
 * Created by Romain Gaillard on 23/10/2015.
 */
angular.module('locks.services')

    .factory('Lock',['$resource','ConstantsSrv','AuthSrv', function ($resource,ConstantsSrv,AuthSrv) {
        return $resource(null ,null,{
            /*save:{
                method:"POST",
                url:ConstantsSrv.createLock,
                headers: {
                    'Authorization': AuthSrv.getUser().token
                }
            },*/
            update:{
                method:"PUT",
                url:ConstantsSrv.updateLock,
                params:{id:'@id'},
                headers:{
                    'Authorization': AuthSrv.getUser().token
                }
            },
            lockById:{
                method:"GET",
                url:ConstantsSrv.lockById,
                params:{id:'@id'},
                headers:{
                    'Authorization': AuthSrv.getUser().token
                }
            },
            logs:{
                method:"GET",
                url:ConstantsSrv.logs,
                params:{id:'@id'},
                headers:{
                    'Authorization': AuthSrv.getUser().token
                }
            },
            logsByDate:{
                method:"POST",
                url:ConstantsSrv.logsByDate,
                params:{id:'@id'},
                headers:{
                    'Authorization': AuthSrv.getUser().token
                }
            },
            logsByDualDate:{
                method:"POST",
                url:ConstantsSrv.logsByDualDate,
                params:{id:'@id'},
                headers:{
                    'Authorization': AuthSrv.getUser().token
                }
            },
            lock:{
                method:"GET",
                url:ConstantsSrv.lock,
                headers:{
                    'Authorization': AuthSrv.getUser().token
                }
            }
        });
    }]);