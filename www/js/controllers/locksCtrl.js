/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("locks.controllers")


.controller('LocksCtrl', ['$scope','$state','$ionicModal','$rootScope','AuthSrv','Group','Lock','$filter','ConstantsSrv', function($scope, $state,$ionicModal,$rootScope,AuthSrv, Group,Lock,$filter,ConstantsSrv) {
    $scope.user = AuthSrv.getUser();
    $scope.groups = new Array();
    $rootScope.selectGroup = {};

    $scope.group = new Group();
    $scope.lock = new Lock();

    $scope.gotoLock = function(lock){
        $state.go("tab.lock", {lock: lock},{reload:true});
    };

    $scope.gotoEditGroup = function(group){
        $scope.showLocks(group.group.code); // Annule le clic simultanné sur la barre + bouton.
        $state.go("editGroup",{group: group},{reload:true});
    };

    $scope.gotoAccount = function(){
        $state.go("account");
    };

    $scope.changeColor = function($event,color){
        var parent = angular.element($event.target).parent();
        parent.css("background-color",color)
    };

    $scope.showLocks = function(code){
        $("#"+code).slideToggle();
    }

    io.socket.get(ConstantsSrv.group,{token:AuthSrv.getUser().token},function(groups,jwres){
        if(jwres.statusCode == 200){
            $scope.nbGroupWait = $filter('filter')(groups, {validate: false}).length;
            $scope.groups = groups;
        }
    })


    io.socket.on('group',function(msg){
        switch(msg.verb){
            case "destroyed":
                $scope.$apply(function(){
                    for(var i=0;i<$scope.groups.length;i++){
                        if($scope.groups[i].group.id == msg.id){
                            $scope.groups.splice(i,1);
                        }
                    }
                })
                break;
        }
    })

    $scope.$on('$destroy', function(){
        io.socket.removeAllListeners();
    })


    // ===== POPUP - ASK GROUP! ====

    $ionicModal.fromTemplateUrl('templates/ask_group.html', function(modal) {
        $scope.askGroupModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.closeAskGroup = function() {
        $scope.askGroupModal.hide();
    };

    $scope.askGroup = function(){
        $scope.askGroupModal.show();
    };

    // ===== POPUP - JOIN GROUP! ====

    $ionicModal.fromTemplateUrl('templates/join_group.html', function(modal) {
        $scope.joinGroupModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.joinGroup = function(){
        $scope.joinGroupModal.show();
        $scope.closeAskGroup();
        $scope.group = new Group();
    };

    $scope.requestJoinGroup = function() {
        var code = $scope.group.code;
        $scope.group.$askAccess().then(function(data){
            $scope.groups.push({validate:false,admin:false,group:{code:code}})
        },function(err){
            console.log(err);
        })

        $scope.joinGroupModal.hide();
    };

    $scope.closeJoinGroup = function() {
        $scope.joinGroupModal.hide();
    };


    // ===== POPUP - NEW GROUP! =====

    $ionicModal.fromTemplateUrl('templates/new_group.html', function(modal) {
        $scope.newGroupModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.newGroup = function(){
        $scope.group = new Group();
        $scope.newGroupModal.show();
        $scope.closeAskGroup();
    };

    $scope.closeNewGroup = function() {
        $scope.newGroupModal.hide();
    };

    $scope.createGroup = function() {
        if($scope.group.name == ""){
            showError();
        }
        else{

            io.socket.post(ConstantsSrv.createGroup,{token:AuthSrv.getUser().token,name:$scope.group.name},function(group,jwres){
                if(jwres.statusCode == 201){
                    var grp = {validate:true,admin:true,group:{code:jwres.body.created.code,name:jwres.body.created.name,id:jwres.body.created.id}};
                    $scope.groups.push(grp);
                    $scope.newGroupModal.hide();
                }
                else{
                    alert('Erreur'+jwres.body.err);
                }
            })
        }
    };

    // ===== POPUP - EXIT GROUP ! =====
    $ionicModal.fromTemplateUrl('templates/exit_group.html', function(modal) {
        $scope.exitGroupModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.exitGroup = function(group){
        $scope.group = group;
        $scope.showLocks(group.group.code);
        $scope.exitGroupModal.show();
    };

    $scope.closeExitGroup = function() {
        $scope.exitGroupModal.hide();
    };

    $scope.doExitGroup = function(group){
        $scope.group = group;
        $scope.group.$exit().then(function(data){
            $scope.groups.splice($scope.groups.indexOf($scope.group),1);
            $scope.closeExitGroup();
        },function(err){
            console.log(err);
        })
    },


        // ===== POPUP - NEW LOCK! =====

        $ionicModal.fromTemplateUrl('templates/new_lock.html', function(modal) {
            $rootScope.newLockModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

    $rootScope.newLock = function(){
        $rootScope.newLockModal.show();
    };

    $rootScope.closeNewLock = function() {
        $rootScope.newLockModal.hide();
    };

    $rootScope.createLock = function() {
        $scope.lock.groups = new Array();
        var groups = new Array();
        for(var i=0;i<$scope.groups.length;i++){
            if($scope.groups[i].selected){
                $scope.lock.groups.push($scope.groups[i].group.code);
                groups.push($scope.groups[i].group);
            }
        }

        io.socket.post(ConstantsSrv.createLock,{token:AuthSrv.getUser().token,lock:$scope.lock},function(lock,jwres){
            if(jwres.statusCode == 201){
                for(var i=0;i<groups.length;i++){
                    $rootScope.$emit("majLock",{lock:jwres.body.lock,groupCode:groups[i].code});
                }
                $rootScope.newLockModal.hide();
            }
            else{
                alert('Erreur'+jwres.body.err);
            }
        })
    };

    $rootScope.$on("callNewLock", function (event) {
        $rootScope.newLock();
    });

}])

