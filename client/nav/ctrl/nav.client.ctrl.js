angular.module('video').controller('NavigationController', ['$scope', '$location', 'NavigationResource', 'NavTagsService',
    function ($scope, $location, NavigationResource, NavTagsService) {

        var loadNav = function() {
                NavTagsService.setNavtags(NavigationResource.query());
                $scope.setNavtags(NavTagsService.getNavtags()); //Store in parent controller
                NavigationResource.query({"tags":NavTagsService.getSelectedTagNames()}, function(availables){
                  NavTagsService.setAvailableTags(availables);
               });
            };

        loadNav();

        $scope.$on('refreshNav', function (e) {
            loadNav();
        });

        $scope.toggleTag = function(tagName) {
            if (NavTagsService.getSelectedTagNames().indexOf(tagName) !== -1) {
               NavTagsService.removeSelectedTagName(tagName);
            } else {
               NavTagsService.addSelectedTagName(tagName);
            }
            $scope.listVideo(NavTagsService.getSelectedTagNames());
            NavigationResource.query({"tags":NavTagsService.getSelectedTagNames()}, function(availables){
               NavTagsService.setAvailableTags(availables);
            });
        };

        $scope.isSelected = function(tag) {
            return NavTagsService.getSelectedTagNames().indexOf(tag._id) !== -1;
        };

    }
]);
