angular.module('logs.services')

    .factory('Log',['$resource','ConstantsSrv','AuthSrv', function ($resource,ConstantsSrv,AuthSrv) {
        return $resource(null ,null,{
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
            }
        });
    }]);