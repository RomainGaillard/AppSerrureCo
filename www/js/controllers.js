/**
 * Created by Romain Gaillard on 23/10/2015.
 * Ce fichier permet de g�rer toutes les DEPENDANCES des NAMESPACE des CONTROLLERS.
 */


//angular.module('starter.controllers',[])
angular.module('account.controllers' ,['authentification.services'])
angular.module('groups.controllers',['groups.services'])
angular.module('locks.controllers',['locks.services','groups.services','authentification.services','directives','constants.services'])
angular.module('login.controllers', ['authentification.services','constants.services'])
angular.module('member.controllers',['groups.services','authentification.services'])
angular.module('register.controllers',['authentification.services'])
angular.module('lock.controllers', ['locks.services', 'groups.services'])
angular.module('logs.controllers', [])
angular.module('waiting.controllers', ['authentification.services'])
