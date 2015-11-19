angular.module("member.controllers")

  .controller('MemberCtrl', ['$scope','$state','$ionicModal','$rootScope','$stateParams','Group', function($scope, $state, $ionicModal,$rootScope, $stateParams, Group) {
  $scope.group =  new Group($stateParams.group);
  $scope.users = {};

  $scope.group.$user().then(function(data){
    console.log(data);
    $scope.users = data.users;
  },function(err){
    console.log('error *%coucou%* member');
  })

  $scope.editRight = function(){
    $scope.group.$giveAccess().then(function(data){
      console.log(data);
    },function(err){
      console.log('error *%coucou% giveAccess*');
    })
  }

  $scope.logOut = function(){
     $state.go("app");
  }

  $scope.gotoEditGroup = function(){
      $state.go("editGroup");
  }

  $scope.saveMember = function(){
  	var conf = 1;
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

/*
  $scope.items = [
     { title: 'Jean Ingesup', id: 1 },
     { title: 'Entre ManBon', id: 2 },
     { title: 'Jeau Boiteaulettre', id: 3},
     { title: 'Sanchez Juepe', id:4},
     { title: 'Elte Bon', id:5 },
     { title: 'Jean Boulettre', id: 6},
     { title: 'Sanchezty Juepeioio', id: 7}
  ]; */

  }]);