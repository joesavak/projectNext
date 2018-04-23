var LoanModel = require('../models').Loan;

module.exports = {
    index: function(req,res) {
        var viewModel = {
            loans:[]
        };
        LoanModel.find({},{},{limit: 5, sort:{timestamp:-1}},
            function(err,loans) {
                if(err){throw err;}
                //var loanitem = ls[i].toObject();

                console.log("Here!!");

                for (var i = 0; i<loans.length; i++) {
                    viewModel.loans[i]=loans[i].toObject();
                }

                //viewModel.loans = loans;
                //sidebar.sb(viewModel, function(viewModel) {
                res.render('index',viewModel);
                //});
            });
    }
};