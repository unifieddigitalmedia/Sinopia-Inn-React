const express = require('express');
const app = express();
const router = express.Router();

const mongo = require('mongodb');
const MONGOLAB_URI = 'mongodb://sinopiainn-administrator:321123ETz$@ds057476.mlab.com:57476/heroku_mn2k4bdf';
const MongoClient = require('mongodb').MongoClient;
const hotelID = '5974d7d0734d1d6202a929a2';
const o_id = new mongo.ObjectID("5974d7d0734d1d6202a929a2");


router.put('/' ,function (req, res) {

  
  MongoClient.connect(MONGOLAB_URI, function(err, db) {

 
                        if (err) {

                            
                            res.json({"ERROR":err.toString()});

                        
                        }

     var resId = new mongo.ObjectID(req.body.resId);

     db.collection("reservation").findOne({"_id":resId}, function(err, results) {
 
        
                        if (err) {

                            
                            res.json({"ERROR":err.toString()});

                        
                        }

        
        for (var x = 0; x < results.rooms.length; x++) { 



                db.collection('hotels').updateOne( {"rooms._id":results.rooms[x]._id}, { $push: {"rooms.$.booking": { 


                    "RID" : req.body.resId,
                    "fromdate" : results.fromdate , 
                    "enddate" : results.todate 

                
                }  } } , function(err, results) { 


 
                        if (err) {

                            
                            res.json({"ERROR":err.toString()});
                            

                        
                        }


                     


            });


        }


  




                         res.json({"ERROR":""});

                

    });


});

});


router.get('/'  ,function (req, res) {



MongoClient.connect(MONGOLAB_URI, function(err, db) {


  if (err) throw err;
     
     
db.collection("hotels").find().toArray(function(err, result) {
    
      if (err) throw err;
      


      res.json(result);  

      

     });


     db.close();



});


});


router.post('/'  , function (req, res) {


});


router.delete('/'  , function (req, res) {



});



module.exports = router