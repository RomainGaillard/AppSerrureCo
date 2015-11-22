angular.module("logs.controllers")

.controller('LogsCtrl', ['$scope','$state', function($scope, $state){
    /* $scope.gotoLogs = function(){
     $state.go("lock");
     };*/
    $scope.goToLock = function(){
        $state.go("locks")
    };

}])