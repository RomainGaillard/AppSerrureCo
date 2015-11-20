angular.module("waiting.controllers")

  .controller('WaitingCtrl', ['$scope','$state','$ionicModal','$rootScope','$stateParams','Group', function($scope, $state, $ionicModal, $rootScope, $stateParams, Group) {
 

  $scope.users = {};
$scope.group =  new Group($rootScope.selectGroup);
  var myGroup = ($rootScope.selectGroup);


       $scope.group.$user().then(function(data){
        $scope.users = data.tabUser;
      },function(err){
        console.log('--error *%no%* member get  ---');
   })

  
  
  //$rootScope.selectGroup = $stateParams.group;


 
  $scope.logOut = function(){
     $state.go("app");
  }

  $scope.gotoEditGroup = function(){
      $state.go("editGroup", {group:{group:myGroup}});
  }

  $scope.gotoMember = function(){
      $state.go("mwm.member", {group:myGroup});
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