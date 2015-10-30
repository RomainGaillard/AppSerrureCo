/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("locks.controllers")

    .controller('LocksCtrl', ['$scope','$state','LocksSrv','$ionicModal','$rootScope', function($scope, $state, LocksSrv,$ionicModal,$rootScope) {
        $scope.locks = LocksSrv.getLocks();

        $scope.gotoLock = function(){
            $state.go("lock");
        };

        $scope.gotoEditGroup = function(){
            $state.go("editGroup");
        };

        $scope.gotoAccount = function(){
            $state.go("account");
        };

        $scope.changeColor = function($event,color){
            var parent = angular.element($event.target).parent();
            //parent.trigger( "keypress" );
            parent.css("background-color",color)
        };

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
            $scope.newGroupModal.hide();
            task.title = "";
            //$scope.todolist = TodolistService.getTodolist();
        };

        // ===== POPUP - EXIT GROUP ! =====
        $ionicModal.fromTemplateUrl('templates/exit_group.html', function(modal) {
            $scope.exitGroupModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $scope.exitGroup = function(){
            $scope.exitGroupModal.show();
        };

        $scope.closeExitGroup = function() {
            $scope.exitGroupModal.hide();
        };

        $scope.doExitGroup = function(){

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