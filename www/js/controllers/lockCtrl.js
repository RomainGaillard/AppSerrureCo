angular.module("lock.controllers")

.controller('LockCtrl', ['$scope','$state', '$stateParams', 'Lock', function($scope, $state, $stateParams, Lock){
    $scope.lock =  new Lock($stateParams.lock);

        /* $scope.gotoLogs = function(){
             $state.go("lock");
         };*/
    $scope.gotoLocks = function(){
        $state.go("locks");
    };
    $scope.gotoLogs = function(){
        $state.go("logs");
    };
}])
