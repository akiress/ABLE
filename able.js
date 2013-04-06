var express = require('express');
var http = require('http');
var able = express();
var path = require('path');

able.configure(function() {
	able.set('port', 8080);
	able.set('views', __dirname + '\\able\\server\\views');
	able.set('view engine', 'jade');
	able.locals.pretty = true;
	able.use(express.favicon());
	able.use(express.logger('dev'));
	able.use(express.bodyParser());
	able.use(express.cookieParser());
	able.use(express.session({ secret: 'secret' }));
	able.use(express.methodOverride());
	//able.use(require('stylus').middleware({ src: __dirname + '/able/public' }));
	able.use(express.static(__dirname + '/able/public'));
});

able.configure('development', function(){
	able.use(express.errorHandler());
});

require('./able/server/router')(able);

http.createServer(able).listen(able.get('port'), function() {
	console.log("Express server listening on port " + able.get('port'));
})