angular.module("waiting.controllers")

  .controller('WaitingCtrl', ['$scope','$state','$ionicModal','$rootScope','$stateParams','Group','AuthSrv', function($scope, $state, $ionicModal, $rootScope, $stateParams, Group,AuthSrv) {

      $scope.users = {};
      $scope.group =  $stateParams.group;
      var myGroup = new Group($stateParams.group);

      myGroup.$usersWait().then(function(data){
        $scope.users = data.usersWait;
        },function(err){
        console.log(err);
      })

      // ========= LES ROUTES ======================================

      $scope.goToEditGroup = function(){
          removeListener();
          $state.go("editGroup", {group:{group:$scope.group}});
      }

      $scope.goToLocks = function(){
          removeListener();
          $state.go("locks");
      }

      // ========= LES ACTIONS DU SCOPE =====================================

      $scope.acceptMember = function(user){
          myGroup.code = $scope.group.code;
          myGroup.email = user.email;
          myGroup.$giveAccess().then(function(data){
          },function(err){
              console.log(err);
              alert(err.data.err);
          })
      }

      $scope.excludeMember = function(user){
          myGroup.code = $scope.group.code;
          myGroup.email = user.email;
          myGroup.$exclude().then(function(data){
          },function(err){
              console.log(err);
          })
      }

      // =========== GESTION DES LISTENERS ROOTSCOPE ========================

      var removeListener = function(){
          giveAccessListener();
          excludeListener();
          exitListener();
          updateGroupListener();
          askAccessListener();
      }

      var giveAccessListener = $rootScope.$on("giveAccess",function(event,data){
          if($scope.group.code == data.msg.data.codeGroup){
              for(var i=0;i<$scope.users.length;i++){
                  if($scope.users[i].email == data.msg.data.email){
                      $scope.$apply(function(){
                          $scope.users.splice(i,1);
                      })
                      if(data.msg.data.email == AuthSrv.getUser().email)
                          $scope.goToLocks();
                  }
              }
          }
      })

      var excludeListener = $rootScope.$on("exclude",function(event,data){
          if($scope.group.code == data.msg.data.codeGroup){
              for(var i=0;i<$scope.users.length;i++){
                  if($scope.users[i].email == data.msg.data.email){
                      $scope.$apply(function(){
                          $scope.users.splice(i,1);
                      })
                      if(data.msg.data.email == AuthSrv.getUser().email)
                          $scope.goToLocks();
                  }
              }
          }
      })

      var exitListener = $rootScope.$on("exit",function(event,data){
          if($scope.group.code == data.msg.data.codeGroup) {
              for(var i=0;i<$scope.users.length;i++){
                  if($scope.users[i].email == data.msg.data.email){
                      $scope.$apply(function(){
                          $scope.users.splice(i,1);
                      })
                      if(data.msg.data.email == AuthSrv.getUser().email)
                          $scope.goToLocks();
                  }
              }
          }
      })

      var updateGroupListener = $rootScope.$on("updateGroup",function(event,data){
          if($scope.group.code == data.msg.data.codeGroup) {
              $scope.$apply(function () {
                  $scope.group.name = data.msg.data.name;
              })
          }
      })

      var askAccessListener = $rootScope.$on("askAccess",function(event,data){
          if($scope.group.code == data.msg.data.codeGroup){
              $scope.$apply(function(){
                  $scope.users.push({email:data.msg.data.email});
              })
          }
      })


  }]);