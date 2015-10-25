/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("register.controllers")

    .controller('RegisterCtrl',['$scope','$state', function($scope,$state) {

        $scope.doRegister = function(){
            alert('En contruction');
        }

        $scope.gotoLogin = function() {
            $state.go("app");
        }

    }])
