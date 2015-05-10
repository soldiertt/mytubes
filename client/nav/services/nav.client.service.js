angular.module('video').factory('NavigationResource', ['$resource',
    function ($resource) {
        return $resource('api/tags');
    }
]);
