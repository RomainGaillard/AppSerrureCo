/**
 * Created by Romain Gaillard on 23/10/2015.
 * Ce fichier permet de g�rer toutes les DEPENDANCES des NAMESPACE des SERVICES.
 */


//angular.module('starter.services', [])
angular.module('constants.services', [])
angular.module('groups.services', [])
angular.module('locks.services', [])
angular.module('authentification.services', ['constants.services'])
angular.module('member.services', [])
