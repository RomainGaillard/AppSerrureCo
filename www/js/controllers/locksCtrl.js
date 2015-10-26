/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("locks.controllers")

    .controller('LocksCtrl', ['$scope','$state','LocksSrv','$ionicModal', function($scope, $state, LocksSrv,$ionicModal) {
        $scope.locks = LocksSrv.getLocks();

        $scope.gotoLock = function(){
            //$state.go("app");
        }

        $scope.gotoEditGroup = function(){
            $state.go("editGroup");
        }

        $scope.gotoAccount = function(){
            $state.go("account");
        }

        $scope.changeColor = function($event,color){
            var parent = angular.element($event.target).parent();
            //parent.trigger( "keypress" );
            parent.css("background-color",color)
        }

        // Create and load the Modal
        $ionicModal.fromTemplateUrl('templates/new_group.html', function(modal) {
            $scope.newGroupModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $ionicModal.fromTemplateUrl('templates/ask_group.html', function(modal) {
            $scope.askGroupModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $ionicModal.fromTemplateUrl('templates/join_group.html', function(modal) {
            $scope.joinGroupModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        // Open our new group modal
        $scope.newGroup = function(){
            $scope.newGroupModal.show();
            $scope.closeAskGroup();
        }

        $scope.askGroup = function(){
            $scope.askGroupModal.show();
        }

        $scope.joinGroup = function(){
            $scope.joinGroupModal.show();
            $scope.closeAskGroup();
        }
        // Called when the form is submitted
        $scope.createGroup = function(task) {
            //TodolistService.addItem(task.title);
            $scope.newGroupModal.hide();
            task.title = "";
            //$scope.todolist = TodolistService.getTodolist();
        };

        $scope.requestJoinGroup = function(task) {
            //TodolistService.addItem(task.title);
            $scope.joinGroupModal.hide();
            task.title = "";
            //$scope.todolist = TodolistService.getTodolist();
        };

        // Close the new group modal
        $scope.closeNewGroup = function() {
            $scope.newGroupModal.hide();
        };

        $scope.closeAskGroup = function() {
            $scope.askGroupModal.hide();
        };

        $scope.closeJoinGroup = function() {
            $scope.joinGroupModal.hide();
        };

    }])