angular.module("tab.controllers")

.controller('tabCtrl', ['$scope','$state',  function($scope, $state){
    $scope.gotoLogs = function(lock){
        $state.go("tab.log");
    };
    $scope.gotoLock = function(lock){
        $state.go("tab.lock");
    };
}])