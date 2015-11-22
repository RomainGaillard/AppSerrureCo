angular.module("waiting.controllers")

  .controller('WaitingCtrl', ['$scope','$state','$ionicModal','$rootScope','$stateParams','Group', function($scope, $state, $ionicModal, $rootScope, $stateParams, Group) {

    $scope.users = {};
    $scope.group =  $stateParams.group;
    var myGroup = new Group($stateParams.group);

    /*$scope.group.$usersWait().then(function(data){
        $scope.users = data.users;
        },function(err){
        console.log(err);
    })*/


    // ========= LES ROUTES ======================================

    $scope.gotoEditGroup = function(){
      $state.go("editGroup", {group:{group:myGroup}});
    }


  }]);