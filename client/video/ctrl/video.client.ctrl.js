angular.module('video').controller('VideoController', ['$scope', '$location',  'Authentication', 'VideoResource',
    function ($scope, $location, Authentication, VideoResource) {

        var splitTags = function(tagsInput) {
            if (tagsInput) {
                return tagsInput.split(" ");
            } else {
                return [];
            }
        };

        $scope.authentication = Authentication;
        $scope.newvideo = {};
        $scope.save = function() {
            var tags = splitTags($scope.newvideo.tags);
            var video = new VideoResource({
                ref: $scope.newvideo.ref,
                tags: tags
            });
            video.$save(function (response) {
                $location.path('video/' + response._id);
                $scope.error = undefined;
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


    }
]);
