angular.module('video').controller('VideoController', ['$scope', '$location',  '$sce', 'Authentication', 'NavigationResource', 'VideoResource',
    function ($scope, $location, $sce, Authentication, NavigationResource, VideoResource) {

        $scope.authentication = Authentication;
        $scope.forms = {};
        $scope.newvideo = {};
        $scope.editedVideo = {};
        $scope.getTpl = function(tplName) {
           return "static/templates/" + tplName + ".html";
        };

        $scope.loadTags = function() {
           return NavigationResource.query();
        };

        $scope.save = function() {
           if ($scope.forms.createVideoForm.$valid) {

               var video = new VideoResource({
                   ref: $scope.newvideo.ref,
                   tags: $scope.newvideo.tags.map(function(elem) { return elem.text; } )
               });
               video.$save(function (response) {
                   $scope.$broadcast('refreshNav');
                   $scope.error = undefined;
                   $scope.newvideo = {};
                   $scope.forms.createVideoForm.$setPristine();
                   $scope.setInfo("Video successfully added !");
               }, function (errorResponse) {
                   $scope.error = errorResponse.data.message;
               });
           }
        };

       $scope.listVideo = function(tagList) {
            var processVideos = function(foundVideos) {
               var i;
               for (i = 0; i < foundVideos.length; i=i+1) {
                  foundVideos[i].trustedRef = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + foundVideos[i].ref);
               }
               $scope.videos = foundVideos;
            };
            if (tagList.length > 0) {
               $scope.mainTitle = tagList.join(" + ");
               $scope.videos = VideoResource.query({"tags":tagList}, processVideos);
            } else {
               $scope.mainTitle = "Latest videos";
               VideoResource.query(processVideos);
            }

        };

        $scope.editVideo = function (video) {
            $scope.editMode = true;
            $scope.editedVideo = video;
            $scope.editedVideo.tempTags = video.tags.map(function(elem) { return {text: elem}; });
        };

        $scope.updateVideo = function() {
            $scope.forms.editVideoForm.$setSubmitted();
            if ($scope.forms.editVideoForm.$valid) {
               $scope.editedVideo.tags = $scope.editedVideo.tempTags.map(function(elem) { return elem.text; } );
               $scope.editedVideo.$update(function () {
                   $scope.$broadcast('refreshNav');
                   $scope.error = undefined;
                   $scope.setInfo("Video successfully updated !");
                   $scope.editMode = false;
                   $scope.editedVideo = {};
               }, function (errorResponse) {
                   $scope.error = errorResponse.data.message;
               });
            }
        };

        $scope.cancelEdit = function (video) {
            $scope.editMode = false;
            $scope.editedVideo = {};
            $scope.forms.editVideoForm.$setPristine();
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

        $scope.containsTagsError = function ($error) {
            var found = false,
                errorName,
                tagsErrors=["leftoverText", "minTags", "maxTags"];
            for (errorName in $error) {
               if (tagsErrors.indexOf(errorName) > -1) {
                  found = true;
                  break;
               }
            }
            return found;
         };

        $scope.filterTagsError = function ($error) {
            var errorName,
                tagsErrors=["leftoverText", "minTags", "maxTags"],
                errorOut = {};

            for (errorName in $error) {
               if (tagsErrors.indexOf(errorName) > -1) {
                  errorOut[errorName] = $error[errorName];
               }
            }
            return errorOut;
         };

        $scope.listVideo([]);
    }
]);
