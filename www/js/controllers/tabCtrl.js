angular.module("tab.controllers")

.controller('tabCtrl', ['$scope','$state','$stateParams','Lock', function($scope, $state,$stateParams, Lock){

    $scope.lock = $stateParams.lock;
    $scope.group = $stateParams.group;

    $scope.getLock = function(destination) {
        var lock = new Lock($stateParams.lock);
        console.log(lock);
        lock.$lockById().then(function(data){
            $scope.lock = data;
            $state.go(destination, {lock:$scope.lock, group:$scope.group},{reload:true});
        },function(err){
            console.log(err);
        });
    };
    $scope.goToLogs = function(){
        $state.go("tab.log");
    };
    $scope.goToLock = function(){
        $scope.getLock("tab.lock");
    };


}])