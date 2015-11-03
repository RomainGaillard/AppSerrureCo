/**
 * Created by Romain Gaillard on 29/10/2015.
 */

angular.module('constants.services')

    .service('ConstantsSrv', function() {
        var domain = "http://192.168.0.44:13337/"
        this.createGroup = domain+"group/create";
        this.login = domain+"auth/local";
    });