angular.module('authentification.services')

    .service('AuthSrv',function($localStorage){
        this.setUser = function(user){
            $localStorage.user = user;
        }

        this.getUser = function(){
            if($localStorage.user)
                return $localStorage.user;
            return false;
        }

        this.removeUser = function(){
            $localStorage.user = null;
        }

        this.updateUser = function(data){
            var token = $localStorage.user.token;
            $localStorage.user.email = data.email;
            $localStorage.user.firstname = data.firstname;
            $localStorage.user.lastname = data.lastname;
            $localStorage.user.token = token;
        }
    })

    .factory('User',['$resource','ConstantsSrv','AuthSrv', function ($resource,ConstantsSrv,AuthSrv) {
        return $resource(null,null,{
            login:{
                method:'POST', url: ConstantsSrv.login
            },
            logout:{
                method:'GET', url: ConstantsSrv.logout
            },
            register:{
                method:'POST', url: ConstantsSrv.register
            },
            update:{
                method:'PUT',
                url: ConstantsSrv.updateAccount,
                headers:{
                    'Authorization':AuthSrv.getUser().token
                }
            },
            editPassword:{
                method:"PUT",
                url:ConstantsSrv.editPassword,
                headers:{
                    'Authorization':AuthSrv.getUser().token
                }
            }
        });
    }])




