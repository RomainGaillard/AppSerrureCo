/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("locks.controllers")

    .controller('LocksCtrl', ['$scope','$state','LocksSrv','$ionicModal','$rootScope','GroupsSrv','AuthSrv','Group','Lock', function($scope, $state, LocksSrv,$ionicModal,$rootScope,GroupsSrv,AuthSrv, Group,Lock) {

        $scope.groups = GroupsSrv.getGroups();
        $scope.group = new Group();
        $scope.lock = new Lock();

        $scope.gotoLock = function(lock){
            $state.go("tab.lock", {lock: lock},{reload:true});
        };

        $scope.gotoEditGroup = function(i){
            //alert(i);
            $scope.showLocks($scope.groups[i].group.code); // Annule le clic simultanné sur la barre + bouton.
            $state.go("editGroup",{group: $scope.groups[i]},{reload:true});
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

        io.socket.get('/group',{token:AuthSrv.getUser().token},function(groups,jwres){
            for(var i=0;i<groups.length;i++){
                GroupsSrv.addGroup(groups[i]);
            }
            $scope.groups = GroupsSrv.getGroups();
        })

        io.socket.on('group',function(msg){
            console.log(msg);
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
        };

        $scope.requestJoinGroup = function(task) {
            //TodolistService.addItem(task.title);
            $scope.joinGroupModal.hide();
            task.title = "";
            //$scope.todolist = TodolistService.getTodolist();
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
                var t = $scope.group.$save();
                t.then(function(data){
                    var grp = {admin:true,group:{code:data.created.code,name:data.created.name}};
                    $scope.groups = GroupsSrv.addGroup(grp);
                    $scope.newGroupModal.hide();
                },function(err){
                    console.log(err);
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

        $scope.exitGroup = function(i){
            $scope.i = i;
            $scope.exitGroupModal.show();
        };

        $scope.closeExitGroup = function() {
            $scope.exitGroupModal.hide();
        };

        $scope.doExitGroup = function(i){
            $scope.group.code = $scope.groups[i].code;
            var t = $scope.group.$exit();
            t.then(function(data){
                $scope.groups = GroupsSrv.removeGroup($scope.group);
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

            var t = $scope.lock.$save();
            t.then(function(data){
                for(var i=0;i<groups.length;i++){
                    $("#"+groups[i].code).scope().locks.push($scope.lock.lock);
                    $rootScope.$emit("majLock",$scope.lock.lock)
                }
                $rootScope.newLockModal.hide();
            },function(err){
                console.log(err);
            })
        };

        $rootScope.$on("callNewLock", function (event) {
            $rootScope.newLock();
        });

    }])
