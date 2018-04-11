var Stats = require('./stats'),
    Images = require('./images'),
    Comments = require('./comments');

module.exports = {
    sb: function(viewModel, callback){
        viewModel.sidebar = {
            stats: Stats(),
            popular: Images.popular(),
            comments: Comments.newest()
        };
        callback(viewModel);
    }
}
