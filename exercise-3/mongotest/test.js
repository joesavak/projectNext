var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    var db = client.db('mongotest');    
    console.log('Connected to MongoDB!');

    db.collection("testing").insertOne({'title':'BOOOOK'}, function(err,res) {
        //console.log(res);
        console.log(res.result.n + ' record insereted.');
        //console.log(docs[0].title + ' - ' + docs[0]._id);
        db.collection("testing").find({title: 'BOOOOK'}).toArray(function(err, doc) {
            console.log(doc[0]._id + ' - ' + doc[0].title)
        })
        //client.close();
    })
});


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/mongtest');
mongoose.connection.on('open',function() { 
    console.log('Mongoose connected');
});

var Account = new Schema ( {
    username: {type: String},
    date_created: {type: Date, default: Date.now},
    visits: {type: Number, default: 0},
    active: {type: Boolean, default: false},
    age: {type: Number, require: true, min: 13, max: 120}
});

var AccountModel = mongoose.model('Account', Account);
var newUser = new AccountModel({username: 'randomUser'});
newUser.save();
//console.log(newUser.username);
//console.log(newUser.date_created);
//console.log(newUser.visits);
//console.log(newUser.active);
