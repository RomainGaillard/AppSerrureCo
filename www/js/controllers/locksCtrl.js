/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("locks.controllers")

    .controller('LocksCtrl', ['$scope','$state','LocksSrv', function($scope, $state, LocksSrv) {
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

    }])