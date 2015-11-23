/**
 * Created by Romain Gaillard on 29/10/2015.
 */

angular.module('constants.services')

    .service('ConstantsSrv', function() {

        var domain = "http://localhost:1337/"

        this.group           = domain+"group";
        this.createGroup     = domain+"group/create";
        this.exitGroup       = domain+"group/:code/exit";
        this.destroyGroup    = domain+"group/:code/destroy";
        this.removeLock      = domain+"group/:code/lock/remove/:id";
        this.askAccess       = domain+"group/:code/askAccess";
        this.groupUsersWait  = domain+"group/:code/usersWait"
        this.join            = domain+"group/:code/join";

        this.updateAccount   = domain+"user/update";

        this.createLock      = domain+"lock";
        this.updateLock      = domain+"lock/:id/update";
        this.lock            = domain+"lock/:id";

        this.login           = domain+"auth/local";
        this.logout          = domain+"logout"
        this.register        = domain+"auth/local/register"
        this.user            = domain+"group/:code/user"
        this.myUser          = domain+"user"
        this.giveAccess      = domain+"group/:code/giveAccess"
        this.exclude         = domain+"group/:code/exclude"

        this.logs            = domain+"lock/:id/log";
        this.logsByDate      = domain+"lock/:id/log/date";
        this.logsByDualDate  = domain+"lock/:id/log/dualdate";
    });
