angular.module("member.controllers")

  .controller('MemberCtrl', ['$scope','$state','$ionicModal','$rootScope','$stateParams','Group','AuthSrv','$filter', function($scope, $state, $ionicModal,$rootScope, $stateParams, Group,AuthSrv,$filter) {

      var myGroup = new Group($stateParams.group);
      $scope.group =  $stateParams.group;
      $scope.nbAdmin = 1;
      $scope.users = new Array();
      var finVerif = true; // Pour gestion erreur.

      myGroup.$user().then(function(data){
          $scope.users = data.users;
          $scope.nbAdmin = $filter('filter')($scope.users, {admin: true}).length;
      },function(err){
        console.log(err);
      })

      var showError = function(msgError,numBt){
          if(numBt == undefined) numBt = "";
          if(finVerif){
              finVerif = false;
              $scope.msgBtError = msgError;
              $("[id='msgNormal"+numBt+"']").fadeOut("fast",function(){
                  $("[id='msgError"+numBt+"']").fadeIn("fast");
              });

              $("[id='btValidate"+numBt+"']").switchClass("button-balanced","button-assertive","fast","easeInQuart",function() {
                  $("[id='btValidate"+numBt+"']").delay(1500).switchClass("button-assertive", "button-balanced", "fast", "easeInQuart",function(){
                      $("[id='msgError"+numBt+"']").fadeOut("fast",function(){
                          $("[id='msgNormal"+numBt+"']").fadeIn("fast");
                          finVerif = true;
                      });
                  })
              })
          }
      };

      var errorCase = function(model){
          $("[ng-model='"+model+"']").css({"color":"red"})
      }

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

      $scope.editRight = function(user){
          myGroup.code = $scope.group.code;
          myGroup.email = user.email;
          myGroup.admin = user.admin;
          myGroup.$giveAccess().then(function(data){
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

      $scope.reinitCase = function(elem){
          $(elem.target).css("color","").parent().css("border","");
      }


      // =========== GESTION DES LISTENERS ROOTSCOPE ========================

      var removeListener = function(){
          giveAccessListener();
          excludeListener();
          joinListener();
          exitListener();
          updateGroupListener();
      }

      var giveAccessListener = $rootScope.$on("giveAccess",function(event,data){
          if($scope.group.code == data.msg.data.codeGroup){
              for(var i=0;i<$scope.users.length;i++){
                  if($scope.users[i].email == data.msg.data.email){
                      $scope.$apply(function(){
                          $scope.users[i].admin = data.msg.data.admin;
                          $scope.nbAdmin = $filter('filter')($scope.users, {admin: true}).length;
                          if(data.msg.data.email == AuthSrv.getUser().email)
                            $scope.goToLocks();
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
                          $scope.goToLocks();
                  }
              }
          }
      })

      var joinListener = $rootScope.$on("join",function(event,data){
          $scope.$apply(function(){
              $scope.users.push({email:data.msg.data.email,admin:data.msg.data.admin})
              $scope.nbAdmin = $filter('filter')($scope.users, {admin: true}).length;
          })
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
          if($scope.group.code == data.msg.data.codeGroup){
              $scope.$apply(function(){
                  $scope.group.name = data.msg.data.name;
              })
          }
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
          $("[id='msgError4']").hide();
      };

      $scope.doAddMember = function(){
          if($scope.member.email == undefined || $scope.member.email == ""){
              showError("Veuillez saisir un email",4);
          }
          else{
              myGroup.email = $scope.member.email;
              myGroup.code = $scope.group.code;
              myGroup.admin = $scope.member.admin;
              myGroup.$join().then(function(data){
                  $scope.closeAddMember();
              },function(err){
                  showError(err.data.msg,4);
                  errorCase("member.email");
              })
          }
      }

  }]);