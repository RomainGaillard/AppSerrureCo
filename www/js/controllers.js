/**
 * Created by Romain Gaillard on 23/10/2015.
 * Ce fichier permet de g�rer toutes les DEPENDANCES des NAMESPACE des CONTROLLERS.
 */


//angular.module('starter.controllers',[])
angular.module('login.controllers', ['constants.services','authentification.services'])
angular.module('register.controllers',['authentification.services'])
angular.module('account.controllers' ,['authentification.services'])
angular.module('locks.controllers',['locks.services','groups.services'])
angular.module('groups.controllers',['groups.services'])
