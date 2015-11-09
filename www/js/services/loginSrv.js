
angular.module('authentification.services')

    /*.service('LoginSrv', function() {
        /*return {
         loginUser: function(name, pw) {
         var deferred = $q.defer();
         var promise = deferred.promise;

         if (name == 'user' && pw == 'secret') {
         deferred.resolve('Welcome ' + name + '!');
         } else {
         deferred.reject('Wrong credentials.');
         }
         promise.success = function(fn) {
         promise.then(fn);
         return promise;
         }
         promise.error = function(fn) {
         promise.then(null, fn);
         return promise;
         }
         return promise;
         }
         }
    })*/

    .service('LoginSrv',['User', function(User) {
        var myUser = new User();

        this.getUser = function(){
            return myUser;
        }

        this.setUser = function(user){
            myUser = user;
        }

        this.removeUser = function(){
            myUser = new User();
        }
    }])

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




