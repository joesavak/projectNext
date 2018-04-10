var routes=require('./routes');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cp = require('cookie-parser');
var cookieSession = require('cookie-session');
var bp = require('body-parser');
var exphbs=require('express3-handlebars');
var override=require('method-override');
var errorHandler = require('errorhandler')
var moment= require('moment');

module.exports = function(app) {
    //config code
    
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: function(timestamp) {
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine','handlebars');
    //page 64
    app.use(logger('dev'));
    app.use(bp({
            uploadDir:path.join(__dirname,'../public/upload/temp'), extended:true
    }));
    app.use(bp.json());
    app.use(bp.urlencoded({extended: true}));
    app.use(favicon(path.join(__dirname, '/public/darth-minion.ico')));
    app.use(override());
    app.use(cp('Super secret passphrase'));
    ;
    //routes here
    //app.get('/', routes.index);
    //app.get('/users', user.list);
    // routes above
 
     routes.initialize(app, new express.Router);
     app.use('/public/', express.static(path.join(__dirname, '../public')))
      // app.get('/', routes.index);
      if (app.get('env') === 'development') {
        app.use(errorHandler())
      }
    return app;
}