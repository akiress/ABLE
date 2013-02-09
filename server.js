var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function(req, res) {
  console.log('Request to "/" ...');
  var layout = parseUA(req.headers['user-agent']);
  console.log(layout);
  res.contentType('text/html');

  if (layout == 'tablet') {
    res.sendfile(__dirname + '/pages/tablet.html');
  } else if (layout == 'sp') {
    res.sendfile(__dirname + '/pages/phone.html');
  } else res.sendfile(__dirname + '/index.html');
});

app.use(express.bodyParser());
app.use('/', express.static(__dirname + '/'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/content', express.static(__dirname + '/content'));
app.use('/video-dbase-excerpt_files', express.static(__dirname + '/video-dbase-excerpt_files'));
app.use('/themes', express.static(__dirname + '/themes'));
app.use('/pages', express.static(__dirname + '/pages'));

io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');
//io.set('log level', 3);
io.set('log level', 1);

io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

io.sockets.on('connection', function(socket) {
  //console.log('got socket.io connection - id: %s', socket.id);
  //var assembler = new StreamAssembler(keys, socket, redisClient);

  socket.on('disconnect', function() {
    // needs to be stopped explicitly or it will continue
    // listening to redis for updates.
    //if(assembler)
    //    assembler.stop();
  });

  socket.on('video', function(data) {
    socket.broadcast.emit('video', data);
    console.log(data);
  });

  socket.on('all', function(data) {
    socket.broadcast.emit('all', data);
    console.log(data);
  });
});

function parseUA(agent) {
  console.log(agent);
  if (agent.match(/Windows/i)) {
    //console.log('Windows');
    return 'desktop';
  } else if (agent.match(/iPhone/i)) {
    //console.log('iPhone');
    return 'phone';
  } else if (agent.match(/iPad/i)) {
    //console.log('iPad');
    return 'tablet';
  } else if (agent.match(/Android/i) && agent.match(/Linux/) && agent.match(/GT/i)) {
    //console.log('Samsung Galaxy 2 Tablet');
    return 'tablet';
  } else if (agent.match(/Android/i) && agent.match(/Linux/i) && agent.match(/HTC|Desire|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i)) {
    //console.log('Desire HD Phone');
    return 'sp';
  } else console.log('Dunno');
};
