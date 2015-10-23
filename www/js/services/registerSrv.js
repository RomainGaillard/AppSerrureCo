/**
 * Created by Romain Gaillard on 23/10/2015.
 */

angular.module('register.services')

    .service('RegisterService', function() {
        //var playlist = ["Sauvons la FRANCE","Vive Bordeaux","Dubstep","Indie","Rap","Cowbell"];
        var playlist = [
            { title: 'Sauvons la FRANCE', id: 1 },
            { title: 'Vive Bordeaux', id: 2 },
            { title: 'Dubstep', id: 3},
            { title: 'Indie', id: 4},
            { title: 'Rap', id: 5},
            { title: 'Cowbell', id: 6 }
        ];
        
    });