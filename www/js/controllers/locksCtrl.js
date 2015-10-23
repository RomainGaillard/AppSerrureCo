/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("locks.controllers")

    .controller('LocksCtrl', ['$scope','LocksSrv', function($scope, LocksSrv) {
        $scope.locks = LocksSrv.getLocks();
    }])