
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

    .factory('User',['$resource','ConstantsSrv', function ($resource,ConstantsSrv) {
        return $resource(null,null,{
            login:{
                method:'POST', url: ConstantsSrv.login
            },
            logout:{
                method:'GET', url: ConstantsSrv.logout
            }
        });
    }]);



