angular.module("lock.controllers")

.controller('LockCtrl', ['$scope','$state', '$stateParams', 'Lock', 'Group','$rootScope', function($scope, $state, $stateParams, Lock, Group,$rootScope){
    $scope.lock     = new Lock($stateParams.lock);
    $scope.group    = new Group($stateParams.group);

    //Récupération des groupes
    var lock =  new Lock($scope.lock);
    lock.$lockById().then(function(data){
        $scope.groups = data.groups;
    },function(err){
        console.log(err);
    });


    // ========= LES ROUTES ======================================

    $scope.gotoLocks = function(){
        $state.go("locks");
    };
    $scope.gotoLogs = function(){
        $state.go("logs");
    };

    // =========== GESTION DES LISTENERS ROOTSCOPE ========================
    $rootScope.$on("lockUpdated",function(event,data){
        $scope.$apply(function(){
            $scope.lock = data.msg.data.lock;
        })
    })

    $rootScope.$on("lockDestroyed",function(event,data){
        if(data.msg.id == $scope.lock.id)
            $scope.gotoLocks();
    })

    $scope.updateLock = function(lock){
        var lock = new Lock(lock);
        lock.$update().then(function(data){
        },function(err){
            alert("Erreur:"+data);
            console.log(err);
        })
    };
}])
