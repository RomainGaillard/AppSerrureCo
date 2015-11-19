/**
 * Created by Romain Gaillard on 29/10/2015.
 */

angular.module('constants.services')

    .service('ConstantsSrv', function() {

        var domain = "http://10.33.0.52:1337/"

        this.group = domain+"group/:code";
        this.createGroup = domain+"group/create";
        this.exitGroup = domain+"group/:code/exit"
        this.destroyGroup = domain+"group/:code/destroy"
        this.removeLock = domain+"group/:code/lock/remove/:id"

        this.createLock = domain+"lock";

        this.login = domain+"auth/local";
        this.logout = domain+"logout"
        this.register = domain+"auth/local/register"

        this.giveAccess = domain+"group/giveAccess"
        this.exclude = domain+"group/:code/exclude"
        this.user = domain+"group/:code/user"

    });
