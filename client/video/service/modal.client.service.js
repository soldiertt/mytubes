angular.module('video').factory('ModalHelper', ['$modal',
    function ($modal) {

      var modalManager = function(type, arg1, arg2, arg3) {
            if (type === "deleteConfirm") {
               return {
                  "templateUrl":"/static/templates/modal-delete-confirm.html",
                  "modalInfo": {
                     "title" : "Are you sure ?",
                     "video" : arg1
                  }
               };
            } else {
               return {};
            }
          },
          modalOptions = function(modal) {
             return {
                  animation: true,
                  templateUrl: modal.templateUrl,
                  controller: 'ModalController',
                  size: 'sm',
                  resolve: { "modalInfo": function() { return modal.modalInfo; }}
               };
          },
          modalInstancer = function(options) {
             return $modal.open(options);
         };


      return {

         "open": function (type, callbackFn, arg1, arg2, arg3) {
            var modal = modalManager(type, arg1, arg2, arg3),
                options = modalOptions(modal),
                modalInstance = modalInstancer(options);

            modalInstance.result.then(function (remove) {
               callbackFn();
            }, function () {
               // do nothing
            });
         }
      };
    }
]);
