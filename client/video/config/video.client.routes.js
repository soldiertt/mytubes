/***************************************************************
*********** NOT USED ******************************************/
angular.module('video').config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/video', {
        templateUrl: 'video/views/list-video.client.view.html'
    }).
    when('/video/create', {
        templateUrl: 'video/views/create-video.client.view.html'
    }).
    when('/video/:videoId', {
        templateUrl: 'video/views/view-video.client.view.html'
    }).
    when('/video/:videoId/edit', {
        templateUrl: 'video/views/edit-video.client.view.html'
    });
}]);
