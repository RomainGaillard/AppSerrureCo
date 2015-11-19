/**
 * Created by Romain Gaillard on 23/10/2015.
 * Ce fichier permet de g�rer toutes les DEPENDANCES des NAMESPACE des CONTROLLERS.
 */


//angular.module('starter.controllers',[])
angular.module('account.controllers' ,['authentification.services'])
angular.module('groups.controllers',['groups.services'])
angular.module('locks.controllers',['locks.services','groups.services','authentification.services','directives'])
angular.module('login.controllers', ['authentification.services','constants.services'])
angular.module('member.controllers',['groups.services'])
angular.module('register.controllers',['authentification.services'])
angular.module('lock.controllers', [])
angular.module('logs.controllers', [])
