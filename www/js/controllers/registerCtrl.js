/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("register.controllers")

    .controller('RegisterCtrl',['$scope','$state', function($scope,$state) {
        //$scope.playlists = RegisterSrv.getPlaylist();

        $scope.gotoLogin = function() {
            $state.go("app");
        }

    }])
