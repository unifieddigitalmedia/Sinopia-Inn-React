const express = require('express');
const app = express();
const router = express.Router();

const mongo = require('mongodb');
const MONGOLAB_URI = 'mongodb://sinopiainn-administrator:321123ETz$@ds057476.mlab.com:57476/heroku_mn2k4bdf';
const MongoClient = require('mongodb').MongoClient;
const hotelID = '5974d7d0734d1d6202a929a2';
const o_id = new mongo.ObjectID("5974d7d0734d1d6202a929a2");
const mandrill = require('mandrill-api/mandrill');
const mandrill_client = new mandrill.Mandrill('fix_HqmjREpZnCAHR_Dhaw');



router.get('/'  ,function (req, res) {

  res.send('Birds home page')

});


router.post('/'  , function (req, res) {

   MongoClient.connect(MONGOLAB_URI, function(err, db) {


  if (err) throw err;
     
    var rString = "";

       var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ ) {


        rString += possible.charAt(Math.floor(Math.random() * possible.length));


    }


    var myobj = {
    
    token: rString,
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    email: req.body.email,
    numofdays: req.body.numofdays,
    guests: req.body.guests,
    fromdate: req.body.fromdate,
    todate: req.body.todate,
    subtotal: req.body.subtotal,
    amenityTotal:req.body.amenityTotal,
    discount:req.body.discount,
    deposit: req.body.deposit,
    total: req.body.total,
    tripID: null,
    offers: req.body.offerarray,
    amenities: req.body.amenityarray,
    rooms: req.body.roomarray,

    };
    

     db.collection("reservation").insertOne(myobj, function(err, result) {
 

        if (err) throw err;

        res.json(result.insertedId);

    });


     db.close();


});

});


router.put('/'  , function (req, res) {

  MongoClient.connect(MONGOLAB_URI, function(err, db) {

  if (err) throw err;

     var resId = new mongo.ObjectID(req.body.resId);



            db.collection('reservation').updateOne( {_id:resId}, { $set: { "status": req.body.status } } , function(err, results) { 

         
            if (err) throw err;
            
            res.json("1 record updated");
            
            db.close();
            
            });

 

});

});


router.delete('/'  , function (req, res) {

  res.send('About birds')

});


module.exports = router