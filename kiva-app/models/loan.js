var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    Cindex =require('./cindex');

mongoose.set('debug', true);

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
}, {toJSON: {virtuals:true}, toObject:{virtuals:true}});

loanSchema.virtual('corruption', {
    ref:'corrupt',
    localField: 'location.country',
    foreignField: 'Country',
    justOne: true
});

loanSchema.pre('find',function() {
    this.populate('corruption');
});

module.exports = mongoose.model('Loans', loanSchema);