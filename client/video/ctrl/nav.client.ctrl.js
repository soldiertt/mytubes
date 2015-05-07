angular.module('video').controller('NavigationController', ['$scope', '$location', 'NavigationResource',
    function ($scope, $location, NavigationResource) {

        $scope.navtags = NavigationResource.query();

    }
]);
