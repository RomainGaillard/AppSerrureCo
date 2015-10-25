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

        $scope.changeColor = function($event,color){
            var parent = angular.element($event.target).parent();
            //parent.trigger( "keypress" );
            parent.css("background-color",color)
        }

        // Create and load the Modal
        $ionicModal.fromTemplateUrl('templates/new_group.html', function(modal) {
            $scope.taskModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        // Open our new group modal
        $scope.newGroup = function(){
            $scope.taskModal.show();
        }

        // Called when the form is submitted
        $scope.createGroup = function(task) {
            //TodolistService.addItem(task.title);
            $scope.taskModal.hide();
            task.title = "";
            //$scope.todolist = TodolistService.getTodolist();
        };

        // Close the new group modal
        $scope.closeNewGroup = function() {
            $scope.taskModal.hide();
        };

    }])