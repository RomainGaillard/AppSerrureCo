/**
 * Created by Romain Gaillard on 23/10/2015.
 */


angular.module('locks.services')

    .service('LocksSrv', function() {
        var locks = [
            { title: 'Portail Ingesup', id: 1 },
            { title: 'Entree Maison', id: 2 },
            { title: 'Boite au lettre', id: 3},
            { title: 'Chez Juppe', id: 4},
        ]

        this.getLocks = function(){
            return locks;
        }
    });