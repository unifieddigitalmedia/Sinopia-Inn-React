const express = require('express');
const app = express();
const router = express.Router();


const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
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
 
var Menu = require('../views/menu.jsx');

var Hero = require('../views/hero.jsx');

var Logo = require('../views/logo.jsx');

var Footer = require('../views/footer.jsx');



router.get('/' , urlencodedParser ,function (req, res) {

  var Reception = require('../views/reception.jsx');


MongoClient.connect(MONGOLAB_URI, function(err, db) {


  if (err) throw err;
     
     
db.collection("hotels").find().toArray(function(err, result) {
    
        if (err) throw err;
        
res.setHeader('Content-Type', 'text/html');

res.write('<!DOCTYPE html>' + 

    ReactDOMServer.renderToStaticMarkup(
        React.createElement("head",{},React.createElement("meta",{name:"viewport", content:"width=device-width, initial-scale=1.0"}
            ), React.createElement("link",{rel:"stylesheet", type:"text/css",href: "css/menu.css"  }
            ),React.createElement("link",{rel:"stylesheet", type:"text/css",href: "css/reservation.css"  }
            ), React.createElement("link",{rel:"stylesheet", type:"text/css",href: "bootstrap/3.3.7/css/bootstrap.min.css"  }
            ), React.createElement("link",{rel:"stylesheet", type:"text/css",href: "w3css/4/w3.css"  }
            ), React.createElement("link",{rel:"stylesheet", type:"text/css",href: "https://fonts.googleapis.com/icon?family=Material+Icons"  }
            ), React.createElement("link",{rel:"stylesheet", type:"text/css",href: "//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"  }
            )))+
    ReactDOMServer.renderToStaticMarkup(
        React.createElement("body",{},
            React.createElement("nav",{id: "menu-container"}, 
                React.createElement(Menu,{})
                

            ),React.createElement("header",{id: "topnav-top-header"}, 
                React.createElement(Logo,{})
                

            ),React.createElement("div",{id: "menu-container",className:"hero-image"}, 
                React.createElement(Hero,{})
                

            ),React.createElement("section",{id: "container"},
                 React.createElement(Reception,{ rooms:result[0].rooms, offers:result[0].offers , amenities:result[0].amenities,
  from: new Date(req.query.from).getDate() + "-" +(new Date(req.query.from).getMonth()  + 1)+ "-" + new Date(req.query.from).getFullYear(), 
  to : new Date(req.query.to).getDate() + "-" + (new Date(req.query.to).getMonth()  + 1)+ "-" + new Date(req.query.to).getFullYear() , 
  length : Math.round((new Date(req.query.to).getDate() + "-" + (new Date(req.query.to).getMonth()  + 1)+ "-" + new Date(req.query.to).getFullYear()  - new Date(req.query.from).getDate() + "-" +(new Date(req.query.from).getMonth()  + 1)+ "-" + new Date(req.query.from).getFullYear()  )/(1000*60*60*24))



   })
                

            ),
            React.createElement("footer",{id: "footer-container"},
                 React.createElement(Footer,{})
                

            ),
       
    
            React.createElement("script",{src: "jquery/3.2.1/jquery.min.js"}),
            React.createElement("script",{src: "https://code.jquery.com/jquery-1.12.4.js"}),
            React.createElement("script",{src: "https://code.jquery.com/ui/1.12.1/jquery-ui.js"}),
            React.createElement("script",{src: "bootstrap/3.3.7/js/bootstrap.min.js"}),
            React.createElement("script",{src: "/bundle.js"})


            )));
        

     return res.end();


     });


     db.close();



});

});




module.exports = router