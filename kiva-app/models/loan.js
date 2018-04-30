var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    Cindex =require('./cindex');

mongoose.set('debug', true); // shows calls against mongoDB. Should be turned off in prod.

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
}, {
    toJSON: {virtuals:true},  //allows virtual attributes to show up when doing toJSON calls
    toObject:{virtuals:true} // allows virtuals to show up when doing toObject calls
});

//definition of virtual object
loanSchema.virtual('corruption', {
    ref:'corrupt', //name of the model exported
    localField: 'location.country', //what from loans collection to join on
    foreignField: 'Country', //what from corrupt collection to join on
    justOne: true
});

loanSchema.pre('find',function() {
    this.populate('corruption');
});

module.exports = mongoose.model('Loans', loanSchema);