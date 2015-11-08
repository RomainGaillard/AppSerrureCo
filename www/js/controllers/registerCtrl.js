/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("register.controllers")

    .controller('RegisterCtrl',['$scope','$state','$http','User', function($scope,$state,$http, User) {

        $scope.myUser = new User();

        $scope.gotoLogin = function() {
            $state.go("app");
        };

        $scope.doRegister = function(confirm) {
            if(!$scope.myUser.firstname || !$scope.myUser.lastname || !$scope.myUser.password || !$scope.myUser.email){
                console.log('Au moins un champ n\'est pas rempli');

            }else {
                console.log('Tous les champs sont remplis');
                if($scope.myUser.password.length <8){
                    console.log('password is too short')
                    return;
                }else console.log($scope.myUser.password.length)
                if($scope.myUser.password === confirm){
                    console.log('password bien confirmé');
                    $scope.myUser.$register(function(user){
                        $http.defaults.headers.post["Authorization"] = user.token;
                        $state.go("locks");
                    },function(err) {
                        console.log(err);
                    });
                }else console.log('password non identique')
            }
        }

    }]);
