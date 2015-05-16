angular.module('core').controller('CoreController', ['$scope', '$timeout', 'Authentication',
    function ($scope, $timeout, Authentication) {
        $scope.authentication = Authentication;
        $scope.setInfo = function(info) {
            $scope.info = info;
            $timeout(function(){ $scope.info = undefined; }, 5000);
        };
    }
]);
