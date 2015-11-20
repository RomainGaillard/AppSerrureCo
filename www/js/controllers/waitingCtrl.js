angular.module("waiting.controllers")

  .controller('WaitingCtrl', ['$scope','$state','$ionicModal','$rootScope','$stateParams','Group', function($scope, $state, $ionicModal, $rootScope, $stateParams, Group) {
  $scope.group =  new Group($stateParams.group);
  $scope.users = {};

  console.log($stateParams.group);

  $scope.group.$user().then(function(data){
    $scope.users = data.tabUser;
  },function(err){
    console.log('--error *%no%* member get  ---');
  })

  $scope.logOut = function(){
     $state.go("app");
  }

  $scope.gotoEditGroup = function(){
      $state.go("editGroup");
  }

  $scope.removeMember = function(i){
    $scope.group.User_Id = $("#"+$scope.group.code).scope().user[i].id;
    alert($scope.group.Userid);
    $scope.group.$removeLock().then(function(data){
        console.log(data);
        $("#"+$scope.group.code).scope().user.splice(i,1);
    },function(err){
        console.log(err);
    })
  }

  }]);