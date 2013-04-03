exports.index = function(req, res){
  res.render('index', 
  	{ title: 'Home' });
};

exports.about = function(req, res){
  res.render('about', 
  	{ title: 'About' });
};

exports.search = function(req, res){
  res.render('search', 
  	{ title: 'Search' });
};

exports.games = function(req, res){
  res.render('games', 
  	{ title: 'Games' });
};

exports.act = function(req, res){
  res.render('act', 
  	{ title: 'ACT' });
};

exports.login = function(req, res){
  res.render('login', 
  	{ title: 'Login' });
};
