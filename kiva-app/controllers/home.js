var LoanModel = require('../models').Loan;
var ciModel = require('../models').corrupt;

module.exports = {
    index: function(req,res) {
        var viewModel = {
            loans:[]
        };

        LoanModel.find({},{},{limit: 4, sort:{timestamp:-1}}).exec(function(error, loans) {
                if(error){throw error;}

                for (var i = 0; i<loans.length; i++) {
                    viewModel.loans[i]=loans[i].toObject();
                }
                res.render('index',viewModel);
        });
    }
};