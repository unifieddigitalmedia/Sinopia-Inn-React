const express = require('express');
const app = express();
const router = express.Router();
const mongo = require('mongodb');
const MONGOLAB_URI = 'mongodb://sinopiainn-administrator:321123ETz$@ds057476.mlab.com:57476/heroku_mn2k4bdf';
const MongoClient = require('mongodb').MongoClient;
const hotelID = '5974d7d0734d1d6202a929a2';
const o_id = new mongo.ObjectID("5974d7d0734d1d6202a929a2");
const bodyParser = require('body-parser');
var braintree = require("braintree");



const multipart = require('connect-multiparty');

const multipartMiddleware = multipart();



var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'srhrsqv4gy3hq4ph',
    publicKey:    '43rvqc54k6f95qvq',
    privateKey:   '501e4b051264b96427f0ceddf2383920'
});

router.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});


router.post("/", multipartMiddleware , function (req, res) {

var saleRequest = {
 amount: req.body.amount,
   paymentMethodNonce: req.body.nonce,
    orderId: req.body.resID ,
  merchantAccountId: "sinopiainnltd",
  options: {
    submitForSettlement: true
  }

};






gateway.transaction.sale(saleRequest, function (err, result) {
  if (err) {

    console.log("there was an error - " + err );
    res.send(err);

  } else if (result.success) {

      var resId = new mongo.ObjectID(req.body.resID);

MongoClient.connect(MONGOLAB_URI, function(err, db) {


            db.collection('reservation').findOneAndUpdate( {_id:resId}, { $set: { "transactionID":result.transaction.id } } ,{ returnOriginal:false}, function(err, results) { 

            if (err) {

                  res.json("ERROR",err);

            }else{

                  res.send(result);

            }

          });

             db.close();

            });

   
  } else {

       console.log("there was an error - " + result.message );

      res.send(result);
  }
});

 
});


module.exports = router