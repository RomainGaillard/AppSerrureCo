/**
 * Created by Romain Gaillard on 29/10/2015.
 */

angular.module('constants.services')

    .service('ConstantsSrv', function() {
        var domain = "http://10.33.0.52:1337/"
        this.createGroup = domain+"group/create";
        this.login = domain+"auth/local";
    });