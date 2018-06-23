const express = require('express');
const app = express();
const router = express.Router();
const mongo = require('mongodb');
const MONGOLAB_URI = 'mongodb://sinopiainn-administrator:321123ETz$@ds057476.mlab.com:57476/heroku_mn2k4bdf';
const MongoClient = require('mongodb').MongoClient;
const o_id = new mongo.ObjectID("5974d7d0734d1d6202a929a2");
const fs = require('fs');


router.get('/' ,function (req, res) {

 MongoClient.connect(MONGOLAB_URI, function(err, db) {

    var resId = new mongo.ObjectID(req.query.resId);
  
  if (err) throw err;

    db.collection("reservation").findOne({_id:resId},function(err, result) {
    
        if (err) throw err;

           var response = {"ERROR":"","Reservation":result};

          res.json(response);

      });

     });

});



module.exports = router