angular.module("member.controllers")

  .controller('MemberCtrl', ['$scope','$state','$ionicModal','$rootScope','$stateParams','Group','AuthSrv', function($scope, $state, $ionicModal,$rootScope, $stateParams, Group,AuthSrv) {

      var myGroup = new Group($stateParams.group);
      $scope.group =  new Group(myGroup);

      $scope.users = new Array();

      myGroup.$user().then(function(data){
          $scope.users = data.users;
      },function(err){
        console.log(err);
      })

      // ========= LES ROUTES ======================================

      $scope.gotoEditGroup = function(){
          removeListener();
          $state.go("editGroup", {group:{group:myGroup}});
      }

      $scope.gotoLocks = function(){
          removeListener();
          $state.go("locks");
      }

      // ========= LES ACTIONS DU SCOPE =====================================

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
        },function(err){
            console.log(err);
        })
      }

      $scope.saveMember = function(){
        var conf = 1;
            $state.go("editGroup");
      }

      // =========== GESTION DES LISTENERS ROOTSCOPE ========================

      var removeListener = function(){
          giveAccessListener();
          excludeListener();
          joinListener();
      }

      var giveAccessListener = $rootScope.$on("giveAccess",function(event,data){
          if($scope.group.code == data.msg.data.codeGroup){
              for(var i=0;i<$scope.users.length;i++){
                  if($scope.users[i].email == data.msg.data.email){
                      $scope.$apply(function(){
                          $scope.users[i].admin = data.msg.data.admin;
                          if(data.msg.data.email == AuthSrv.getUser().email)
                            $scope.gotoLocks();
                      })
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
                          $scope.gotoLocks();
                  }
              }
          }
      })

      var joinListener = $rootScope.$on("join",function(event,data){
          $scope.$apply(function(){
              $scope.users.push({email:data.msg.data.email,admin:data.msg.data.admin})
          })
      })


      // ===== POPUP - ADD MEMBER! ====

      $scope.member = {email:"",admin:false};
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

      $scope.doAddMember = function(){
          myGroup.email = $scope.member.email;
          myGroup.code = $scope.group.code;
          myGroup.admin = $scope.member.admin;
          myGroup.$join().then(function(data){
              $scope.closeAddMember();
          },function(err){
              console.log(err);
          })
      }

  }]);