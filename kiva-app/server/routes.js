var home = require('../controllers/home');
    //loan = require('../controllers/loan');

module.exports.initialize = function(app, router) {
    app.get('/', home.index);
    //app.get('/loans/:loan_id', loan.index);
    
    app.use('/', router);
}