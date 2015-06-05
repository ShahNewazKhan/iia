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
  
  console.log($stateParams);
 
})

.controller('BrowseCtrl', function($scope, $cordovaSQLite) {
  
  $scope.projects = [];
  
  var getProjects = function() {
        
        var query = "SELECT nickname FROM repo";
        
        $cordovaSQLite.execute(db, query).then(function(res) {
            
            if(res.rows.length > 0) {
                for(var x = 0; x < res.rows.length; x++){
                  
                  var project = {};
                  project["nickname"] = res.rows.item(x).nickname;
                  $scope.projects.push(project);
                
                }
                
                console.log($scope.projects);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
   };
   
   getProjects();
 
})

.controller('AddRepoCtrl', function($scope, $cordovaSQLite, $cordovaBarcodeScanner, $cordovaDialogs) {
   
   var scanned = false;
   var named = false;
   
   $scope.remoteURL = 'Remote URL';
   $scope.repoName = 'Repo Name';
   
   $scope.scan = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            
            scanned = true;
            $scope.remoteURL = imageData.text;
            $cordovaDialogs.beep(1);            
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
    
    $scope.promptRepoName = function(){
      $cordovaDialogs.prompt('Enter a name', 'Repo Name', ['Ok','Cancel'], '')
      .then(function(result) {
        // no button = 0, 'OK' = 1, 'Cancel' = 2
        if (result.buttonIndex == 1 && result.input1 != ''){
          named = true;
          $scope.repoName = result.input1;
        }
          
      });
    };
    
    $scope.save = function(){
      if(named){
        if(scanned){
          check($scope.remoteURL, $scope.repoName);
        }
        else{
          alert('Scan a repo first')
          console.log('Scan a repo first!');
        }
      }
      else{
        alert('Name your repo first');
        console.log('Name your repo first!');
      }
    };
   
   var check = function(repo, nickname) {
        var query = "SELECT nickname FROM repo WHERE nickname = ?";
        $cordovaSQLite.execute(db, query, [nickname]).then(function(res) {
            if(res.rows.length > 0) {
                alert('Name already exists, choose another');
                console.log("SELECTED -> " + res.rows.item(0).nickname );
            } else {
                console.log("No results found");
                insert($scope.remoteURL, $scope.repoName);
            }
        }, function (err) {
            console.error(err);
        });
   };
   
   var insert = function( repo, nickname) {
        var query = "INSERT INTO repo (repo, nickname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [repo, nickname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
    };
});


