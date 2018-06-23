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
const path = require('path');

router.get('/' ,function (req, res) {

MongoClient.connect(MONGOLAB_URI, function(err, db) {


if (err) throw err;

var myobj = {
    
    name: req.query.name,
    email: req.query.email,
    inquiry: req.query.inquiry,
    date:Date()
  
    };
    

     db.collection("inquiries").insertOne(myobj, function(err, result) {
 

        if (err) throw err;

     


var template_name = "Inquiry received";

var template_content = [{
        "name": "",
        "content": ""
    }]; 

var message = {

    "subject": "Sinopia Inn New Inquiry",
    "from_email": "info@sinopiainn.com",
    "from_name": "Sinopia Inn",
    "to": [
        {
            "email": req.query.email,
            "name": req.query.name,
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
            "content": req.query.name
        },{
            "name": "message",
            "content": req.query.inquiry
        },{
            "name": "date",
            "content": req.query.date
        },{
            "name": "email",
            "content": req.query.email
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
    }
  };

var async = false;
var ip_pool = "Main Pool";
var send_at = "2016-10-10 23:59:59";

mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {

          res.sendFile(path.resolve(__dirname + '/../public/thank-you.html'));


}, function(e) {

if(e){


    res.JSON({"ERROR":e.message });
   
   }
   
   /* return  console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message); */    
        
});


    });





     db.close();


     });

});




module.exports = router