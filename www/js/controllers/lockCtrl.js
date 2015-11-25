angular.module("lock.controllers")

.controller('LockCtrl', ['$scope','$state', '$stateParams', 'Lock', 'Group','$rootScope','AuthSrv','$filter','$ionicHistory', function($scope, $state, $stateParams, Lock, Group,$rootScope,AuthSrv,$filter,$ionicHistory){
    $scope.lock     = new Lock($stateParams.lock);
    $scope.group    = new Group($stateParams.group);
    $scope.lockIsAdmin = $scope.group.admin;

    //Récupération des groupes
    var lock =  new Lock($scope.lock);
    lock.$lockById().then(function(data){
        $scope.groups = data.groups;
    },function(err){
        console.log(err);
    });

    var getLocksAdmin = function(){
        var locksAdmin = new Lock();
        locksAdmin.$lock().then(function(data){
            if($filter('filter')(data.locks, {id: $scope.lock.id}).length > 0){
                $scope.lockIsAdmin = true;
            }
            else
                $scope.lockIsAdmin = false;

        },function(err){
            console.log(err);
        })
    }

    getLocksAdmin();
    // ========= LES ROUTES ======================================

    $scope.goToLocks = function(){
        removeListener();
        $state.go("locks");
    };

    $scope.goToBack = function(){
        removeListener();
        var viewHistory = $ionicHistory.viewHistory();
        if(viewHistory.backView.stateName == "editGroup"){
            $state.go("editGroup",{group: $scope.group},{reload:true});
        }
        else
            $state.go("locks");
    }

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
        exitListener();
        updateGroupListener();
        joinGroupListener();
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
        if(data.msg.data.email == AuthSrv.getUser().email)
        {
            $scope.$apply(function(){
                $scope.group.admin = data.msg.data.admin;
                getLocksAdmin();
            })
        }
    })

    var excludeListener = $rootScope.$on("exclude",function(event,data){
        if($scope.group.group.code == data.msg.data.codeGroup){
            if(data.msg.data.email == AuthSrv.getUser().email)
                $scope.goToLocks();
        }
    })

    var exitListener = $rootScope.$on("exit",function(event,data){
        if($scope.group.group.code == data.msg.data.codeGroup) {
            if(data.msg.data.email == AuthSrv.getUser().email)
                $scope.goToLocks();
        }
    })

    var updateGroupListener = $rootScope.$on("updateGroup",function(event,data){
        for(var i=0;i<$scope.groups.length;i++){
            if($scope.groups[i].code == data.msg.data.codeGroup){
                $scope.$apply(function(){
                    $scope.groups[i].name = data.msg.data.name;
                })
            }
        }
    })

    var joinGroupListener = $rootScope.$on("join",function(event,data){
        if(data.msg.data.email == AuthSrv.getUser().email)
            if(!$scope.lockIsAdmin)
                getLocksAdmin();
    })



}])
