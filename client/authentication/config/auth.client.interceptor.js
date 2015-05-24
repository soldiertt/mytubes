/* Listen for any ajax request and check for unauthorized call */
angular.module('authentication').config(['$httpProvider', function ($httpProvider) {
   $httpProvider.interceptors.push(function($q, $location) {
      return {
         response: function(response) {
            return response;
         },
         responseError: function(response) {
            if (response.status === 401) {
               console.log('intercept 401 response, redirecting ...');
               $location.url('/login');
            }
            return $q.reject(response);
         }
      };
   });
}]);
