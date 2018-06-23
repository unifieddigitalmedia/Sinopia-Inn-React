const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression')


app.use(compression())





app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {


res.sendFile(__dirname + "/index.html");


});

app.get('/index.html', function(req, res) {


res.sendFile(__dirname + "/index.html");



});

app.get('/shop/cat/', function(req, res) {



res.sendFile(__dirname + "/public/shop/index.html");



});

app.get('/shop/cat/:item', function(req, res) {



res.sendFile(__dirname + "/public/shop/single.html");



});


const hotel = require('./routes/hotel');
const booking = require('./routes/booking');
const guest = require('./routes/guest');
const reservations = require('./routes/reservation');
const tmpReservations = require('./routes/tmpreservation');
const trip = require('./routes/trip');
const confirmation = require('./routes/confirmation');
const recipe = require('./routes/recipe');
const contact = require('./routes/contact');
const shop = require('./routes/shop');
const braintree = require('./routes/braintree');
const redirect = require('./routes/redirect');

app.use('/api/booking', booking);

app.use('/api/trip', trip);

app.use('/api/hotel', hotel);

app.use('/api/reservation', booking);

app.use('/api/reservationById', tmpReservations);

app.use('/api/reservations', reservations);

app.use('/api/recipe', recipe);

app.use('/api/guest', guest);

app.use('/thank-you', contact);

app.use('/api/shop/', shop);

app.use('/api/checkout',braintree);

app.use('/api/redirect',redirect);


process.env.NODE_ENV = 'development';


app.listen(process.env.PORT || 5000, function () {

  console.log('Example app now listening on port '+ process.env.PORT );

})



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// development error handler

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

