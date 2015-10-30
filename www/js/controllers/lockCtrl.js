angular.module("lock.controllers")

.controller('LockCtrl', ['$scope','$state', function($scope, $state){
   /* $scope.gotoLogs = function(){
        $state.go("lock");
    };*/
    $scope.gotoLocks = function(){
            $state.go("locks")
    }/*
     }
    $scope.gotoLock = function(){
        $state.go("lock");
    };*/
}])
