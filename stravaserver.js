var StravaApiV3 = require('strava_api_v3');
var defaultClient = StravaApiV3.ApiClient.instance;

// Configure OAuth2 access token for authorization: strava_oauth
var strava_oauth = defaultClient.authentications['strava_oauth'];
strava_oauth.accessToken = "499adc84c042da36a49cbabe447f400122b94d97"

var api = new StravaApiV3.AthletesApi()

var id = 56; // {Integer} The identifier of the athlete. Must match the authenticated athlete.

var opts = {
  'page': 56, // {Integer} Page number.
  'perPage': 56 // {Integer} Number of items per page. Defaults to 30.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.getStats(id, opts, callback);
