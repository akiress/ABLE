var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');

module.exports = function(app) {
  app.get('/games', function(req, res) {
    res.render('games', 
      { title: 'Games' });
  });

  app.get('/act', function(req, res) {
    res.render('act', 
      { title: 'ACT' });
  });

  app.get('/math1', function(req, res) {
    res.render('math1', 
      { title: 'Math1' });
  });

  app.get('/search', function(req, res) {
    console.log('GET Search')
    res.render('search', 
      { title: 'Search' });
  });

  // app.get('*', function(req, res) { 
  //  res.render('404', 
  //    { title: 'Page Not Found'}); 
  // });

  app.get('/', function(req, res){
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

  app.post('/', function(req, res) {
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

  app.get('/home', function(req, res) {
      if (req.session.user == null){
          res.redirect('/');
      } else {
      res.render('home', {
        title : 'Home',
        udata : req.session.user
      });
      }
  });

  app.post('/home', function(req, res){
    if (req.param('user') != undefined) {
      AM.updateAccount({
        user    : req.param('user'),
        name    : req.param('name'),
        email     : req.param('email'),
        pass    : req.param('pass')
      }, function(e, o){
        if (e){
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

  app.get('/signup', function(req, res) {
    res.render('signup', {  title: 'Signup'});
  });

  app.post('/signup', function(req, res){
    AM.addNewAccount({
      name  : req.param('name'),
      email   : req.param('email'),
      user  : req.param('user'),
      pass  : req.param('pass'),
    }, function(e){
      if (e){
        res.send(e, 400);
      } else{
        res.send('ok', 200);
      }
    });
  });

  app.post('/lost-password', function(req, res){
    AM.getAccountByEmail(req.param('email'), function(o){
      if (o){
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

  app.get('/reset-password', function(req, res) {
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

  app.post('/reset-password', function(req, res) {
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

  app.get('/about', function(req, res) {
    if (req.session.user == null){
          res.redirect('/');
          console.log('Redirecting');
      } else {
      res.render('about', {
        title : 'About',      
        udata : req.session.user });
      }
  });

    app.get('/math1', function(req, res) {
    if (req.session.user == null){
      res.redirect('/');
    } else {
      res.render('math1', {
        title : 'Math ACT Prep Test',
        udata : req.session.user
      });
    }
  });

  app.get('/search', function(req, res) {
    if (req.session.user == null){
      res.redirect('/');
    } else {
      res.render('search', {
        title : 'Search',
        udata : req.session.user
      });
    }
  });
};
// var AM = require('./modules/account-manager');
// var EM = require('./modules/email-dispatcher');

// module.exports = function(app) {
//   // main login page //
//   app.get('/', function(req, res){
//     if (req.cookies.user == undefined || req.cookies.pass == undefined){
//       res.render('login', { title: 'Login' });
//     }	else{
//       AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
//         if (o != null){
//           req.session.user = o;
//         }	else{
//           res.render('login', { title: 'Login' });
//         }
//       });
//     }
//   });

//   app.post('/', function(req, res) {
//     AM.manualLogin(req.param('user'), req.param('pass'), function(e, o){
//       if (!o) {
//         res.send(e, 400);
//       } else {
//         req.session.user = o;
//         if (req.param('remember-me') == 'true') {
//           res.cookie('user', o.user, { maxAge: 900000 });
//           res.cookie('pass', o.pass, { maxAge: 900000 });
//         }
//         res.send(o, 200);
//       }
//     });
//   });

//   // logged-in user homepage //
//   app.get('/home', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('home', {
//         title : 'Control Panel',
//         udata : req.session.user
//       });
//     }
//   });

//   app.post('/home', function(req, res){
//     if (req.param('user') != undefined) {
//       AM.updateAccount({
//         user 		: req.param('user'),
//         name 		: req.param('name'),
//         email 		: req.param('email'),
//         pass		: req.param('pass')
//       }, function(e, o){
//         if (e){
//           res.send('error-updating-account', 400);
//         }	else {
//           req.session.user = o;
//           if (req.cookies.user != undefined && req.cookies.pass != undefined){
//             res.cookie('user', o.user, { maxAge: 900000 });
//             res.cookie('pass', o.pass, { maxAge: 900000 });	
//           }
//           res.send('ok', 200);
//         }
//       });
//     }	else if (req.param('logout') == 'true'){
//       res.clearCookie('user');
//       res.clearCookie('pass');
//       req.session.destroy(function(e){ res.send('ok', 200); });
//     }
//   });

//   app.get('/signup', function(req, res) {
//     res.render('signup', {  title: 'Signup'});
//   });

//   app.post('/signup', function(req, res){
//     AM.addNewAccount({
//       name 	: req.param('name'),
//       email 	: req.param('email'),
//       user 	: req.param('user'),
//       pass	: req.param('pass'),
//     }, function(e){
//       if (e){
//         res.send(e, 400);
//       }	else{
//         res.send('ok', 200);
//       }
//     });
//   });

//   app.post('/lost-password', function(req, res){
//     AM.getAccountByEmail(req.param('email'), function(o){
//       if (o){
//         res.send('ok', 200);
//         EM.dispatchResetPasswordLink(o, function(e, m){
//           if (!e) {
//             //	res.send('ok', 200);
//           }	else{
//             res.send('email-server-error', 400);
//             for (k in e) console.log('error : ', k, e[k]);
//           }
//         });
//       }	else{
//         res.send('email-not-found', 400);
//       }
//     });
//   });

//   app.get('/reset-password', function(req, res) {
//     var email = req.query["e"];
//     var passH = req.query["p"];
//     AM.validateResetLink(email, passH, function(e){
//       if (e != 'ok'){
//         res.redirect('/');
//       } else{
//         req.session.reset = { email:email, passHash:passH };
//         res.render('reset', { title : 'Reset Password' });
//       }
//     })
//   });

//   app.post('/reset-password', function(req, res) {
//     var nPass = req.param('pass');
//     var email = req.session.reset.email;
//     req.session.destroy();
//     AM.updatePassword(email, nPass, function(e, o){
//       if (o){
//         res.send('ok', 200);
//       }	else{
//         res.send('unable to update password', 400);
//       }
//     })
//   });

//   app.get('*', function(req, res) { 
//   	res.render('404', 
//   		{ title: 'Page Not Found'}); 
//   });

//   app.get('/about', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('about', {
//         title : 'About',
//         udata : req.session.user
//       });
//     }
//   })

//   app.get('/gentips', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('gentips', {
//         title : 'General Tips',
//         udata : req.session.user
//       });
//     }
//   });

//   app.get('/gentuts', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('gentuts', {
//         title : 'General Tutorials',
//         udata : req.session.user
//       });
//     }
//   });

//   app.get('/engtips', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('engtips', {
//         title : 'English Tips',
//         udata : req.session.user
//       });
//     }
//   });

//   app.get('/engtuts', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('engtuts', {
//         title : 'English Tutorials',
//         udata : req.session.user
//       });
//     }
//   });

//   app.get('/mathtips', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('mathtips', {
//         title : 'Math Tips',
//         udata : req.session.user
//       });
//     }
//   });

//   app.get('/mathtuts', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('mathtuts', {
//         title : 'Math Tutorials',
//         udata : req.session.user
//       });
//     }
//   });

//   app.get('/scitips', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('scitips', {
//         title : 'Science Tips',
//         udata : req.session.user
//       });
//     }
//   });

//   app.get('/scituts', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('scituts', {
//         title : 'Science Tutorials',
//         udata : req.session.user
//       });
//     }
//   });

//   app.get('/readtips', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('readtips', {
//         title : 'Reading Tips',
//         udata : req.session.user
//       });
//     }
//   });

//   app.get('/readtuts', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('readtuts', {
//         title : 'Reading Tutorials',
//         udata : req.session.user
//       });
//     }
//   });

//   app.get('/esstips', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('esstips', {
//         title : 'Essay Tips',
//         udata : req.session.user
//       });
//     }
//   });

//   app.get('/esstuts', function(req, res) {
//     if (req.session.user == null){
//       res.redirect('/');
//     } else {
//       res.render('esstuts', {
//         title : 'Essay Tutorials',
//         udata : req.session.user
//       });
//     }
//   });

//   app.get('/math1', function(req,res) {
//     res.render('math1', 
//       { title : 'Math ACT Prep Test'});
//   });

//   app.get('/search', function(req, res) {
//     res.render('search', { title: 'Search' });
//   });
// };
