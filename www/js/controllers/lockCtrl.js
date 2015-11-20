angular.module("lock.controllers")

.controller('LockCtrl', ['$scope','$state', '$stateParams', 'Lock', 'Group', function($scope, $state, $stateParams, Lock, Group){
    $scope.lock     = new Lock($stateParams.lock);
    $scope.group    = new Group($stateParams.group);
        console.log($scope.group);
    //Récupération des groupes
    var lock =  new Lock($scope.lock);
    lock.$lockById().then(function(data){
        $scope.groups = data.groups;
    },function(err){
        console.log(err);
    });

    io.socket.on('lock',function(msg){
        switch(msg.verb){
            case "destroyed":
                    $state.go("locks");
                break;
            case "updated":
                $scope.$apply(function(){
                    $scope.lock = msg.data.lock;
                })
                break;
        }
    })
        /* $scope.gotoLogs = function(){
             $state.go("lock");
         };*/
    $scope.gotoLocks = function(){
        $state.go("locks");
    };
    $scope.gotoLogs = function(){
        $state.go("logs");
    };
    $scope.updateLock = function(lock){
        var lock = new Lock(lock);
        lock.$update().then(function(data){
        },function(err){
            alert("Erreur:"+data);
            console.log(err);
        })
    };
}])
