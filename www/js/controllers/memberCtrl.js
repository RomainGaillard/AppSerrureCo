angular.module("member.controllers")

	.controller('MemberCtrl', ['$scope','$state','MemberSrv', function($scope, $state, MemberSrv) {

// ======================== affiché tout les membre du groupe choisi + géré les droits  =============================================
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
  
  $scope.data = {
    showDelete: false
  };
  
  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };
  
  $scope.items = [
     { title: 'Jean Ingesup', grade: 'sbire', id: 1 },
     { title: 'Entre ManBon', grade: 'popcorn', id: 2 },
     { title: 'Jeau Boiteaulettre', grade: 'grade', id: 3},
     { title: 'Sanchez Juepe', grade: 'femme', id:5},
     { title: 'Entre ManBon', grade: 'popcorn', id:6 },
     { title: 'Jeau Boiteaulettre', grade: 'grade', id: 6},
     { title: 'Sanchez Juepe', grade: 'femme', id: 7}
  ];
  
}]);