// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;

var app = angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    // SQLite DB
    db = $cordovaSQLite.openDB("iamon");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS repo (id integer primary key, repo text, nickname text)");
    //$cordovaSQLite.deleteDB("iamon");
    
    //Parse Init
    Parse.initialize("HymbXJIgdgKl7i45sEXi29BsAvMXwomlkDgH2TC8", "Pc1PZWJHA4xvaZGSYEBW9K0XQhK6j5fSNTylhPz8");
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.addRepo', {
    cache: false,
    url: "/addRepo",
    views: {
      'menuContent': {
        templateUrl: "templates/addRepo.html",
        controller: 'AddRepoCtrl'
      }
    }
  })

  .state('app.browse', {
    cache: false,
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html",
        controller: 'BrowseCtrl'
      }
    }
  })
  
  .state('app.projDetails', {
    cache: false,
    url: "/project/:remoteUrl",
    views: {
      'menuContent': {
        templateUrl: "templates/projDetails.html",
        controller: 'DetailsCtrl'
      }
    }
  })
  
  .state('app.playlists', {
    url: "/playlists",
    views: {
      'menuContent': {
        templateUrl: "templates/playlists.html",
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/addRepo');
});
