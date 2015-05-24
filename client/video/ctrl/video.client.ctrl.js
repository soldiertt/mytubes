/*global MyTubesLib */
angular.module('video').controller('VideoController', ['$scope', '$location', '$sce', '$modal', 'NavigationResource', 'VideoResource', 'YoutubeResource', 'ModalHelper', 'NavTagsService',
    function ($scope, $location, $sce, $modal, NavigationResource, VideoResource, YoutubeResource, ModalHelper, NavTagsService) {

      $scope.forms = {};
      $scope.navtags = [];
      $scope.newvideo = {};
      $scope.editedVideo = {};
      $scope.getTpl = function (tplName) {
         return "static/templates/" + tplName + ".html";
      };

      $scope.setNavtags = function (tags) {
         $scope.navtags = tags;
      };

      $scope.autocompleteTags = function ($query) {
         return $scope.navtags.filter(function (elem) {
            return elem._id.indexOf($query) === 0;
         }).map(function (elem) {
            return elem._id;
         });
      };

      $scope.save = function () {
         if ($scope.forms.createVideoForm.$valid) {

            var video = new VideoResource({
               ref: $scope.newvideo.ref,
               tags: $scope.newvideo.tags.map(function (elem) {
                  return elem.text;
               })
            });
            video.$save(function (savedVideo) {

               $scope.$broadcast('refreshNav');
               $scope.error = undefined;
               $scope.newvideo.ref = "";
               $scope.newvideo.tags = [];
               $scope.forms.createVideoForm.$setPristine();
               $scope.setInfo("Video successfully added !");

               // Check if needed to add the video to current view
               if (NavTagsService.getSelectedTagNames().length === 0) {
                  // add to latest videos
                  $scope.videos.unshift(MyTubesLib.business.normalizeVideo(savedVideo, $sce));
               } else if (MyTubesLib.util.allMatchInArray(savedVideo.tags, NavTagsService.getSelectedTagNames())) {
                  $scope.videos.unshift(MyTubesLib.business.normalizeVideo(savedVideo, $sce));
               }
            }, function (errorResponse) {
               $scope.error = errorResponse.data.message;
            });
         }
      };

      $scope.resetCreateForm = function () {
         $scope.newvideo.ref = "";
         $scope.newvideo.tags = [];
         $scope.error = undefined;
         $scope.forms.createVideoForm.$setPristine();
      };

      $scope.listVideo = function (tagList) {
         var processVideos = function (foundVideos) {
            var i;
            for (i = 0; i < foundVideos.length; i = i + 1) {
               foundVideos[i] = MyTubesLib.business.normalizeVideo(foundVideos[i], $sce);
            }
            $scope.videos = foundVideos;
         };
         if (tagList.length > 0) {
            $scope.mainTitle = "";
            $scope.mainTags = tagList;
            VideoResource.query({
               "tags": tagList
            }, processVideos);
         } else {
            $scope.mainTitle = "Latest videos";
            $scope.mainTags = [];
            VideoResource.query(processVideos);
         }

      };

      $scope.editVideo = function (video) {
         $scope.editMode = true;
         $scope.editedVideo = video;
         $scope.editedVideo.tempTags = video.tags.map(function (elem) {
            return {
               text: elem
            };
         });
      };

      $scope.updateVideo = function () {
         $scope.forms.editVideoForm.$setSubmitted();
         if ($scope.forms.editVideoForm.$valid) {
            $scope.editedVideo.tags = $scope.editedVideo.tempTags.map(function (elem) {
               return elem.text;
            });
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

      $scope.deleteVideo = function (video) {

         var deleteCallback = function () {
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
         YoutubeResource.get({
            videoId: video.ref
         }, function (data) {
            var vidTitle = "[UNKNOWN]";
            if (data.items[0]) {
               vidTitle = data.items[0].snippet.title;
            }
            ModalHelper.open("deleteConfirm", deleteCallback, vidTitle);
         });
      };

      $scope.containsTagsError = function ($error) {
         var found = false,
            errorName,
            tagsErrors = ["leftoverText", "minTags", "maxTags"];
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
            tagsErrors = ["leftoverText", "minTags", "maxTags"],
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
