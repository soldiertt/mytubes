angular.module('authentication').factory('AuthenticationSrv', ['$http', function ($http) {

   var service = {};
   service.user = window.user;

   return {
      setUser: function(userParam) {
         service.user = userParam;
      },
      getUser: function() {
         return service.user;
      },
      signIn: function (userData) {
         if (userData) {
            return $http.post("/signin", userData);
         }
      },
      signUp: function (userData) {
         if (userData) {
            return $http.post("/signup", userData);
         }
      },
      logout: function() {
         return $http.post('/signout');
      }
   };


}]);
