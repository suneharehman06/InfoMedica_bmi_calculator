var geoOptions = {
   enableHighAccuracy: true,
   timeout: 5000,
   maximumAge: 0
};

var _getLocation = function() {

   // https://github.com/onury/geolocator
   geolocator.locate(_geoSuccess, _geoError, true, geoOptions);

};

var _geoSuccess = function(response) {

  // console.log('Geo success');

  _requestData('/_ajax/geo', response, '#latest_news_list');
};

var _geoError = function(response) {

   // console.log('Geo failed');

   _requestData('/_ajax/default_news', response, '#latest_news_list');
};

var _requestData = function(url, response) {

   // console.log(url);

   $.ajax({
       url: url,
       data: response,
       dataType: 'html',
       success: function(data, textStatus, jqXHR) {
           if (textStatus === 'success') {
              $('#latest_news_list').html(data);
           } else {
               _geoError();
           }
       }
   });

};

var _reRequestData = function(url) {

   console.log(url);

   $.ajax({
       url: url,
       dataType: 'html',
       success: function(data, textStatus, jqXHR) {
           if (textStatus === 'success') {
              $('#latest_news_list').html(data);
           } else {
               _geoError();
           }
       }
   });
};
