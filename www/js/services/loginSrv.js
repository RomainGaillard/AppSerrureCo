
angular.module('authentification.services')

    .service('AuthSrv',function($localStorage){
        this.setUser = function(user){
            $localStorage.user = user;
        }

        this.getUser = function(){
            if($localStorage.user)
                return $localStorage.user;
            return false;s
        }

        this.removeUser = function(){
            $localStorage.user = null;
        }
    })

    .factory('User',['$resource','ConstantsSrv', function ($resource,ConstantsSrv) {
        return $resource(null,null,{
            login:{
                method:'POST', url: ConstantsSrv.login
            },
            logout:{
                method:'GET', url: ConstantsSrv.logout
            },
            register:{
                method:'POST', url: ConstantsSrv.register
            }
        });
    }])




