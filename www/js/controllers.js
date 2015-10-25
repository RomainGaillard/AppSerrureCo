/**
 * Created by Romain Gaillard on 23/10/2015.
 * Ce fichier permet de gérer toutes les DEPENDANCES des NAMESPACE des CONTROLLERS.
 */


//angular.module('starter.controllers',[])
angular.module('register.controllers',[])
angular.module('locks.controllers',['locks.services'])
angular.module('login.controllers', ['authentification.services'])