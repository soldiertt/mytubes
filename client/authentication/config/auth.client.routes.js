angular.module('authentication').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
       templateUrl: 'authentication/views/login.client.view.html'
    }).when('/register', {
       templateUrl: 'authentication/views/register.client.view.html'
    });
}]);
