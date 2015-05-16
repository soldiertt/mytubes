angular.module('video').factory('VideoResource', ['$resource',
    function ($resource) {
        return $resource('api/video/:videoId', {
            videoId: '@_id'
        },
        {
            update: { method: 'PUT' }
        });
    }
]);

angular.module('video').factory('YoutubeResource', ['$resource',
    function ($resource) {
        return $resource('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyD3NCaMmBoEv6jbT6-eNBWEpRuE6lwfQcY&part=snippet&id=:videoId', {
            videoId: '@_id'
        });
    }
]);
