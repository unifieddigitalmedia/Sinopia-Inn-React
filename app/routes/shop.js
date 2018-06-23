const express = require('express');
const app = express();
const router = express.Router();

const mongo = require('mongodb');
const MONGOLAB_URI = 'mongodb://sinopiainn-administrator:321123ETz$@ds057476.mlab.com:57476/heroku_mn2k4bdf';
const MongoClient = require('mongodb').MongoClient;


router.get('/',function (req, res) {


  MongoClient.connect(MONGOLAB_URI, function(err, db) {

  if (err) throw err;

  	console.log(req.query.catergory);

  	console.log(req.query.sub);

     db.collection("shop").find({"catergory":req.query.catergory,"sub-catergory":req.query.sub}).toArray(function(err, result) {
 
        if (err) throw err;
        
        res.json(result);


    });


     db.close();
 });




});


module.exports = router