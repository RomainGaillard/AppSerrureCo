/**
 * Created by Romain Gaillard on 23/10/2015.
 * Ce fichier permet de g�rer toutes les DEPENDANCES des NAMESPACE des CONTROLLERS.
 */


//angular.module('starter.controllers',[])
angular.module('login.controllers', ['authentification.services'])
angular.module('register.controllers',['authentification.services'])
angular.module('account.controllers' ,['authentification.services'])
angular.module('locks.controllers',['locks.services'])
angular.module('lock.controllers', [])
angular.module('groups.controllers',['groups.services'])
angular.module('logs.controllers', [])