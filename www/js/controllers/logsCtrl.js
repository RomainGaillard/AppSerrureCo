angular.module("logs.controllers")

.controller('LogsCtrl', ['$scope','$state', '$stateParams', 'Lock', function($scope, $state, $stateParams, Lock){
    console.log($stateParams.lock);
    $scope.lock = $stateParams.lock;

    $scope.goToLock = function(){
        $state.go("locks")
    };

    var lock = new Lock($stateParams.lock);
    lock.$logs().then(function(data){
        $scope.logs = data.logs;
    },function(err){
        console.log(err);
    });

    $scope.findByDate = function(date){
        if (date.start != undefined) {
            var lock = new Lock($stateParams.lock);
            if (date.end != undefined) {
                lock.start = formatDate(date.start);
                lock.end = formatDate(date.end);
                lock.$logsByDualDate().then(function(data){
                    $scope.logs = data.logs;
                },function(err){
                    console.log(err);
                });
            } else {
                lock.date = formatDate(date.start);
                lock.$logsByDate().then(function(data){
                    $scope.logs = data.logs;
                },function(err){
                    console.log(err);
                });
            }
        }
        console.log(date.start+" - "+date.end);
    };

    $scope.filtre = function(choose) {

    }

    formatDate = function(oldDate){
        var date = new Date(oldDate);
        date.setHours(3);
        date = date.toISOString();
        return date.substring(0, 10);
    }

}])