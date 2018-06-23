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

app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

router.get('/' , urlencodedParser ,function (req, res) {

  res.send('Birds home page')

});


router.post('/' , urlencodedParser , function (req, res) {

  res.send('About birds')

});


router.put('/' , urlencodedParser , function (req, res) {

   MongoClient.connect(MONGOLAB_URI, function(err, db) {

  if (err) throw err;

   

     var resId = new mongo.ObjectID(req.body.resId);

    
     db.collection('reservation').findOne({ "_id": resId  },function(e, results){




if (e) return next(e)

var costofrooms = 0 ;

var costofbreakfast = 0 ;

var costofairportpickup = 0 ;

var tax = 0;

var total = 0 ;

var discount = 0;


for(var a = 0 ; a < results.rooms.length ; a++ ){


costofrooms = costofrooms + (results.rooms[a].price * results.numofdays);



}

costofrooms = costofrooms.toFixed(2);


for(var b = 0 ; b < results.amenities.length ; b++ ){


if(results.amenities[b].name == 'Breakfast'){


  costofbreakfast = Number(results.amenities[b].price) * (results.numofadults + results.numofchildren);

  costofbreakfast = costofbreakfast.toFixed(2);
}
else if(results.amenities[b].name == 'Airport Pickup'){

 costofairportpickup = Number(results.amenities[b].price) * results.rooms.length;

costofairportpickup = costofairportpickup.toFixed(2);

}


}


total = results.total;

var balance = Number(total) - Number(req.query.deposit);

for(var c = 0 ; c < results.offers.length ; c++ ){


discount = discount + (results.offers[c].amount * total) ;

}

var fullname = results.fname +' '+results.lname;  

var template_name = "Booking confirmation sent to business";

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
            "email": results.email,
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
            "content": results.fname
        },{
            "name": "dateofarrival",
            "content": results.fromdate
        },{
            "name": "bookingID",
            "content": results._id
        },{
            "name": "dateofleave",
            "content": results.todate
        },{
            "name": "numofrooms",
            "content": results.rooms.length
        },{
            "name": "numofdays",
            "content": results.numofdays
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
            "name": "discount",
            "content": discount
        },{
            "name": "phone",
            "content": results.phone
        },{
            "name": "email",
            "content": results.email
        },{
            "name": "adults",
            "content": results.guests
        },{
            "name": "tax",
            "content": tax
        },{
            "name": "total",
            "content": total
        },{
            "name": "deposit",
            "content": results.deposit
        },{
            "name": "balance",
            "content": balance
        },{

            "name":"token",
            "content":results.token

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

       /*db.collection('reservation').updateOne( {_id:resId}, { $set: { "status": req.body.status } } , function(err, results) { 

         
            if (err) throw err;
            
            
            
            db.close();
            
            });*/

res.json("1 record updated");

}, function(e) {

if(e){return  console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message); }
   
  
});



 });
            
       db.close();
            
           
});


});


router.delete('/' , urlencodedParser , function (req, res) {

  res.send('About birds')

});


module.exports = router