var MongoClient = require('mongodb').MongoClient;

var dbhost = 'mongodb://localhost:27017/local', myCollection = 'chapter2';

var seedData = function(db, client, callback) {
    db.collection(myCollection).find({},{},{})
        .toArray(
            function(err, docs) {
                if (docs.length <= 0) {
                    console.log('No data. Seeding...');
                    //count each record as it's inserted
                    var ihandler = function(err,recs) {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        inserted++;
                    }

                    var toinsert= 2, inserted = 0;
                    // perform a mongoDB insert for each record
                    db.collection(myCollection).insert ({
                        'Title': 'Snow Crash',
                        'Author': 'Neal Stephenson'
                    }, ihandler);
                    db.collection(myCollection).insert ({
                        'Title': 'Neuromancer',
                        'Author': 'William Gibson'
                    }, ihandler);

                    var sync = setInterval(function () {
                        if (inserted === toinsert) {
                            clearInterval(sync);
                            callback(db);
                        }
                    }, 50);
                    return;
                }
                callback(db, client);
                return;
            }
        );
}

var showDocs = function(db,client) {
    console.log("listing books:");
    var options = {
        sort: ['Title',1]
    };
    // find and return an array of all records in the collection
    db.collection(myCollection).find({},{},options)
        .toArray (
            function(err, docs) {
                if (err) throw err;
                //for each item in the colleciton, print the title and author
                for (var d = 0; d < docs.length; d++) {
                    console.log(docs[d].Title + '; ' + docs[d].Author);
                }
                client.close();
            }
        );
}

MongoClient.connect(dbhost, (err, client) => {
    if (err) throw err;
    //once connected execute seed data function to start the app
    var db = client.db('mytestingdb');
    seedData(db,client, showDocs);
    //client.close();
    //return;
})