/**
 * Created by Romain Gaillard on 23/11/2015.
 */

angular.module("memberWaiting.controllers")

    .controller('MemberWaitingCtrl', ['$scope','$state','$rootScope','$stateParams', function($scope, $state,$rootScope, $stateParams) {

        $scope.group = $stateParams.group;

        // ========= LES ROUTES ======================================

        $scope.goToManageWaiting = function(){
            $state.go("mwm.waiting", {group:$scope.group});
        }

        $scope.goToManageMembers = function(){
            $state.go("mwm.member", {group:$scope.group});
        }

    }]);