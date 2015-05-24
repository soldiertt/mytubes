/*angular.module('video').directive('tagsValid', function () {
   return {

      // limit usage to argument only
      restrict: 'A',

      // require NgModelController, i.e. require a controller of ngModel directive
      require: 'ngModel',

      // create linking function and pass in our NgModelController as a 4th argument
      link: function (scope, element, attr, ctrl) {
         // please note you can name your function & argument anything you like
         function customValidator(ngModelValue) {
            var inputTags, validLength,
               noSpecialChars = function (str) {
                  return !/[~`!#$%\^&*+=\[\]\\';,\/{}|\\\(\)@°§_":<>\?³²\.]/g.test(str);
               };

            if (noSpecialChars(ngModelValue)) {
               ctrl.$setValidity('noSpecialCharsValidator', true);
            } else {
               ctrl.$setValidity('noSpecialCharsValidator', false);
            }

            inputTags = ngModelValue.toLowerCase();

            var allTags = inputTags.split(" ");

            // Remove empty strings
            allTags = allTags.filter(Boolean);
            // Remove duplicates
            allTags = allTags.filter(function (item, pos) {
               return allTags.indexOf(item) === pos;
            });

            validLength = allTags.every(function (elem, i) { return elem.length > 1; });

            if (validLength) {
               ctrl.$setValidity('tagsLengthValidator', true);
            } else {
               ctrl.$setValidity('tagsLengthValidator', false);
            }

            return allTags;
         }

         // we need to add our customValidator function to an array of other(build-in or custom) functions
         // I have not notice any performance issues, but it would be worth investigating how much
         // effect does this have on the performance of the app
         ctrl.$parsers.push(customValidator);

         function customFormatter(ngModelValue) {
            if (ngModelValue) {
               return ngModelValue.join(" ");
            } else {
               return ngModelValue;
            }
         }
          ctrl.$formatters.push(customFormatter);
      }
   };
});
*/

// Validate YouTube input
// OK : https://youtu.be/bdnA1fYFwNY
// OK : https://www.youtube.com/watch?v=bdnA1fYFwNY
// OK : bdnA1fYFwNY
angular.module('video').directive('youtubeVid', function () {
   return {

      // limit usage to argument only
      restrict: 'A',

      // require NgModelController, i.e. require a controller of ngModel directive
      require: 'ngModel',

      // create linking function and pass in our NgModelController as a 4th argument
      link: function (scope, element, attr, ctrl) {
         // please note you can name your function & argument anything you like
         function customValidator(ngModelValue) {
            var videoId = ngModelValue.trim(),
                paramIndex;

            ctrl.$setValidity('youtubeVideoId', false);

            if (videoId.length === 11) {
               // OK : bdnA1fYFwNY
               ctrl.$setValidity('youtubeVideoId', true);
            } else {
               paramIndex = videoId.lastIndexOf("v=");
               if (paramIndex > -1) {
                  videoId = videoId.substr(paramIndex + 2, 11);
                  if (videoId.length === 11) {
                     // OK : https://www.youtube.com/watch?v=bdnA1fYFwNY
                     ctrl.$setValidity('youtubeVideoId', true);
                  }
               } else {
                  paramIndex = videoId.lastIndexOf("youtu.be");
                  if (paramIndex > -1) {
                     videoId = videoId.substr(paramIndex + 9, 11);
                     if (videoId.length === 11) {
                        // OK : https://youtu.be/bdnA1fYFwNY
                        ctrl.$setValidity('youtubeVideoId', true);
                     }
                  }
               }
            }
            // we need to return our ngModelValue, to be displayed to the user(value of the input)
            return videoId;
         }

         // we need to add our customValidator function to an array of other(build-in or custom) functions
         // I have not notice any performance issues, but it would be worth investigating how much
         // effect does this have on the performance of the app
         ctrl.$parsers.push(customValidator);
      }
   };
});
