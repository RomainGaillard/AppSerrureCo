/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("register.controllers")

    .controller('RegisterCtrl', ['$scope','RegisterSrv', function($scope, RegisterSrv) {
        //$scope.playlists = RegisterSrv.getPlaylist();
        $scope.test = "Hello";
    }])