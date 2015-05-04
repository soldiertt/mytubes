angular.module('video').factory('VideoResource', ['$resource',
    function ($resource) {
        return $resource('api/video/:videoId', {
            videoId: '@_id'
        },
        {
            update: {
                method: 'PUT'
            }
        });
    }
]);
