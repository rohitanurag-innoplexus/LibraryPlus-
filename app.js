var mymodule =angular.module('mymodule', ['ui.router'])
  .config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
      url: '/',
      views: {
        '': {
          templateUrl: './templates/here.html'
        },
        'boo@home': {
          templateUrl: './templates/assets/boo.html'
        },

      }
    })

    .state('loggedin', {
      url: '/loggedin',
      views: {
        '': {
          templateUrl: './templates/main.html'
        },
        'nav@loggedin': {
          templateUrl: './templates/assets/nav.html'
        },
        'body@loggedin': {
          templateUrl: './templates/body.html',
          controller : 'mainController'


        }

      }
    })

    .state('loggedin.addbook', {
      url: '/addbook',
      views: {
        'body@loggedin': {
          templateUrl: './templates/assets/footer.html'
        }
      }
    })

    .state('loggedin.adddelbook', {
      url: '/adddelbook',
      views: {
        'body@loggedin': {
          templateUrl: './templates/assets/adddel.html'
        }
      }
    })

    .state('loggedin.updatebook', {
      url: '/updatebook',
      views: {
        'body@loggedin': {
          templateUrl: './templates/assets/update.html'
        }
      }
    })

    .state('loggedin.issuebook', {
      url: '/issuebook',
      views: {
        'body@loggedin': {
          templateUrl: './templates/assets/issue.html'
        }
      }
    })

    .state('loggedin.visual', {
      url: '/visual',
      views: {
        'body@loggedin': {
          templateUrl: './templates/assets/visual.html'
        }
      }
    })


    .state('loggedin.bookdetail', {
      url: '/bookdetail',
      views: {
        'body@loggedin': {
          templateUrl: './templates/assets/details.html',
          controller : 'detailsController'

        }
      }
    });
    $urlRouterProvider.otherwise('/');
  }]);


mymodule.controller("mainController",PostsCtrlAjax);
    function PostsCtrlAjax($scope, $http, $state,$rootScope) {

              $http({
                  method: 'GET',
                  url: 'http://localhost:1337/api/todos'
              }).success(function(data) {
                  $scope.pics = data; // response data
              });

      $scope.goToDetailPage = function(id1,id2,id3,id4,id5,id6,id7,id8){
        $rootScope.isbn = id1;
        $rootScope.names = id2;

        $rootScope.author = id3;
        $rootScope.publisher = id4;
        $rootScope.desc = id5;
        $rootScope.tnum = id6;
        $rootScope.img = id7;
        $rootScope.pnumber = id8;

              }

  }

  mymodule.controller('detailsController',kaka);
 function kaka($scope,$http,$rootScope) {
   $scope.mm1=$rootScope.isbn ;
   $scope.mm2=$rootScope.names;

   $scope.mm3=$rootScope.author;
   $scope.mm4=$rootScope.publisher;
   $scope.mm5=$rootScope.desc;
   $scope.mm6=$rootScope.tnum;
   $scope.mm7=$rootScope.img;
   $scope.mm8=$rootScope.pnumber;






}


mymodule.controller('issueController',rohit);
function rohit($scope,$http) {
  $scope.issueUser = function() {
//alert(datawhole.name);
var datawhole={};


datawhole["tnum"] = "-"+$scope.ncop;
datawhole["issued"] = $scope.rnum +"("+$scope.ncop + ")";
alert($scope.rnum);
$http({
    method : 'PUT',
    url : 'http://localhost:1337/api/new/'+ $scope.isbn,
    data :JSON.stringify(datawhole)
})

alert("Issued Succesfully");
window.location.href = 'http://localhost/newopen/#/loggedin';




}






}



mymodule.controller('delController',mejja);
function mejja($scope,$http) {
  $scope.deleteBook = function() {
//alert(datawhole.name);
var datawhole={};
var mm ;

if($scope.added){
datawhole["tnum"] = $scope.added;
mm = "Added";
}

if($scope.deleted){
datawhole["tnum"] = "-"+$scope.deleted;
mm = "Deleted";

}


$http({
    method : 'PUT',
    url : 'http://localhost:1337/api/upd/'+ $scope.isbn,
    data :JSON.stringify(datawhole)
})

alert(mm+" Succesfully");

window.location.href = 'http://localhost/newopen/#/loggedin';



}





}


mymodule.controller('putController',huha);
function huha($scope,$http) {
  $scope.hole = "";
  //alert($scope.hole);

  $scope.updateUser = function() {

    if ($scope.mega == "BookName")
    {
$scope.hole="name";
    }
    if ($scope.mega == "Author")
    {
$scope.hole="author";
    }
    if ($scope.mega == "Publisher")
    {
$scope.hole="publisher";
    }
    if ($scope.mega == "PageNumber")
    {
$scope.hole="pnumber";
    }
    if ($scope.mega == "Description")
    {
$scope.hole="desc";
    }
    if ($scope.mega == "No.OfBooks")
    {
$scope.hole="tnum";
    }
    if ($scope.mega == "ImageUrl")
    {
$scope.hole="img";
    }

    //alert($scope.hole);

var datawhole={};
datawhole[$scope.hole] = $scope.dataa;
//var idofl = $scope.isbn
//alert($scope.isbn);

      $http({
          method : 'PUT',
          url : 'http://localhost:1337/api/todos/'+ $scope.isbn,
          data :JSON.stringify(datawhole)
      })

alert("Updated Succesfully");

window.location.href = 'http://localhost/newopen/#/loggedin';



}




}


mymodule.controller('postController',never);
function never($scope,$http) {
  $scope.user = {};
  $scope.createUser = function() {
    var datawhole = {
ISBN: $scope.isbn,
name: $scope.name,
author: $scope.author,
publisher: $scope.publisher,
pnumber: $scope.pnumber,
desc: $scope.desc,
tnum: $scope.nobooks,
img: $scope.imgurl

};
//alert(datawhole.name);

      $http({
          method : 'POST',
          url : 'http://localhost:1337/api/todos',
          data :JSON.stringify(datawhole)
      })

alert("Submitted Succesfully");

window.location.href = 'http://localhost/newopen/#/loggedin';



}
}
