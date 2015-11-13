angular.module("member.controllers")

	.controller('MemberCtrl', ['$scope','$state','MemberSrv', function($scope, $state, MemberSrv) {

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

  //$scope.removeMember = function($index){  }
  
  $scope.items = [
     { title: 'Jean Ingesup', id: 1 },
     { title: 'Entre ManBon', id: 2 },
     { title: 'Jeau Boiteaulettre', id: 3},
     { title: 'Sanchez Juepe', id:5},
     { title: 'Entre ManBon', id:6 },
     { title: 'Jeau Boiteaulettre', id: 6},
     { title: 'Sanchez Juepe', id: 7}
  ];
  
}]);