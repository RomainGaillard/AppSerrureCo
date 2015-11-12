/**
 * Created by Romain Gaillard on 29/10/2015.
 */

angular.module('constants.services')

    .service('ConstantsSrv', function() {

        var domain = "http://localhost:1337/"
        this.createGroup = domain+"group/create";
        this.login = domain+"auth/local";
        this.logout = domain+"logout"
        this.register = domain+"auth/local/register"
    });