/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("locks.controllers")

    .controller('LocksCtrl', ['$scope','$state','LocksSrv','$ionicModal','$rootScope','GroupsSrv','AuthSrv','Group', function($scope, $state, LocksSrv,$ionicModal,$rootScope,GroupsSrv,AuthSrv, Group) {

        $scope.groups = GroupsSrv.getGroups();
        
        $scope.locks = new Array();

        $scope.group = new Group();

        $scope.gotoLock = function(){
            //$state.go("app");
        };

        $scope.gotoEditGroup = function(){
            $state.go("editGroup");
        };

        $scope.gotoAccount = function(){
            $state.go("account");
        };

        $scope.changeColor = function($event,color){
            var parent = angular.element($event.target).parent();
            parent.css("background-color",color)
        };

        /*
        var getLock = function(){
            for(var i=0;i<$scope.groups.length;i++){
                var group = $scope.groups[i];
                io.socket.get('/group/'+group.code+'/lock',{token:AuthSrv.getUser().token},function(locks,jwres){
                    console.log(i);
                    console.log(group.id);
                    GroupsSrv.addLock(group.id,locks)
                    group.locks = GroupsSrv.getLocks(group.id);
                })
            }
            console.log($scope.groups);
            console.log($scope.groups[0]);
            console.log($scope.groups[1]);
            console.log($scope.groups[2]);
            //$scope.groups[i].locks = GroupsSrv.getLocks(id);
        }*/

        io.socket.get('/group',{token:AuthSrv.getUser().token},function(groups,jwres){
            for(var i=0;i<groups.length;i++){
                var admin = groups[i].admin;
                var validate = groups[i].validate;
                var grp = groups[i].group;
                var id = grp.id;
                GroupsSrv.addGroup(id,grp.code,grp.name,admin,validate);
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

        $scope.createGroup = function(task) {
            //TodolistService.addItem(task.title);
            //group.name 
            alert('coucou')
            $scope.newGroupModal.hide();
        };

        // ===== POPUP - EXIT GROUP ! =====
        $ionicModal.fromTemplateUrl('templates/exit_group.html', function(modal) {
            $scope.exitGroupModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $scope.exitGroup = function(group){
            $scope.groupExit = group;
            $scope.exitGroupModal.show();
        };

        $scope.closeExitGroup = function() {
            $scope.exitGroupModal.hide();
        };

        $scope.doExitGroup = function(){
            //$scope.group.$save
            //$scope.exitGroupModal.hide();
        }

        // ===== POPUP - NEW LOCK! =====

        $ionicModal.fromTemplateUrl('templates/new_lock.html', function(modal) {
            $rootScope.newLockModal = modal;
        }, {
            scope: $rootScope,
            animation: 'slide-in-up'
        });

        $rootScope.newLock = function(){
            $rootScope.newLockModal.show();
        };

        $rootScope.closeNewLock = function() {
            $rootScope.newLockModal.hide();
        };

        $rootScope.createLock = function(task) {
            //TodolistService.addItem(task.title);
            $rootScope.newLockModal.hide();
            task.title = "";
            //$scope.todolist = TodolistService.getTodolist();
        };

        $rootScope.$on("callNewLock", function (event) {
            $rootScope.newLock();
        });

    }])

.directive('lockGroup', ['AuthSrv','GroupsSrv',function (AuthSrv,GroupsSrv) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'templates/lock_group.html',
        link: function ($scope, element, attributes) {
            $scope.locks = {};
            var code = attributes.code;
            io.socket.get('/group/'+code+'/lock',{token:AuthSrv.getUser().token},function(locks,jwres){
                $scope.$apply(function(){
                    $scope.locks = locks;
                    console.log($scope.locks);
                })

            })
        }
    }
}])
