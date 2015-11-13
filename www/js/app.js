// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngResource','login.controllers', 'register.controllers', 'account.controllers',
    'groups.controllers', 'locks.controllers', 'member.controllers',
    'groups.services', 'locks.services','constants.services', 'member.services','authentification.services','ngStorage','directives'])

    .run(function ($ionicPlatform,$rootScope,$http,$state,AuthSrv) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            $rootScope.$on("$stateChangeStart",function(event,toState,toParams,fromState,fromParams){
                if(toState.authenticate)
                {
                    if(AuthSrv.getUser().token == undefined){
                        alert("Veuillez vous connecter !");
                        event.preventDefault();
                        $state.go("app");
                    }
                }
            })
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            })

            .state('locks', {
                url: '/locks',
                templateUrl: 'templates/locks.html',
                controller: 'LocksCtrl',
                authenticate:true
            })

            .state('editGroup', {
                url:'/editGroup',
                templateUrl: 'templates/group_edit.html',
                controller: 'GroupsCtrl',
                authenticate:true
            })

            .state('account', {
                url:'/account',
                templateUrl: 'templates/account.html',
                controller: 'AccountCtrl',
                authenticate:true
            })

            .state('member', {
                url:'/member',
                templateUrl: 'templates/manage_member.html',
                controller: 'MemberCtrl',
                authenticate:true
            })

// if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/#');
    });
