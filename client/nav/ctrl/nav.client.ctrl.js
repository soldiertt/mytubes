angular.module('video').controller('NavigationController', ['$scope', '$location', 'NavigationResource',
    function ($scope, $location, NavigationResource) {

        $scope.selectedTags = [];

        var loadNav = function() {
            $scope.navtags = NavigationResource.query();
        };

        loadNav();

        $scope.$on('refreshNav', function (e) {
            loadNav();
        });

        $scope.addTag = function(tagName) {
            $scope.selectedTags.push(tagName);
            $scope.listVideo($scope.selectedTags);
        };

        $scope.removeTag = function(tagName) {
            $scope.selectedTags.splice($scope.selectedTags.indexOf(tagName), 1);
            $scope.listVideo($scope.selectedTags);
        };

    }
]);
