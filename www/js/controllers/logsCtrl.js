angular.module("logs.controllers")

.controller('LogsCtrl', ['$scope','$state', '$stateParams', 'Lock', 'Group','$rootScope', function($scope, $state, $stateParams, Lock, Group,$rootScope){
    $scope.lock     = $stateParams.lock;
    $scope.group    = new Group($stateParams.group);

    var defaultFilter = " -- ";
    var defaultLogs;
    $scope.filter = defaultFilter;


    // ========= LES ROUTES ======================================


    // =========== GESTION DES LISTENERS ROOTSCOPE ========================

    var removeListener = function(){
        lockDestroyedListener();
    }

    var lockDestroyedListener = $rootScope.$on("lockDestroyed",function(event,data){
        if(data.msg.id == $scope.lock.id)
            $scope.gotoLocks();
    })

    // ========= LES ACTIONS DU SCOPE =====================================

    $scope.findLogs = function() {
        var lock = new Lock($stateParams.lock);
        lock.$logs().then(function(data){
            defaultLogs = data.logs;
            formatageDate();
            $scope.filtrate($scope.filter);
        },function(err){
            console.log(err);
        });
    };
    $scope.findLogs();

    $scope.findByDate = function(date){
        if (date.start != undefined) {
            var lock = new Lock($stateParams.lock);
            if (date.end != undefined) {
                lock.start = formatDate(date.start);
                var dateEnd = new Date(date.end);
                dateEnd.setDate(dateEnd.getDate()+1);
                lock.end = formatDate(dateEnd);
                lock.$logsByDualDate().then(function(data){
                    defaultLogs = data.logs;
                    formatageDate();
                    $scope.filtrate($scope.filter);
                },function(err){
                    console.log(err);
                });
            } else {
                lock.date = formatDate(date.start);
                lock.$logsByDate().then(function(data){
                    defaultLogs = data.logs;
                    formatageDate();
                    $scope.filtrate($scope.filter);
                },function(err){
                    console.log(err);
                });
            }
        } else {
            $scope.findLogs();
        }
    };

    $scope.filtrate = function(filter){
        $scope.filter = filter;
        if($scope.filter != defaultFilter && $scope.filter != undefined) {
            var filterLogs = Array();
            var index = 0;
            for(var i = 0; i < defaultLogs.length; i++) {
                if(defaultLogs[i].message.indexOf($scope.filter) > -1) {
                    filterLogs[index] = defaultLogs[i];
                    index++;
                }
            }
            $scope.logs = filterLogs;
        } else {
            $scope.logs = defaultLogs;
        }
    }

    formatDate = function(oldDate){
        var date = new Date(oldDate);
        date.setHours(3);
        date = date.toISOString();
        return date.substring(0, 10);
    }

    var formatageDate = function(){
        for(var i=0;i<defaultLogs.length;i++){
            var date = defaultLogs[i].createdAt;
            var jjmmaa = date.substring(0,date.indexOf("T"));
            var hhmmss = date.substring(date.indexOf("T")+1,date.lastIndexOf('.'));
            defaultLogs[i].createdAt = jjmmaa + " à "+hhmmss;
        }
    }

}])