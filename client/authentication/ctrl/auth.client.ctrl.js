angular.module('authentication').controller('AuthenticationController', ['$scope', '$location', 'AuthenticationSrv',
    function ($scope, $location, AuthenticationSrv) {

      $scope.userData = {};
      $scope.forms = {};

      $scope.signIn = function () {
         if ($scope.forms.loginForm.$valid) {
            var promise = AuthenticationSrv.signIn($scope.userData);
            promise.success(function (data, status, header) {
               AuthenticationSrv.setUser(data);
               $location.path("/");
            }).error(function () {
               $scope.error = "Wrong username or password !";
            });
         }
      };

      $scope.register = function () {
         if ($scope.forms.registerForm.$valid) {
            var promise = AuthenticationSrv.signUp($scope.userData);
            promise.success(function (data, status, header) {
               AuthenticationSrv.setUser(data);
               $location.path("/");
            }).error(function (err) {
               $scope.error = err.error;
            });
         }
      };


   }
]);
