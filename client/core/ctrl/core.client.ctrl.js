angular.module('core').controller('CoreController', ['$scope', 'Authentication',
    function ($scope, Authentication) {
        $scope.authentication = Authentication;
        $scope.setInfo = function(info) {
            $scope.info = info;
        };
    }
]);
