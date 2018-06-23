const express = require('express');
const app = express();
const router = express.Router();

const fs = require('fs');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const s3Module = require('s3');
const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/config.json");
const s3Bucket = new AWS.S3( { params: {Bucket: 'sinopiainn.recipes'} } );
const s3 = new AWS.S3();
const async = require('async');
const mongo = require('mongodb');
const MONGOLAB_URI = 'mongodb://sinopiainn-administrator:321123ETz$@ds057476.mlab.com:57476/heroku_mn2k4bdf';
const MongoClient = require('mongodb').MongoClient;
const o_id = new mongo.ObjectID("5974d7d0734d1d6202a929a2");
const mandrill = require('mandrill-api/mandrill');
const mandrill_client = new mandrill.Mandrill('fix_HqmjREpZnCAHR_Dhaw');



router.post('/', multipartMiddleware,function (req, res) {

var processed = false;

var filenames = [];

var itemsProcessed = 0;

      req.files.file.forEach(function(element, index){

        fs.readFile(element.path, function (err, data) {

            if (err) {
                
            var response = {"ERROR":"Error uploading your picture:"};
            console.log('UnSuccessfully uploaded, ', response.toString());
            res.json(response);

        } else {

            s3Bucket.putObject({Key: element.originalFilename , Body: data, ACL:'public-read'}, function(err, data) {

            if (err) {
            
            var response = {"ERROR":"Error uploading your picture:"};

            console.log('UnSuccessfully uploaded, ', response.toString());

            res.json(response);

        
            } else {

                  console.log('Successfully uploaded, ', element.originalFilename);
                  filenames.push("https://s3-us-west-2.amazonaws.com/sinopiainn.recipes/"+element.originalFilename);

                  itemsProcessed++;
                  itemsProcessed === req.files.file.length ? logRecipe(req.body,filenames,res) : "" ;
    
   

      
            }

            });
      
        }


      });

});


   
    

});


function logRecipe(body,filenames,res){


MongoClient.connect(MONGOLAB_URI, function(err, db) {


          if (err) throw err;
     
              var obj = {
    

                      prep:body.prep,
                      cook:body.cook,
                      read:body.read,
                      ingredientsArray:JSON.parse(body.ingredientsArray), 
                      nutrientsArray:JSON.parse(body.nutrientsArray),
                      stepsArray:JSON.parse(body.stepsArray),
                      recipe_name:body.recipe_name,
                      recipe_description:body.recipe_description,
                      image_url:filenames[0]
                    

                      };
    

               db.collection("recipes").insertOne(obj, function(err, result) {
 

                        if (err) throw err;

                        res.json(result.insertedId);


                });


              db.close();


          }) 


}

router.get('/' ,function (req, res) {


 MongoClient.connect(MONGOLAB_URI, function(err, db) {


  if (err) throw err;

  req.query.recipeID === undefined ? db.collection("recipes").find().toArray(function(err, result) {
    
        if (err) throw err;

          res.json(result);

      }) : ( 


    db.collection("recipes").findOne({ _id:new mongo.ObjectID(req.query.recipeID)},function(err, result) {
    
        if (err) throw err;

          res.json(result);

      }) ) ;

     });

}) 


module.exports = router