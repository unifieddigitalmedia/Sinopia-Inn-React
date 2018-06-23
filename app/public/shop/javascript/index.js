(function() {
  'use strict';


var catergories = document.getElementsByClassName("demo");

              
Array.prototype.forEach.call(catergories, function(element,index) {

       
element.addEventListener('click', function(e) {


var url = "/shop/cat/?"+e.target.getAttribute('data-id');


window.sessionStorage.shopCat = e.target.getAttribute('data-id');

window.location.assign(url);





});


        });




})();



