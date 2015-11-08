/**
 * Created by Romain Gaillard on 25/10/2015.
 */


angular.module('groups.services')

    .service('GroupsSrv', function() {
        var groups = [
            { code: 'FG215C20', name: "Ingesup 1" },
            { code: 'XF5C80', name: "Ingesup 2" }
        ]

        this.getGroups = function(){
            return groups;
        }

        this.createGroup = function(name){
            $http.get("http://localhost:1337/groups/create").then(function(resp) {
                console.log('Success', resp);
                // For JSON responses, resp.data contains the result
            }, function(err) {
                console.error('ERR', err);
                // err.status will contain the status code
            })
        }
});