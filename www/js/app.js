// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('domopi', ['ionic', 'domopi.controllers', 'domopi.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.rules', {
      url: '/rules',
      views: {
        'tab-rules': {
          templateUrl: 'templates/tab-rules.html',
          controller: 'RulesCtrl'
        }
      }
    })
  .state('tab.rule-detail', {
      url: '/rules/:ruleDescription',
      views: {
        'tab-rules': {
          templateUrl: 'templates/rule-detail.html',
          controller: 'RuleDetailCtrl'
        }
      }
    })

  .state('tab.addruleform', {
      url: '/form',
      views: {
        'tab-rules': {
          templateUrl: 'templates/rulesforms/form.html',
          controller: 'formController'
        }
      }
  })

  // nested states
  // each of these sections will have their own view
  // url will be nested (/form/profile)
  .state('tab.addruleform.name', {
      url: '/description',
      templateUrl: 'templates/rulesforms/form_name.html'
  })

  // url will be /form/interests
  .state('tab.addruleform.condtype', {
      url: '/condition',
      templateUrl: 'templates/rulesforms/form_condition.html'
  })

  // url will be /form/interests
  .state('tab.addruleform.action', {
      url: '/action',
      templateUrl: 'templates/rulesforms/form_action.html'
  })

  // form summary
  .state('tab.addruleform.summary', {
      url: '/summary',
      templateUrl: 'templates/rulesforms/form_summary.html'
  })

  .state('tab.sensors', {
      url: '/sensors',
      views: {
        'tab-sensors': {
          templateUrl: 'templates/tab-sensors.html',
          controller: 'SensorsCtrl'
        }
      }
    })
  .state('tab.sensor-detail', {
      url: '/sensors/:devid/:instid/:sid',
      views: {
        'tab-sensors': {
          templateUrl: 'templates/sensor-detail.html',
          controller: 'SensorDetailCtrl'
        }
      }
    })

  // url will be /form/payment
  .state('form.payment', {
      url: '/payment',
      templateUrl: 'templates/rulesforms/form_condition.html'
  })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
