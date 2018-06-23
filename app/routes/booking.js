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

var s3 = require('s3');

var AWS = require('aws-sdk');



AWS.config.loadFromPath(__dirname + "/config.json");


var s3 = new AWS.S3();



router.get('/' ,function (req, res) {

 MongoClient.connect(MONGOLAB_URI, function(err, db) {


  if (err) throw err;

    db.collection("reservation").find().toArray(function(err, result) {
    
        if (err) throw err;

          res.json(result);

      });

     });

});



router.post('/',multipartMiddleware,function (req, res) {


checkAvailability(req.body.fromdate, req.body.todate) ? res.json({"ERROR":"One of your rooms is no long available"}) :

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
    roomTotal:req.body.roomTotal,
    discount:req.body.discount,
    deposit: req.body.deposit,
    total: req.body.total,
    tripID: req.body.tripID,
    offers: JSON.parse(req.body.offerarray),
    amenities: JSON.parse(req.body.amenityarray),
    rooms: JSON.parse(req.body.roomarray)
  

    };
    

     db.collection("reservation").insertOne(myobj, function(err, result) {
 

        if (err) throw err;

    

      var response = {"ERROR":"","RESULT":result.ops[0]};

      res.json(response);



    });


     db.close();


});


});

function checkAvailability (fromDate, toDate){

var booked;


MongoClient.connect(MONGOLAB_URI, function(err, db) {



  db.collection("hotels").findOne({_id:o_id},function(err, result) {
    
   

  if (err) throw err;


  result.rooms.forEach( function(element , index){

     booked = false;
  
    element.booking.forEach( function(value , counter){
  
 

  
      (( new Date(value.fromdate)  <=  new Date(fromDate) ) && ( new Date(value.enddate) >= new Date(fromDate) ) ) ||  (( new Date(value.fromdate) <= new Date(toDate) ) && (new Date(value.enddate) >= new Date(toDate) ))  ?  booked = true : ""  ; 
  
  
     });


    });




     return booked ;

     db.close();



});

});







}



function formatDate(date) {

  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

 var dayNames = [
    "Sun", "Mon", "Tue",
    "Wed", "Thu", "Fri", "Sat"
  ];

  return  dayNames[date.getDay()]+', '+date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
  
  
}


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
            

            var response = {"ERROR":err.toString()};

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

var roomsName = [];


for(var a = 0 ; a < results.value.rooms.length ; a++ ){


costofrooms = costofrooms + (Number(results.value.rooms[a].price) * Number(results.value.numofdays));
roomsName.push(results.value.rooms[a].name);


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

var template_name = "Booking confirmation sent to business";

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
            "email": 'beverley.bryan@sinopiainn.com',
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
        "name": "roomNames",
            "content":  roomsName.join()
       
        
    },{
            "name": "name",
            "content": results.value.fname
        },{
            "name": "dateofarrival",
            "content": formatDate(new Date(results.value.fromdate))
        },{
            "name": "bookingID",
            "content": results.value._id
        },{
            "name": "dateofleave",
            "content": formatDate(new Date(results.value.todate))
        },{
            "name": "numofrooms",
            "content": results.value.rooms.length
        },{
            "name": "numofdays",
            "content": results.value.numofdays
        },{
            "name": "costofrooms",
            "content": costofrooms
        },{
            "name": "costofbreakfast",
            "content": costofbreakfast
        },{
            "name": "costofairportpickup",
            "content": costofairportpickup
        },{
            "name": "costofcarhire",
            "content": costofcarhire
        },{
            "name": "discount",
            "content": results.value.discount
        },{
            "name": "phone",
            "content": results.value.phone
        },{
            "name": "email",
            "content": results.value.email
        },{
            "name": "adults",
            "content": results.value.guests
        },{
            "name": "tax",
            "content": tax
        },{
            "name": "total",
            "content": total
        },{
            "name": "deposit",
            "content": deposit
        },{
            "name": "balance",
            "content": balance
        },{

            "name":"token",
            "content":results.value.token

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





router.delete('/'  , function (req, res) {

 

});


module.exports = router