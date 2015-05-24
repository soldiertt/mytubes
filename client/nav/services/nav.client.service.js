angular.module('video').factory('NavigationResource', ['$resource',
    function ($resource) {
        return $resource('api/tags');
    }
]);

angular.module('video').factory('NavTagsService', function() {

   var service = {};

   service.navtags = [];
   service.availableTags = [];
   service.selectedTagNames = [];

   return {
      setNavtags: function(navtags) {
         service.navtags = navtags;
      },
      getNavtags: function() {
         return service.navtags;
      },
      setAvailableTags: function(availableTags) {
         service.availableTags = availableTags;
         service.navtags.forEach(function(navtag, i, navtags) {
            var j,
                available = false;
            for (j = 0; j < availableTags.length; j=j+1) {
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
      },
      getSelectedTagNames: function() {
         return service.selectedTagNames;
      },
      removeSelectedTagName: function(tagName) {
         service.selectedTagNames.splice(service.selectedTagNames.indexOf(tagName), 1);
      },
      addSelectedTagName: function(tagName) {
         service.selectedTagNames.push(tagName);
      }
   };

});
