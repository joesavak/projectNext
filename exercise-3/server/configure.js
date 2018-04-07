var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cp = require('cookie-parser');
var cookieSession = require('cookie-session');
var bp = require('body-parser');
var hb=require('express3-handlebars');
var override=require('method-override');
var errorHandler = require('errorhandler')

module.exports = function(app) {
    //config code
    
    app.engine('handlebars', hb.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials']
    }).engine);
    app.set('view engine','hb');
    //page 64
    app.use(logger('dev'));
    app.use(bp.json());
    app.use(bp.urlencoded({extended: true}));
    //app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
    app.use(override());
    app.use(cp('Super secret passphrase'));
    app.use('/public/', express.static(path.join(__dirname, '../public')));
    //routes here
    //app.get('/', routes.index);
    //app.get('/users', user.list);
    // routes above
    if (app.get('env') === 'development') {
        app.use(errorHandler())
      }
    return app;
}