angular.module("logs.controllers")

.controller('LogsCtrl', ['$scope','$state', function($scope, $state){
    /* $scope.gotoLogs = function(){
     $state.go("lock");
     };*/
    $scope.gotoLock = function(){
        $state.go("locks")
    };

}])