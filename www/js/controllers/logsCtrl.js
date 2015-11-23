angular.module("logs.controllers")

//<<<<<<< HEAD
.controller('LogsCtrl', ['$scope','$state', '$stateParams', 'Lock', function($scope, $state, $stateParams, Lock){
    console.log($stateParams.lock);
    $scope.lock = $stateParams.lock;
    $scope.gotoLock = function(){
//=======
//.controller('LogsCtrl', ['$scope','$state', function($scope, $state){
    /* $scope.gotoLogs = function(){
     $state.go("lock");
     };*/
    $scope.goToLock = function(){
        $state.go("locks")
    };

    var lock = new Lock($scope.lock);
    lock.$logs().then(function(data){
        console.log(data);
        $scope.logs = data.logs;
    },function(err){
        console.log(err);
    });
}])