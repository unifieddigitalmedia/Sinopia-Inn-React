const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const mongo = require('mongodb');
const MONGOLAB_URI = 'mongodb://sinopiainn-administrator:321123ETz$@ds057476.mlab.com:57476/heroku_mn2k4bdf';
const MongoClient = require('mongodb').MongoClient;
const hotelID = '5974d7d0734d1d6202a929a2';
const o_id = new mongo.ObjectID("5974d7d0734d1d6202a929a2");
const mandrill = require('mandrill-api/mandrill');
const mandrill_client = new mandrill.Mandrill('fix_HqmjREpZnCAHR_Dhaw');

const multipart = require('connect-multiparty');

const multipartMiddleware = multipart();

 

router.get('/'  ,function (req, res) {


  MongoClient.connect(MONGOLAB_URI, function(err, db) {


  if (err) throw err;
     
     
     db.collection("placesofinterest").find().toArray(function(err, result) {
    
        if (err) throw err;

          res.json(result);

      });


   });



});


router.post('/' , multipartMiddleware , function (req, res) {

console.log(req.body);

MongoClient.connect(MONGOLAB_URI, function(err, db) {


var myobj = {
    
subtotal:req.body.subtotal,
subavgtotal:req.body.subavgtotal,
basefare: req.body.basefare,
milefare:req.body.milefare,
minutefare:req.body.minutefare,
carhire:req.body.carhire,
tax:req.body.tax,
itineraryTotal:req.body.itineraryTotal,
guest:req.body.guest,
places:JSON.parse(req.body.places),

    };
    

     db.collection("trip").insertOne(myobj, function(err, result) {
 

        if (err) throw err;

        res.json(result.insertedId);

    });


     db.close();
  

});

});


router.put('/' , function (req, res) {

  
});


router.delete('/' , function (req, res) {

  res.send('About birds')

});


module.exports = router