angular.module('core').config(['$routeProvider', function ($routeProvider) {

   var checkLoggedin = function ($q, $timeout, $http, $location) {
      var deferred = $q.defer();
      $http.get('/loggedin').success(function (user) {
         if (user !== '0') {
            deferred.resolve();
         } else {
            deferred.reject();
            $location.url('/login');
         }
      });
      return deferred.promise;
   };

   $routeProvider.when('/', {
      templateUrl: 'core/views/index.client.view.html',
      resolve: {
         loggedin: checkLoggedin
      }
   }).otherwise({
      redirectTo: '/'
   });
}]);
