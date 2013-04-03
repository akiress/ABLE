var express = require('express')
var routes = require('./routes')
var user = require('./routes/user')
var http = require('http')
var path = require('path');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/search', routes.search);
app.get('/games', routes.games);
app.get('/act', routes.act);
app.get('/login', routes.login);
app.get('/math1', routes.math1);
app.get('/users', user.list);

// var CT = require('./modules/country-list');
var AM = require('./modules/accountsDB');
//var EM = require('./modules/email-dispatcher');

app.get('/login', function(req, res){
// check if the user's credentials are saved in a cookie //
  if (req.cookies.user == undefined || req.cookies.pass == undefined){
    res.render('/login', { title: 'Hello - Please Login To Your Account' });
  } else{
// attempt automatic login //
    AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
      if (o != null){
          req.session.user = o;
        res.redirect('/');
      } else{
        res.render('/login', { title: 'Hello - Please Login To Your Account' });
      }
    });
  }
});

app.post('/login', function(req, res){
  AM.manualLogin(req.param('user'), req.param('pass'), function(e, o){
    if (!o){
      res.send(e, 400);
    } else{
        req.session.user = o;
      if (req.param('remember-me') == 'true'){
        res.cookie('user', o.user, { maxAge: 900000 });
        res.cookie('pass', o.pass, { maxAge: 900000 });
      }
      res.send(o, 200);
    }
  });
});

app.get('/', function(req, res) {
    if (req.session.user == null){
        res.redirect('/');
    } else {
    res.render('/', {
      title : 'Control Panel',
      udata : req.session.user
    });
    }
});

app.post('/', function(req, res){
  if (req.param('user') != undefined) {
    AM.updateAccount({
      user    : req.param('user'),
      name    : req.param('name'),
      email     : req.param('email'),
      country   : req.param('country'),
      pass    : req.param('pass')
    }, function(e, o){
      if (e){
        res.send('error-updating-account', 400);
      } else{
        req.session.user = o;
    // update the user's login cookies if they exists //
        if (req.cookies.user != undefined && req.cookies.pass != undefined){
          res.cookie('user', o.user, { maxAge: 900000 });
          res.cookie('pass', o.pass, { maxAge: 900000 }); 
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

app.get('/signup', function(req, res) {
  res.render('signup', {  title: 'Signup'});
});

app.post('/signup', function(req, res){
  AM.addNewAccount({
    name  : req.param('name'),
    email   : req.param('email'),
    user  : req.param('user'),
    pass  : req.param('pass'),
    country : req.param('country')
  }, function(e){
    if (e){
      res.send(e, 400);
    } else{
      res.send('ok', 200);
    }
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
