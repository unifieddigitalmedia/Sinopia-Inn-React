const React = require('react');
const ReactDOM = require('react-dom');
/*
const checkIn = require('../../../views/check-in.jsx');
ReactDOM.render(<checkIn />, document.getElementById('app-check-in'));
*/


const Payment = require('../../../views/checkout-view/payment.jsx')
const Reservation = require('../../../views/reservation-view/reservation.jsx');
const Shop = require('../../../views/shop-view/shop.jsx');
const Single = require('../../../views/shop-view/single.jsx');
const Itinerary = require('../../../views/trip-planner-view/itinerary.jsx');
const Carousel = require('../../../views/recipe-app-view/recipe-carousel.jsx');
const Recipe = require('../../../views/recipe-app-view/recipe.jsx');
const Trip = require('../../../views/trip-planner-view/trip.jsx');


document.getElementById('app-shop-payment') != undefined ? ReactDOM.render(<Payment />, document.getElementById('app-shop-payment')) :  
document.getElementById('app-reservation') != undefined ? ReactDOM.render(<Reservation />, document.getElementById('app-reservation')) : 
document.getElementById('app-shop') != undefined ? ReactDOM.render(<Shop />, document.getElementById('app-shop')) : 
document.getElementById('app-shop-single') != undefined ? ReactDOM.render(<Single />, document.getElementById('app-shop-single')) : 
document.getElementById('app-itinerary') != undefined ? ReactDOM.render(<Itinerary />, document.getElementById('app-itinerary')) : 
document.getElementById('innermyCarousel') != undefined ? ReactDOM.render(<Carousel />, document.getElementById('innermyCarousel')) : 
document.getElementById('app-recipe') != undefined ? ReactDOM.render(<Recipe />, document.getElementById('app-recipe')) : null;
document.getElementById('app-trip') != undefined ? ReactDOM.render(<Trip />, document.getElementById('app-trip')) : null;

























