// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngResource','login.controllers', 'register.controllers', 'account.controllers',
    'groups.controllers', 'locks.controllers', 'member.controllers', 'waiting.controllers','memberWaiting.controllers',
    'groups.services', 'logs.controllers', 'lock.controllers', 'locks.services','constants.services', 'member.services','authentification.services','ngStorage','directives',
    'tab.controllers', 'logs.services'])



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
                cache: false,
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
                templateUrl: 'templates/edit_group.html',
                controller: 'GroupsCtrl',
                authenticate:true,
                params: {'group':{code:"XXXXX",name:"Undefined"}}
            })

            .state('account', {
                url:'/account',
                templateUrl: 'templates/account.html',
                controller: 'AccountCtrl',
                authenticate:true
            })

            .state('mwm', {
                url: '/tabmwm',
                abstract: true,
                authenticate:true,
                params:{'group':{}},
                controller:"MemberWaitingCtrl",
                templateUrl: 'templates/manage_waiting_member.html',
            })

            .state('mwm.waiting', {
                url: '/waiting',
                authenticate:true,
                views: {
                    'tab-waiting': {
                        templateUrl: 'templates/waiting_user.html',
                        controller: 'WaitingCtrl'
                    }
                },
                params: {'group':{}},
                authenticate:true
            })

            .state('mwm.member', {
                url: '/member',
                authenticate:true,
                views: {
                    'tab-validate': {
                        templateUrl: 'templates/manage_member.html',
                        controller: 'MemberCtrl'
                    }
                },
                params: {
                    'group':''
                }
            })

            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html',
                controller: 'tabCtrl',
                params:{'lock':{}},
                authenticate:true
            })

            .state('tab.lock', {
                url: '/lock',
                authenticate:true,
                views: {
                    'tab-lock': {
                        templateUrl: 'templates/lock.html',
                        controller: 'LockCtrl'
                    }
                },
                params: {'lock':{}, 'group':{}}
            })

            .state('tab.log', {
                url: '/logs',
                authenticate:true,
                views: {
                    'tab-logs': {
                        templateUrl: 'templates/logs.html',
                        controller: 'LogsCtrl'
                    }
                }
            })
// if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/#');
    });
