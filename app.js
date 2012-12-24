
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , wine = require('./routes/wines')
  , producer = require('./routes/producers')
  , region = require('./routes/regions')
  , http = require('http')
  , path = require('path');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
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
app.get('/users', user.list);

app.post('/login',user.login);
app.get('/login',user.loginView);
app.get('/logout',user.logout);
app.get('/producers',producer.list);
app.get('/producers/add',producer.add);


//WINES
app.get('/wines/add',wine.add);
app.post('/wines/add',wine.adder);
app.get('/wines',wine.list);
app.get(new RegExp('/wines/edit/'),wine.edit);
app.post(new RegExp('/wines/edit/'),wine.editor);
app.get(new RegExp('/wines/view/'),wine.view);
//REGIONS
app.get('/regions/add',region.addView);
app.post('/regions/add',region.add);
app.post(new RegExp('/regions/edit/'),region.editor);
app.get('/regions',region.list);
app.get(new RegExp('/regions/edit/'),region.edit);
app.get(new RegExp('/regions/view/'),region.view);
app.get(new RegExp('/regions/delete/'),region.delete);

//PRODUCERS
app.get('/producers',producer.list);
app.get('/producers/add',producer.add);
app.post('/producers/add',producer.adder);
app.get(new RegExp('/producers/view/'),producer.view);
app.post('/producers/producerImageAdder',producer.imageAdder);
app.get(new RegExp('/producers/edit'),producer.edit);
app.post(new RegExp('/producers/edit'),producer.editor);
app.get(new RegExp('/producers/deletes'),producer.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
