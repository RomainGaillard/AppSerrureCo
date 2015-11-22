angular.module("member.controllers")

  .controller('MemberCtrl', ['$scope','$state','$ionicModal','$rootScope','$stateParams','Group', function($scope, $state, $ionicModal,$rootScope, $stateParams, Group) {

      var myGroup = new Group($stateParams.group);
      $scope.group =  new Group(myGroup);

      $scope.users = {};

      myGroup.$user().then(function(data){
          $scope.users = data.users;
      },function(err){
        console.log(err);
      })

      $scope.editRight = function(user){
          myGroup.code = $scope.group.code;
          myGroup.email = user.email;
          myGroup.admin = user.admin;
          myGroup.$giveAccess().then(function(data){
          console.log(data);
        },function(err){
          console.log(err);
        })
      }

      $scope.excludeMember = function(user){
          myGroup.code = $scope.group.code;
          myGroup.email = user.email;
          myGroup.$exclude().then(function(data){
            //console.log(data);
            //var index = $scope.users.indexOf(user);
            //$scope.users.splice(index,1);
        },function(err){
            console.log(err);
        })
      }

      $scope.gotoEditGroup = function(){
          removeListener();
          $state.go("editGroup", {group:{group:myGroup}});
      }

      $scope.gotoWaiting = function(){
          removeListener();
          $state.go("mwm.waiting", {group:myGroup});
      }

      $scope.saveMember = function(){
        var conf = 1;
            $state.go("editGroup");
      }

      var removeListener = function(){
          giveAccessListener();
      }


      var giveAccessListener = $rootScope.$on("giveAccess",function(event,data){
          alert("merde");
          if($scope.group.code == data.msg.data.codeGroup){
              for(var i=0;i<$scope.users.length;i++){
                  if($scope.users[i].email == data.msg.data.email)
                      $scope.users[i].admin = data.msg.data.admin;
              }
          }
      })

      $rootScope.$on("exclude",function(event,data){
          if($scope.group.code == data.msg.data.codeGroup){
              for(var i=0;i<$scope.users.length;i++){
                  if($scope.users[i].email == data.msg.data.email)
                      $scope.users.splice(i,1);
              }
          }
      })


      // ===== POPUP - ADD MEMBER! ====

      $ionicModal.fromTemplateUrl('templates/add_member.html', function(modal) {
          $scope.addMemberModal = modal;
      }, {
          scope: $scope,
          animation: 'slide-in-up'
      });

      $scope.closeAddMember = function() {
          $scope.addMemberModal.hide();
      };

      $scope.addMember= function(){
          $scope.addMemberModal.show();
      };

  }]);