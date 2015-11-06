/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("register.controllers")

    .controller('RegisterCtrl',['$scope','$state','$http','User', function($scope,$state,$http, User) {

        $scope.myUser = new User();

        $scope.gotoLogin = function() {
            $state.go("app");
        }

        $scope.doRegister = function(confirm) {
            if(!$scope.myUser.firstname || !$scope.myUser.lastname || !$scope.myUser.password || !$scope.myUser.email){
                if($scope.myUser.password === confirm)
                console.log('Au moins un champ n\'est pas rempli');
                console.log($scope.myUser.lastname);
                console.log($scope.myUser.firstname);
                console.log($scope.myUser.password);
                console.log($scope.myUser.email);


                //myUser.create(function(user){
                //},function(err){
                //
                //})
            }else {
                console.log('Tous les champs sont remplis');
                if($scope.myUser.password === confirm){
                    console.log('password bien confirmé')
                    $scope.myUser.$register(function(user){
                        $http.defaults.headers.post["Authorization"] = user.token;
                        $state.go("locks");
                    },function(err) {
                        console.log(err);
                    });
                }else console.log('password non identique')
            }
        }

    }])
