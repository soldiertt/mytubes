angular.module('video').controller('NavigationController', ['$scope', '$location', 'NavigationResource',
    function ($scope, $location, NavigationResource) {

        $scope.selectedTagNames = [];
        $scope.availableTags = [];

        var availables = function() {
                $scope.availableTags = NavigationResource.query({"tags":$scope.selectedTagNames}, function(availableTags) {
                    $scope.navtags.forEach(function(navtag, i, navtags) {
                        var j,
                            available = false;
                        for (j = 0; j < availableTags.length; j++) {
                            if (navtag._id === availableTags[j]._id) {
                                available = true;
                                break;
                            }
                        }
                        navtags[i].disabled = !available;
                        if (available) {
                            navtags[i].count = availableTags[j].count;
                        } else {
                            navtags[i].count = undefined;
                        }
                    });
                });

            },
            loadNav = function() {
                $scope.navtags = NavigationResource.query();
                availables();
            };

        loadNav();

        $scope.$on('refreshNav', function (e) {
            loadNav();
        });

        $scope.toggleTag = function(tagName) {
            if ($scope.selectedTagNames.indexOf(tagName) !== -1) {
                $scope.selectedTagNames.splice($scope.selectedTagNames.indexOf(tagName), 1);
            } else {
                $scope.selectedTagNames.push(tagName);
            }
            $scope.listVideo($scope.selectedTagNames);
            availables();
        };

        $scope.isSelected = function(tag) {
            return $scope.selectedTagNames.indexOf(tag._id) !== -1;
        };

    }
]);
