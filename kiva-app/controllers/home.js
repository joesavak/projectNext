var LoanModel = require('../models').Loan;
var ciModel = require('../models').corrupt;

module.exports = {
    index: function(req,res) {
        var viewModel = {
            loans:[]
        };

        LoanModel.find({},{},{limit: 3, sort:{timestamp:-1}}).exec(function(error, loans) {
                if(error){throw error;}

                for (var i = 0; i<loans.length; i++) {
                    //ln = loans[i].toObject();
                    //console.log(ln);
                    viewModel.loans[i]=loans[i].toObject();
                    //console.log(loans[i].toObject());
                }

                //viewModel.loans = loans;
                //sidebar.sb(viewModel, function(viewModel) {
                res.render('index',viewModel);
                //});
            });
    }
};