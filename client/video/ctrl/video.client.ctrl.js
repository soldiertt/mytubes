angular.module('video').controller('VideoController', ['$scope', '$location',  'Authentication', 'VideoResource',
    function ($scope, $location, Authentication, VideoResource) {
        $scope.authentication = Authentication;
        $scope.newvideo = {};
        $scope.save = function() {
            var tags = $scope.newvideo.tags.split(" ");
            var video = new VideoResource({
                ref: $scope.newvideo.ref,
                tags: tags
            });
            video.$save(function (response) {
                $location.path('video/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);
