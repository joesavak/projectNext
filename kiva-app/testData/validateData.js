'use strict'
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autopopulate = require('mongoose-autopopulate');

    //connect to local datastore
mongoose.connect('mongodb://localhost/kivaDB');
mongoose.connection.on('open', function () {
    console.log('Mongoose connected');
});
mongoose.set('debug', true);

//set schema, based on https://transform.now.sh/json-to-mongoose
var loanSchema = new Schema({
    loans: {
        id: {
            type: 'Number'
        },
        name: {
            type: 'String'
        },
        description: {
            languages: {
                type: [
                    'String'
                ]
            }
        },
        status: {
            type: 'String'
        },
        funded_amount: {
            type: 'Number'
        },
        basket_amount: {
            type: 'Number'
        },
        image: {
            id: {
                type: 'Number'
            },
            template_id: {
                type: 'Number'
            }
        },
        activity: {
            type: 'String'
        },
        sector: {
            type: 'String'
        },
        themes: {
            type: [
                'String'
            ]
        },
        use: {
            type: 'String'
        },
        location: {
            country_code: {
                type: 'String'
            },
            country: { type: 'String'},
            town: {
                type: 'String'
            },
            geo: {
                level: {
                    type: 'String'
                },
                pairs: {
                    type: 'String'
                },
                type: {
                    type: 'String'
                }
            }
        },
        partner_id: {
            type: 'Number'
        },
        posted_date: {
            type: 'Date'
        },
        planned_expiration_date: {
            type: 'Date'
        },
        loan_amount: {
            type: 'Number'
        },
        borrower_count: {
            type: 'Number'
        },
        lender_count: {
            type: 'Number'
        },
        bonus_credit_eligibility: {
            type: 'Boolean'
        },
        tags: {
            type: 'Array'
        }
    }
}, {
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});

var corruptSchema = new Schema({
    corrupts: {
        Country : {
            type: 'String'
        },
        ISO3: {
            type: 'String'
        },
        Region: {
            type: 'String'
        },
        CPI_score_2017: {
            type: 'Number'
        },
        CPI_score_2016: {
            type: 'Number'
        },
        CPI_score_2015: {
            type: 'Number'
        },
        CPI_score_2014: {
            type: 'Number'
        },
        CPI_score_2013: {
            type: 'Number'
        },
        CPI_score_2012: {
            type: 'Number'
        }
    }
});

loanSchema.virtual('corruption', {
    ref:'corrupt',
    localField: 'location.country',
    foreignField: 'Country',
    justOne: true
});

var corrupt =mongoose.model('corrupt',corruptSchema);


//set the models
loanSchema.pre('find',function() {
    this.populate('corruption');
});
//loanSchema.plugin(autopopulate);

var loanModel = mongoose.model('Loan', loanSchema);
//module.exports = mongoose.model('Loans', loan);
//perform search - similar to select * from loans limit 5;
loanModel.find({},{},{limit: 1, sort:{timestamp:-1}}).exec(function(error, loans) {
                if(error){throw error;}
                //var loanitem = ls[i].toObject();

                console.log("join virtual populate test::");

                for (var i = 0; i<loans.length; i++) {
                    var ln = loans[i].toObject();
                    console.log(ln);
                    //viewModel.loans[i]=loans[i].toObject();
                    //console.log(loans[i].toObject());
                }
            });
        
    
    

        