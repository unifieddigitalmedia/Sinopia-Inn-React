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
const fs = require('fs');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const s3 = require('s3');
const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/config.json");


router.put('/' , multipartMiddleware , function (req, res) {


const bucket = 'sinopiainn.reservation';

var filename =  req.files.photos.originalFilename;

var s3Bucket = new AWS.S3( { params: {Bucket: bucket} } );

fs.readFile(req.files.photos.path, function (err, data) {

   if (err) {


      return console.error(err);
   
      var response = {"ERROR":"There was an system error. Please contact the web administrator."};

      res.json(response);



   }else{


const directory = req.body.email+"/"+filename;

 var params = {Key: directory, Body: data};

        s3Bucket.putObject(params, function(err, data) {
  




        if (err) {
            

            var response = {"ERROR":"Error uploading your picture:"};

            res.json(response);

      


        } else {


MongoClient.connect(MONGOLAB_URI, function(err, db) {

  if (err) throw err;

     var resId = new mongo.ObjectID(req.body.resID);

            db.collection('reservation').findOneAndUpdate( {_id:resId}, { $set: {"promotions":req.body.promotions,"transactionID":req.body.transactionID,"status": req.body.status ,"fname" :req.body.fname , "lname" : req.body.lname , "email" :req.body.email ,   image_url:"https://s3-us-west-2.amazonaws.com/"+bucket+"/"+directory } } ,{ returnOriginal:false}, function(err, results) { 

            if (err) {

                  res.json("ERROR",err);

            }else{




var costofrooms = 0 ;

var costofbreakfast = 0 ;

var costofairportpickup = 0 ;

var costofcarhire =0;

var tax = 0;

var total = 0 ;

var discount = 0;


for(var a = 0 ; a < results.value.rooms.length ; a++ ){


costofrooms = costofrooms + (Number(results.value.rooms[a].price) * Number(results.value.numofdays));



}

costofrooms = costofrooms.toFixed(2);


for(var b = 0 ; b < results.value.amenities.length ; b++ ){


if(results.value.amenities[b].name == 'Breakfast'){


  costofbreakfast = Number(results.value.amenities[b].price) * (Number(results.value.guests) );


  costofbreakfast = costofbreakfast.toFixed(2);
}
else if(results.value.amenities[b].name == 'Airport Pickup'){

 costofairportpickup = Number(results.value.amenities[b].price) * Number(results.value.rooms.length);

costofairportpickup = costofairportpickup.toFixed(2);

}else if(results.value.amenities[b].name == 'Private Car Hire'){



   costofcarhire = Number(results.value.amenities[b].price) * Number(results.value.numofdays);

   costofcarhire = costofcarhire.toFixed(2);

}



}



total = results.value.total;



var fullname = results.value.fname +' '+results.value.lname;  

var template_name = "Booking help sent to business";

var fname =  results.value.fname.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

var balance = Number(total) - Number(results.value.deposit);

var deposit = results.value.deposit;

balance = balance.toFixed(2);

var template_content = [{
        "name": "",
        "content": ""
    }]; 

var message = {

    "subject": "Sinopia Inn Booking Confirmation",
    "from_email": "info@sinopiainn.com",
    "from_name": "Sinopia Inn",
    "to": [
        {
            "email": results.value.email,
            "name": fullname,
            "type": "to"
        }

        ],


    "headers": {
        "Reply-To": "info@sinopiainn.com"
    },

    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": "machelslack@icloud.com",
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": true,
    "merge_language": "handlebars",
    "global_merge_vars":[{
            "name": "name",
            "content": results.value.fname
        }
        ],
    "merge_vars": [{
            "rcpt": "recipient.email@example.com",
            "vars": [{
                    "name": "merge2",
                    "content": "merge2 content"
                }]
        }],

    "metadata": {
        "website": "www.sinopiainn.com"
    },

};

var async = false;
var ip_pool = "Main Pool";
var send_at = "2016-10-10 23:59:59";

mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {

  
  res.json({"ERROR":"","Reservation":results.value});


}, function(e) {

if(e){


  res.json({"ERROR":e.message});


}

  
 
});



                  



            }


            
          
            
            db.close();
            
            });

});


        }


});





}


        });



 });





module.exports = router