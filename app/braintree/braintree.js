const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
var braintree = require("braintree");



const multipart = require('connect-multiparty');

const multipartMiddleware = multipart();

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId:   'srhrsqv4gy3hq4ph',
  publicKey:    '43rvqc54k6f95qvq',
  privateKey:   '501e4b051264b96427f0ceddf2383920',
  accessToken: 'access_token$sandbox$mwd8q53bs3xd2qd8$4eda1be406629012c69fafbfc4b5e3f6'

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
  merchantAccountId: "USD",
  options: {
    paypal: {
      customField: "PayPal custom field",
      description: "Description for PayPal email receipt",
    },
    submitForSettlement: true
  }
};

gateway.transaction.sale(saleRequest, function (err, result) {
  if (err) {

    console.log("there was an error - " + err );
    res.send(err);

  } else if (result.success) {

      console.log("there was no error - " + result );

    res.send(result);
  } else {

       console.log("there was an error - " + result.message );

    res.send(result);
  }
});

 
});


module.exports = router