var sidebar = require('../helpers/sidebar');
var fs = require('fs'),
    path = require('path'),
    formidable = require('formidable') ;

module.exports = {
    index: function(req, res) {
        var viewModel = {
            image: {
                uniqueId:       1,
                title:          'Sample Image 1',
                description:    'This is a sample.',
                filename:       'sample1.jpg',
                views:          0,
                likes:          0,
                timestamp:      Date.now
            },
            comments: [
                {
                    image_id:   1,
                    email:      'test@testing.com',
                    name:       'Test Tester',
                    gravatar:   'http://www.gravatar.com/avatar/9a99fac7b524fa443560ec7b5ece5ca1?d=monsterid&s=45',
                    comment:    'This is a test comment...',
                    timestamp:  Date.now()
                },{
                    image_id:   1,
                    email:      'test@testing.com',
                    name:       'Test Tester',
                    gravatar:   'http://www.gravatar.com/avatar/9a99fac7b524fa443560ec7b5ece5ca1?d=monsterid&s=45',
                    comment:    'Another followup comment!',
                    timestamp:  Date.now()
                }
            ]
        };
        sidebar.sb(viewModel, function(viewModel) {
            res.render('image',viewModel);
        });
    },
    create: function(req, res) {
        var saveImage= function() {
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
            imgUrl = '',
            ext = '',
            tempPath = '',
            targetPath = '';

            for(var i=0; i < 6; i+=1) {
                imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            if (req.url == '/images') {
                var form = new formidable.IncomingForm();
                console.log(req);
                form.parse(req, function(err, fields, files) {
                    tempPath = files.file.path;
                    ext = path.extname(files.file.name).toLowerCase();
                    targetPath=path.resolve('./public/upload/' + imgUrl + ext);
                    console.log("Ext:::");
                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                        fs.copyFileSync(tempPath,targetPath);
                        res.redirect('/images/' + imgUrl);
                    } else {
                        fs.unlink(tempPath, function (err) {
                        if (err) throw err;
                        res.json(500, {error: 'Only image files are allowed.'});
                        });
                    }
                })
            }
        };
        saveImage();
    },
    like: function(req,res) {
        res.send('The image:like POST controller');
    },
    comment: function(req,res) {
        res.send('The image:comment POST controller');
    }
};