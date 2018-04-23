var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    //connect to local datastore
mongoose.connect('mongodb://localhost/kivaDB');
mongoose.connection.on('open', function () {
    console.log('Mongoose connected');
});

//set schema, based on https://transform.now.sh/json-to-mongoose
var loan = new Schema({
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
            country: {
                type: 'String'
            },
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
});

//set the model
var loanModel = mongoose.model('Loan', loan);

//perform search - similar to select * from loans limit 5;
loanModel.find({},{},{limit:5,sort:{timestamp:-1}},
    function(err,ls) {
        if(err){throw err;}
        //print out to make sure we got 5 back
        console.log(ls.length);
        
        //iterate through the 5 and print specific items from the data-set for spot-checking
        for (var i = 0; i<ls.length; i++) {
            var loanitem = ls[i].toObject();
            console.log(loanitem.id);
            console.log(loanitem.loan_amount);
            console.log(loanitem.name);
        }
    });
