/**
 * Created by Romain Gaillard on 25/10/2015.
 */


angular.module("groups.controllers")

    .controller('GroupsCtrl', ['$scope','$state','GroupsSrv', function($scope, $state, GroupsSrv) {
        $scope.locks = GroupsSrv.getLocks();

        $scope.gotoLocks = function(){
            $state.go("locks")
        }

    }])