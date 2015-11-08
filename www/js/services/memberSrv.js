angular.module('member.services')

.service('MemberSrv', function() {
    var members = [
        { title: 'Jean Ingesup', grade: 'sbire', id: 1 },
        { title: 'Entre ManBon', grade: 'popcorn', id: 2 },
        { title: 'Jeau Boiteaulettre', grade: 'grade', id: 3},
        { title: 'Sanchez Juepe', grade: 'femme', id: 4},
    ]

    this.getMembers = function(){
        return members;
    }
});