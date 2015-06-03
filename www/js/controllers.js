angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
 
})

.controller('AddRepoCtrl', function($scope, $cordovaSQLite, $cordovaBarcodeScanner) {
   
   var scanned = false;
   $scope.remoteURL = 'Remote URL';
   $scope.repoName = 'Repo Name';
   
   $scope.scan = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            
            scanned = true;
            $scope.remoteURL = imageData.text;
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
            
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
   
   // Insert into table repo 
//   var insert = function() {
//        var query = "INSERT INTO repo (repo, nickname) VALUES (?,?)";
//        $cordovaSQLite.execute(db, query, [repo, nickname]).then(function(res) {
//            console.log("INSERT ID -> " + res.insertId);
//        }, function (err) {
//            console.error(err);
//        });
//    };
    
});


