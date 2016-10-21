var request = require('request');
var url = 'http://cdn.gfkdaphne.com/tests/async.php?a=';

/**
 * Solution 1: With code duplication but without async package usage
 */

request(url + '1', function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var contentToPrint = body;
    request(url + '2', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        contentToPrint = contentToPrint + ' ' + body;
        console.log(contentToPrint);
      }
    });
  }
});

/**
 * Solution 2: Without code duplication but with async package usage
 */
var async = require('async');
async.concatSeries([1,2], function(paramValue, callback){
    request(url + paramValue, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        callback(null, body);
      }
    });
  },
  function(err, result){
    console.log(result.join(' '));
  });