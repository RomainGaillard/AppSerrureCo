/**
 * Created by Romain Gaillard on 25/10/2015.
 */
angular.module("groups.controllers.tabmwm")

    .controller('TabMwmCtrl', ['$scope','$stateParams', '$rootScope', function($scope,$stateParams,$rootScope) {
        
      $scope.$on('$ionicView.beforeEnter', function() {
        
            $scope.group = $rootScope.selectGroup;

        });   

        $scope.getGroup = function(){
            return $rootScope.selectGroup;
        }  


    }])