angular.module('video').controller('ModalController', ['$scope', '$modalInstance', 'modalInfo',
   function ($scope, $modalInstance, modalInfo) {

     $scope.modalInfo = modalInfo;

     $scope.ok = function () {
       $modalInstance.close(true);
     };

     $scope.cancel = function () {
       $modalInstance.dismiss('cancel');
     };
   }
]);
