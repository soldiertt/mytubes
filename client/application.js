var mainApplicationModuleName = 'mytubes';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'ngResource', 'authentication', 'core', 'video', 'ui.bootstrap', 'ngMessages', 'ngAnimate']);

mainApplicationModule.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

if (window.location.hash === '#_=_') { window.location.hash = '#!'; }

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});
