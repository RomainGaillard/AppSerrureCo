angular.module("tab.controllers")

.controller('tabCtrl', ['$scope','$state','$stateParams',  function($scope, $state,$stateParams){

    $scope.group = $stateParams.group;
    $scope.lock = $stateParams.lock;


    $scope.goToLogs = function(){
        $state.go("tab.log");
    };
    $scope.goToLock = function(){
        $state.go("tab.lock", {lock: $scope.lock, group: $scope.group},{reload:true});
    };
}])