var express = require('express'),
app = express();
app.use('/', express.static('public'));
var listener = app.listen(8888, function(){
  console.log("Application listening on port %d", listener.address().port);
});