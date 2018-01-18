import express from 'express';
import Files from '../models/file';

const router = express.Router();

const multer = require('multer');

var sourceFile = require('../main.js');

const musicupload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, 'public/music/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
      //console.log("called first?");

    }
  }),
});
//req.body.file

const documentupload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, 'public/document/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});

const pictureupload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, 'public/picture/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});


router.get('/get',function(req,res){
    //Info to query with: username.
    //Files.remove({});
    console.log("got it");
    console.log(user);
    /*This should work on the website */
    // const username = req.session.loginInfo.username;

    //const username = "younseo";
    var array;
    Files.find({"username":user},{"filename":1,"filetype":1, "leftpos":1, "toppos":1, "path":1}, (err, data) => {
      //Must deal with data here since async.
      array = data;
      console.log(array);
      res.send(array);
    });

    //Info I should send: filename, position,
});

//Post request from save button. Update all positions.
router.post('/save', function(req,res){
  var array = req.body;
  console.log("HI received save");

  var i;
  for(i = 0; i < array.length; i++){
    var path = array[i].path;
    path = path.replace("public\\music\\","");
    var left = array[i].leftpos;
    left = parseInt(left,10);
    var top = array[i].toppos;
    top = parseInt(top,10);
    console.log(path);
    console.log(left);
    console.log(top);

    Files.findOneAndUpdate(
      { "filename": path },
      { "leftpos": left,"toppos":top },
      {new:true},
      function(err,doc){
        console.log(doc);
      }
    );
  }
}
);

//router.use('/music',express.static('public'));
// new Date().valueOf() + path.extname(file.originalname)
//single( {button's name -> 'music'} )
var user;
router.post('/music', musicupload.single('music'), (req, res,next) => {
    console.log(req.file);
    console.log("original file above");
    //console.log(uuidv1());
    //new fileObject = {'filename':req.file.filename, 'path':req.file.path }

    const filename = req.file.filename;
    const filetype = req.file.fieldname;
    const path = req.file.path;
    const username = req.session.loginInfo.username;
    user = username;
    const roomnumber = 0;
    const leftpos = 0;
    const toppos = 0;

    var collection = sourceFile.name;

    Files.findOneAndUpdate(
      { "filename": filename },
      { "filename": filename,"filetype":filetype, "path": path, "username": username, "roomnumber": roomnumber, "leftpos": leftpos,"toppos":toppos },
      { "upsert": 1 },
       (err) => { if (err) { console.error(err); res.json({ result: 0}); return; }}
    );

    Files.find({},function(data){
      console.log(data);
    });

    /*
    //Everything is async is node.js including Files.find here!
    console.log("Find called");
    Files.find({"filename": filename}, (err, data) => {
      //Must deal with data here since async.
      console.log(data);
    });
    console.log("Find finished");
    */
    res.redirect('back');
});

router.post('/picture', musicupload.single('picture'), (req, res,next) => {
    console.log(req.file);
    console.log("original file above");
    //console.log(uuidv1());
    //new fileObject = {'filename':req.file.filename, 'path':req.file.path }

    const filename = req.file.filename;
    const filetype = req.file.fieldname;
    const path = req.file.path;
    const username = req.session.loginInfo.username;
    user = username;
    const roomnumber = 0;
    const leftpos = 0;
    const toppos = 0;

    var collection = sourceFile.name;
    console.log(Files.find({}));

    Files.findOneAndUpdate(
      { "filename": filename },
      { "filename": filename,"filetype":filetype, "path": path, "username": username, "roomnumber": roomnumber, "leftpos": leftpos,"toppos":toppos },
      { "upsert": 1 },
       (err) => { if (err) { console.error(err); res.json({ result: 0}); return; }}
    );

    Files.find({},function(data){
      console.log(data);
    });

    /*
    //Everything is async is node.js including Files.find here!
    console.log("Find called");
    Files.find({"filename": filename}, (err, data) => {
      //Must deal with data here since async.
      console.log(data);
    });
    console.log("Find finished");
    */
    res.redirect('back');
});

router.post('/document', documentupload.single('document'), (req, res) => {
  console.log(req.file);
  console.log("original file above");
  //console.log(uuidv1());
  //new fileObject = {'filename':req.file.filename, 'path':req.file.path }

  const filename = req.file.filename;
  const filetype = req.file.fieldname;
  const path = req.file.path;
  const username = req.session.loginInfo.username;
  user = username;
  const roomnumber = 0;
  const leftpos = 0;
  const toppos = 0;

  var collection = sourceFile.name;
  console.log(Files.find({}));

  Files.findOneAndUpdate(
    { "filename": filename },
    { "filename": filename,"filetype":filetype, "path": path, "username": username, "roomnumber": roomnumber, "leftpos": leftpos,"toppos":toppos },
    { "upsert": 1 },
     (err) => { if (err) { console.error(err); res.json({ result: 0}); return; }}
  );

  Files.find({},function(data){
    console.log(data);
  });

  /*
  //Everything is async is node.js including Files.find here!
  console.log("Find called");
  Files.find({"filename": filename}, (err, data) => {
    //Must deal with data here since async.
    console.log(data);
  });
  console.log("Find finished");
  */
  res.redirect('back');
});

export default router;
