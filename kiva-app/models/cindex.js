var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path');

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


module.exports = mongoose.model('corrupt', corruptSchema);