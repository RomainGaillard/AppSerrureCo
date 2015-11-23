angular.module("lock.controllers")

.controller('LockCtrl', ['$scope','$state', '$stateParams', 'Lock', 'Group','$rootScope','AuthSrv', function($scope, $state, $stateParams, Lock, Group,$rootScope,AuthSrv){
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

    $scope.goToLocks = function(){
        removeListener();
        $state.go("locks");
    };
    $scope.goToLogs = function(){
        removeListener();
        $state.go("logs");
    };

    // ========= LES ACTIONS DU SCOPE =====================================

    $scope.updateLock = function(lock){
        var lock = new Lock(lock);
        lock.$update().then(function(data){
        },function(err){
            alert("Erreur:"+data);
            console.log(err);
        })
    };

    // =========== GESTION DES LISTENERS ROOTSCOPE ========================
    var removeListener = function(){
        lockUpdatedListener();
        lockDestroyedListener();
        giveAccessListener();
        excludeListener();
    }

    var lockUpdatedListener = $rootScope.$on("lockUpdated",function(event,data){
        $scope.$apply(function(){
            $scope.lock = data.msg.data.lock;
        })
    })

    var lockDestroyedListener = $rootScope.$on("lockDestroyed",function(event,data){
        if(data.msg.id == $scope.lock.id)
            $scope.gotoLocks();
    })

    var giveAccessListener = $rootScope.$on("giveAccess",function(event,data){
        if($scope.group.group.code == data.msg.data.codeGroup){
            if(data.msg.data.email == AuthSrv.getUser().email)
            {
                $scope.$apply(function(){
                    $scope.group.admin = data.msg.data.admin;
                })
            }
        }
    })

    var excludeListener = $rootScope.$on("exclude",function(event,data){
        if($scope.group.group.code == data.msg.data.codeGroup){
            if(data.msg.data.email == AuthSrv.getUser().email)
                $scope.goToLocks();
        }
    })


}])
