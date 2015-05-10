angular.module('core').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'core/views/index.client.view.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);
