/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module("locks.controllers")


.controller('LocksCtrl', ['$scope','$state','$ionicModal','$rootScope','AuthSrv','Group','Lock','$filter','ConstantsSrv','$ionicHistory', function($scope, $state,$ionicModal,$rootScope,AuthSrv, Group,Lock,$filter,ConstantsSrv,$ionicHistory) {
    $scope.user = AuthSrv.getUser();
    $scope.groups = new Array();
    $rootScope.selectGroup = {};
    var finVerif = true; // Pour gestion erreur.

    $scope.group = new Group();
    $scope.lock = new Lock();

    var getGroups = function(){
        io.socket.get(ConstantsSrv.group,{token:AuthSrv.getUser().token},function(groups,jwres){
            if(jwres.statusCode == 200){
                $scope.$apply(function(){
                    $scope.nbGroupWait = $filter('filter')(groups, {validate: false}).length;
                    $scope.groups = groups;
                })
            }
        })
    }
    getGroups();

    io.socket.get(ConstantsSrv.myUser,{token:AuthSrv.getUser().token},function(user,jwres){
        // Permet d'établir une socket d'écoute sur l'user.
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

    $scope.goToLock = function(lock, group){
        $state.go("tab.lock", {lock: lock, group: group},{reload:true});
    };

    $scope.goToEditGroup = function(group){
        $scope.showLocks(group.group.code); // Annule le clic simultanné sur la barre + bouton.
        $state.go("editGroup",{group: group},{reload:true});
    };

    $scope.goToAccount = function(){
        $state.go("account");
    };

    $scope.changeColor = function($event,color){
        var parent = angular.element($event.target).parent();
        parent.css("background-color",color)
    };

    $scope.showLocks = function(code){
        $("#"+code).slideToggle();
    }

    $scope.goToWaitingMember = function(group){
        $scope.showLocks(group.code); // Annule le clic simultanné sur la barre + bouton.
        $state.go("mwm.waiting", {group:group});
    }

    // ========= LES ACTIONS DU SCOPE =====================================

    $scope.cancelAskAccess = function(group){
        $scope.group = new Group(group.group);
        $scope.group.$exit().then(function(data){
        },function(err){
            console.log(err);
        })
    }

    $scope.reinitCase = function(elem){
        $(elem.target).css("color","").parent().css("border","");
    }


    // =========== GESTION DES LISTENERS  ========================

    /*$scope.$on("$ionicView.beforeEnter", function () {
        var viewHistory = $ionicHistory.viewHistory();
        var currentHistory = viewHistory.histories;
        var currentCursor = currentHistory.root.cursor;
        if(currentCursor > 0){
            var backView = currentHistory.root.stack[currentCursor - 1];
            if(backView.stateName == "app"){
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                // $state.reload();
                //var current = $state.current;
                //var params = angular.copy($stateParams);
                //$state.transitionTo(current, {}, { reload: true, inherit: true, notify: true });
                location.reload()
            }
        }
    })*/

    $rootScope.$on("callNewLock", function (event) {
        $rootScope.newLock();
    });

    $rootScope.$on("giveAccess",function(event,data){
        for(var i=0;i<$scope.groups.length;i++){
            if($scope.groups[i].group.code == data.msg.data.codeGroup){
                $scope.$apply(function() {
                    if (data.msg.data.email == AuthSrv.getUser().email) {
                        $scope.groups[i].validate = true;
                        $scope.groups[i].admin = data.msg.data.admin;
                        $scope.nbGroupWait = $filter('filter')($scope.groups, {validate: false}).length;
                    }
                })
                $rootScope.$emit("updateNbUsersWait",{code:data.msg.data.codeGroup});
            }
        }
    });

    $rootScope.$on("groupDestroyed",function(event,data){
        $scope.$apply(function(){
            for(var i=0;i<$scope.groups.length;i++){
                if($scope.groups[i].group.id == data.msg.id){
                    $scope.groups.splice(i,1);
                }
            }
        })
    });

    $rootScope.$on("userJoin",function(event,data){
        getGroups();
        //$rootScope.updateNbUsersWait(data.msg.data.codeGroup);
    });

    $rootScope.$on("exclude",function(event,data){
        for (var i = 0; i < $scope.groups.length; i++) {
            if ($scope.groups[i].group.code == data.msg.data.codeGroup) {
                $scope.$apply(function () {
                    if (data.msg.data.email == AuthSrv.getUser().email) {
                        $scope.groups.splice(i, 1);
                        $scope.nbGroupWait = $filter('filter')($scope.groups, {validate: false}).length;
                    }
                })
                $rootScope.$emit("updateNbUsersWait",{code:data.msg.data.codeGroup});
            }
        }
    });

    $rootScope.$on("askAccess", function (event,data) {
        for(var i=0;i<$scope.groups.length;i++){
            if($scope.groups[i].group.code == data.msg.data.codeGroup){
                $rootScope.$emit("updateNbUsersWait",{code:data.msg.data.codeGroup});
            }
        }
    });

    $rootScope.$on("exit",function(event,data){
        for(var i=0;i<$scope.groups.length;i++){
            if($scope.groups[i].group.code == data.msg.data.codeGroup){
                if(AuthSrv.getUser().email == data.msg.data.email){
                    $scope.$apply(function(){
                        $scope.groups.splice(i,1);
                        $scope.nbGroupWait = $filter('filter')($scope.groups, {validate: false}).length;
                    })
                }
                $rootScope.$emit("updateNbUsersWait",{code:data.msg.data.codeGroup});
            }
        }
    })

    $rootScope.$on("updateGroup",function(event,data){
        for(var i=0;i<$scope.groups.length;i++){
            if($scope.groups[i].group.code == data.msg.data.codeGroup){
                $scope.$apply(function(){
                    $scope.groups[i].group.name = data.msg.data.name;
                })
            }
        }
    });

    $rootScope.$on("updateUser",function(event,data){
        if($scope.user.id == data.msg.data.user.id){
            $scope.$apply(function(){
                $scope.user.email = data.msg.data.user.email;
            })
        }
    })

    // =========== GESTION DES LISTENERS SOCKET ========================
    io.socket.on('group',function(msg){
        switch(msg.verb){
            case "destroyed":
                $rootScope.$emit("groupDestroyed",{msg:msg});
                break;
            case "updated":
                if(msg.data.removeLock)
                    $rootScope.$emit("removeLock",{msg:msg})
                if(msg.data.addLock)
                    $rootScope.$emit("addLock",{msg:msg})
                if(msg.data.giveAccess)
                    $rootScope.$emit("giveAccess",{msg:msg});
                if(msg.data.exclude)
                    $rootScope.$emit("exclude",{msg:msg});
                if(msg.data.join)
                    $rootScope.$emit("join",{msg:msg});
                if(msg.data.askAccess)
                    $rootScope.$emit("askAccess",{msg:msg});
                if(msg.data.exit)
                    $rootScope.$emit("exit",{msg:msg});
                if(msg.data.update){
                    $rootScope.$emit("updateGroup",{msg:msg});
                }
                break;
        }
    })

    io.socket.on('lock',function(msg){
        switch(msg.verb){
            case "updated":
                $rootScope.$emit("lockUpdated",{msg:msg});
                break;
            case "destroyed":
                $rootScope.$emit("lockDestroyed",{msg:msg});
                break;
        }
    });

    io.socket.on('user',function(msg){
        switch(msg.verb){
            case "updated":
                if(msg.data.join)
                    $rootScope.$emit("userJoin",{msg:msg});
                if(msg.data.update)
                    $rootScope.$emit("updateUser",{msg:msg});
                break;
        }
    })

    // ===== POPUP - ASK GROUP! ====

    $ionicModal.fromTemplateUrl('templates/ask_group.html', function(modal) {
        $scope.askGroupModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.closeAskGroup = function() {
        $scope.askGroupModal.hide();
    };

    $scope.askGroup = function(){
        $scope.askGroupModal.show();
    };

    // ===== POPUP - ASKACCESS JOIN GROUP! ====

    $ionicModal.fromTemplateUrl('templates/join_group.html', function(modal) {
        $scope.joinGroupModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.joinGroup = function(){
        $scope.joinGroupModal.show();
        $("[id='msgError3']").hide();
        $scope.closeAskGroup();
        $scope.group = new Group();
    };

    $scope.requestJoinGroup = function() {
        console.log($scope.group.code);
        if($scope.group.code == undefined || $scope.group.code == ""){
            showError("Saisissez le #TAG du groupe !",3);
        }
        else{
            $scope.group.$askAccess().then(function(data){
                getGroups(); // Permet de suivre avec une socket les events du groupe.
                $scope.joinGroupModal.hide();
            },function(err){
                showError("Le groupe n'existe pas !",3)
                errorCase("group.code")
            })
        }
    };

    $scope.closeJoinGroup = function() {
        $scope.joinGroupModal.hide();
    };


    // ===== POPUP - NEW GROUP! =====

    $ionicModal.fromTemplateUrl('templates/new_group.html', function(modal) {
        $scope.newGroupModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.newGroup = function(){
        $scope.newGroupModal.show();
        $("[id='msgError2']").hide();
        $scope.group = new Group();
        $scope.locks = new Lock();
        $scope.locks.$lock().then(function(data){
        },function(err){
            console.log(err);
        }
        )
        $scope.closeAskGroup();
    };

    $scope.closeNewGroup = function() {
        $scope.newGroupModal.hide();
    };

    $scope.createGroup = function() {
        var locks = new Array();
        if($scope.group.name == undefined || $scope.group.name == ""){
            showError("Donner un nom au groupe !",2);
        }
        else{
            for(var i=0;i<$scope.locks.locks.length;i++){
                if($scope.locks.locks[i].selected)
                    locks.push($scope.locks.locks[i].id)
            }
            io.socket.post(ConstantsSrv.createGroup,{token:AuthSrv.getUser().token,name:$scope.group.name,locks:locks},function(group,jwres){
                if(jwres.statusCode == 201){
                    var grp = {validate:true,admin:true,group:{code:jwres.body.created.code,name:jwres.body.created.name,id:jwres.body.created.id}};
                    $scope.groups.push(grp);
                    $rootScope.$emit("createGroup",{code:jwres.body.created.code});
                    $scope.newGroupModal.hide();
                }
                else{
                    alert('Erreur'+jwres.body.err);
                }
            })
        }
    };

    // ===== POPUP - EXIT GROUP ! =====
    $ionicModal.fromTemplateUrl('templates/exit_group.html', function(modal) {
        $scope.exitGroupModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.exitGroup = function(group){
        $scope.group = new Group(group.group);
        $scope.showLocks(group.group.code);
        $scope.exitGroupModal.show();
    };

    $scope.closeExitGroup = function() {
        $scope.exitGroupModal.hide();
    };

    $scope.doExitGroup = function(group){
        $scope.group.$exit().then(function(data){
            $scope.closeExitGroup();
        },function(err){
            console.log(err);
        })
    },


        // ===== POPUP - NEW LOCK! =====

    $ionicModal.fromTemplateUrl('templates/new_lock.html', function(modal) {
            $rootScope.newLockModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

    $rootScope.newLock = function(){
        $rootScope.newLockModal.show();
        $scope.lock = {};
        $("[id='msgError1']").hide();
    };

    $rootScope.closeNewLock = function() {
        $rootScope.newLockModal.hide();
    };

    $rootScope.createLock = function() {
        if($scope.lock.name == undefined || $scope.lock.name == ""){
            showError("Saisissez un nom de serrure !",1);
        }
        else if($scope.lock.address_mac == undefined || $scope.lock.address_mac == ""){
            showError("Saisissez un adresse mac !",1)
        }
        else{
            $scope.lock.groups = new Array();
            var groups = new Array();
            for(var i=0;i<$scope.groups.length;i++){
                if($scope.groups[i].selected){
                    $scope.lock.groups.push($scope.groups[i].group.code);
                    groups.push($scope.groups[i].group);
                }
            }

            if(groups.length > 0){
                io.socket.post(ConstantsSrv.createLock,{token:AuthSrv.getUser().token,lock:$scope.lock},function(lock,jwres){
                    if(jwres.statusCode == 201){
                        $rootScope.newLockModal.hide();
                    }
                    else{
                        $scope.$apply(function() {
                            showError('Erreur: Addresse Mac déjà utilisée !',1);
                        })
                        errorCase("lock.address_mac")
                        console.log(jwres.body.err);
                    }
                })
            }
            else{
                showError('Selectionner au moins un groupe !',1);
            }
        }
    };

}])

