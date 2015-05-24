angular.module('core').controller('CoreController', ['$scope', '$timeout', '$route', 'AuthenticationSrv', function ($scope, $timeout, $route, AuthenticationSrv) {

      $scope.setInfo = function (info) {
         $scope.info = info;
         $timeout(function () {
            $scope.info = undefined;
         }, 5000);
      };

      $scope.authUser = function() {
         return AuthenticationSrv.getUser();
      };

      $scope.logout = function() {
        var promise = AuthenticationSrv.logout();
         promise.success(function() {
            AuthenticationSrv.setUser(undefined);
            $route.reload();
         });
      };
   }
]);
