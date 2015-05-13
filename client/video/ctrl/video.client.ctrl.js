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
        $scope.forms = {};
        $scope.newvideo = {};
        $scope.getTpl = function(tplName) {
           return "static/templates/" + tplName + ".html";
        };
        $scope.save = function() {

           if ($scope.forms.createVideoForm.$valid) {

               var tags = splitTags($scope.newvideo.tags);
               var video = new VideoResource({
                   ref: $scope.newvideo.ref,
                   tags: tags
               });
               video.$save(function (response) {
                   $scope.$broadcast('refreshNav');
                   $scope.error = undefined;
                   $scope.setInfo("Video successfully added !");
               }, function (errorResponse) {
                   $scope.error = errorResponse.data.message;
               });
           }
        };

        $scope.editVideo = function (video) {
            $scope.editMode = true;
            $scope.editedVideo = video;
            $scope.editedVideo.tagsDisplay = video.tags.join(" ");
        };

        $scope.listVideo = function(tagList) {
            var videos = VideoResource.query({"tags":tagList});
            $scope.videos = videos;
        };

        $scope.updateVideo = function() {
            $scope.editedVideo.tags = splitTags($scope.editedVideo.tagsDisplay);
            $scope.editedVideo.$update(function () {
                $scope.$broadcast('refreshNav');
                $scope.error = undefined;
                $scope.setInfo("Video successfully updated !");
                $scope.editMode = false;
                $scope.editedVideo = undefined;
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.deleteVideo = function(video) {
            video.$remove(function () {
                var i;
                for (i in $scope.videos) {
                    if ($scope.videos[i] === video) {
                        $scope.videos.splice(i, 1);
                    }
                }
                $scope.setInfo("Video successfully removed !");
                $scope.$broadcast('refreshNav');
            });
        };
    }
]);
