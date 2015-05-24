var MyTubesLib = {
   "util": {
      "allMatchInArray" : function(targetArray, checkedArray) {
          console.log("allMatchInArray ", checkedArray, " ", targetArray);
          return checkedArray.every(function (elem) {
            return targetArray.indexOf(elem) >= 0;
          });
      }
   },
   "business" : {
      "normalizeVideo" : function(video, $sce) {
         video.trustedVideo = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video.ref + "?autoplay=1");
         video.trustedImg = $sce.trustAsResourceUrl("https://i.ytimg.com/vi/" + video.ref + "/mqdefault.jpg");
         return video;
      }
   }
};
