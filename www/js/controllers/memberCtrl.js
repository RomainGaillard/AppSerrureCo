angular.module("member.controllers")

  .controller('MemberCtrl', ['$scope','$state','$ionicModal','$rootScope','$stateParams','Group', function($scope, $state, $ionicModal,$rootScope, $stateParams, Group) {
  $scope.group =  new Group($stateParams.group);
  var myGroup = ($stateParams.group);
  $scope.users = {};

  $scope.group.$user().then(function(data){
    $scope.users = data.tabUser;
  },function(err){
    console.log('--error *%no%* member get  ---');
  })

  $scope.editRight = function(){
    $scope.group.$giveAccess().then(function(data){
      console.log(data);
    },function(err){
      console.log('error *%coucou% giveAccess*');
    })
  }

  $scope.removeMember = function(i){
    $scope.group.User_Id = $("#"+$scope.group.code).scope().user[i].id;
    alert($scope.group.Userid);
    $scope.group.$exclude().then(function(data){
        console.log(data);
        $("#"+$scope.group.code).scope().user.splice(i,1);
    },function(err){
        console.log(err);
    })
  }

  $scope.logOut = function(){
     $state.go("app");
  }

  $scope.gotoEditGroup = function(){
      $state.go("editGroup", {group:{group:myGroup}});
  }

  $scope.saveMember = function(){
  	var conf = 1;
        $state.go("editGroup");
  }

  }]);