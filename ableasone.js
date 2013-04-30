var express = require('express');
var able = express();
var server = require('http').createServer(able);
var path = require('path');
var io = require('socket.io').listen(server);

able.configure(function(){
  able.set('port', 8080);
  able.set('views', __dirname + '/able/server/views');
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

var AM = require('./able/server/modules/account-manager');
var EM = require('./able/server/modules/email-dispatcher');

able.get('/', function(req, res){
  if (req.cookies.user == undefined || req.cookies.pass == undefined){
    res.render('login', { title: 'Login' });
  } else{
    AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
      if (o != null){
        req.session.user = o;
      } else{
        res.render('login', { title: 'Login' });
      }
    });
  }
});

able.post('/', function(req, res) {
  AM.manualLogin(req.param('user'), req.param('pass'), function(e, o){
    if (!o) {
      res.send(e, 400);
    } else {
      req.session.user = o;
      if (req.param('remember-me') == 'true') {
        res.cookie('user', o.user, { maxAge: 900000 });
        res.cookie('pass', o.pass, { maxAge: 900000 });
      }
      res.send(o, 200);
    }
  });
});

able.get('/home', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('home', {
      title : 'Home',
      udata : req.session.user
    });
  }
});

able.post('/home', function(req, res){
  if (req.param('user') != undefined) {
    AM.updateAccount({
      user        : req.param('user'),
      name        : req.param('name'),
      email       : req.param('email'),
      pass        : req.param('pass'),
    }, function(e, o){
      if (e) {
        res.send('error-updating-account', 400);
      } else {
        req.session.user = o;
        if (req.cookies.user != undefined && req.cookies.pass != undefined){
          res.cookie('user', o.user, { maxAge: 1000 });
          res.cookie('pass', o.pass, { maxAge: 1000 }); 
        }
        res.send('ok', 200);
      }
    });
  } else if (req.param('logout') == 'true'){
    res.clearCookie('user');
    res.clearCookie('pass');
    req.session.destroy(function(e){ res.send('ok', 200); });
  }
});

able.get('/signup', function(req, res) {
  res.render('signup', {  title: 'Signup'});
});

able.post('/signup', function(req, res){
  AM.addNewAccount({
    name        : req.param('name'),
    email       : req.param('email'),
    user        : req.param('user'),
    pass        : req.param('pass'),
    mathscores  : [],
    sciscores   : [],
    engscores   : [],
    rdscores    : [],
  }, function(e){
    if (e){
      res.send(e, 400);
    } else{
      res.send('ok', 200);
    }
  });
});

able.post('/lost-password', function(req, res){
  AM.getAccountByEmail(req.param('email'), function(o){
    if (o) {
      res.send('ok', 200);
      EM.dispatchResetPasswordLink(o, function(e, m){
        if (!e) {
          //  res.send('ok', 200);
        } else{
          res.send('email-server-error', 400);
          for (k in e) console.log('error : ', k, e[k]);
        }
      });
    } else{
      res.send('email-not-found', 400);
    }
  });
});

able.get('/reset-password', function(req, res) {
  var email = req.query["e"];
  var passH = req.query["p"];
  AM.validateResetLink(email, passH, function(e){
    if (e != 'ok'){
      res.redirect('/');
    } else{
      req.session.reset = { email:email, passHash:passH };
      res.render('reset', { title : 'Reset Password' });
    }
  })
});

able.post('/reset-password', function(req, res) {
  var nPass = req.param('pass');
  var email = req.session.reset.email;
  req.session.destroy();
  AM.updatePassword(email, nPass, function(e, o){
    if (o){
      res.send('ok', 200);
    } else{
      res.send('unable to update password', 400);
    }
  })
});

able.get('/about', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('about', {
      title : 'About',      
      udata : req.session.user });
  }
});

able.get('/math1', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('math1', {
      title : 'Math ACT Prep Test',
      udata : req.session.user
    });
  }
});

able.get('/search', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('search', {
      title : 'Search',
      udata : req.session.user
    });
  }
});

able.get('/gentips', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('gentips', {
      title : 'General Tips',
      udata : req.session.user
    });
  }
});

able.get('/gentuts', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('gentuts', {
      title : 'General Tutorials',
      udata : req.session.user
    });
  }
});

able.get('/engtips', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('engtips', {
      title : 'English Tips',
      udata : req.session.user
    });
  }
});

able.get('/engtuts', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('engtuts', {
      title : 'English Tutorials',
      udata : req.session.user
    });
  }
});

able.get('/mathtips', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('mathtips', {
      title : 'Math Tips',
      udata : req.session.user
    });
  }
});

able.get('/mathtuts', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('mathtuts', {
      title : 'Math Tutorials',
      udata : req.session.user
    });
  }
});

able.get('/scitips', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('scitips', {
      title : 'Science Tips',
      udata : req.session.user
    });
  }
});

able.get('/scituts', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('scituts', {
      title : 'Science Tutorials',
      udata : req.session.user
    });
  }
});

able.get('/readtips', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('readtips', {
      title : 'Reading Tips',
      udata : req.session.user
    });
  }
});

able.get('/readtuts', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('readtuts', {
      title : 'Reading Tutorials',
      udata : req.session.user
    });
  }
});

able.get('/esstips', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('esstips', {
      title : 'Essay Tips',
      udata : req.session.user
    });
  }
});

able.get('/esstuts', function(req, res) {
  if (req.session.user == null){
    res.redirect('/');
  } else {
    res.render('esstuts', {
      title : 'Essay Tutorials',
      udata : req.session.user
    });
  }
});

able.get('/scores', function(req, res) {
  if (req.session.user == null) {
    res.redirect('/');
  } else {
    res.render('scores', {
      title : 'ACT Scores',
      udata : req.session.user
    });
  }
});

able.get('*', function(req, res) { 
  res.render('404', { title: 'Page Not Found'}); 
});

//require('./able/server/router')(able);

server.listen(able.get('port'), function(){
  console.log("Express server listening on port " + able.get('port'));
})

io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');
io.set('log level', 1);

io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

io.on('connection', function(client) {
  client.on('pageID', function(data) {
    if (data == 'page1') {
      console.log('Page 1 has connected.');
      //clients['page1'] = client.id;
      //console.log(clients);
    }
  });

  client.on('message', function(data) {
    console.log('Client sent message', data.screen, data.status);
    client.broadcast.emit(data.screen, data.status);
  });

  client.on('disconnect', function(client) {
    console.log('Client has disconnected');
  });
});
