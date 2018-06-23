(function() {
  'use strict';

/*if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../../sw.js').then(function() { 
    console.log("Service Worker Registered"); 
  });
}*/

typeof(Storage) !== "undefined"  ? sessionStorage.privacy != null ?  ""   :  document.getElementsByClassName("modal-footer-panel")[0].style.display  =  "block" : "" ;



document.getElementsByName("optradio").forEach(function(element){

    element.addEventListener("change", verifyPrivacy);


});


var mdl_tab = document.getElementsByClassName("mdl-layout__tab");
var submenu = document.getElementsByClassName("submenu");      
var subMenuMenu = document.getElementsByClassName("sub-menu-menu-menu");     



   Array.prototype.forEach.call(subMenuMenu, function(element,index) {


          element.addEventListener("click", function(e){


                          var url = "/shop/cat/?cat="+e.target.getAttribute("data-category")+"&sub="+e.target.getAttribute("data-sub-catergory");

                          window.sessionStorage.sinopiaInncatergory = e.target.getAttribute("data-category");

                          window.sessionStorage.sinopiaInnsubcatergory = e.target.getAttribute("data-sub-catergory");

                          window.location.assign(url);

               });


        });



   

        Array.prototype.forEach.call(mdl_tab, function(element,index) {

          element.addEventListener("mouseover", function(e){

                    e.target.getAttribute("data-id") != null ?  

                    e.target.classList.contains("submenu") 

                    ? document.getElementsByClassName("active_sub_menu")[0] != undefined 

                    ? (  removeClass() ,   addClass(e.target.getAttribute("data-id"))   )

                    : ( document.getElementById("sub-menu-menu").classList.add("active_sub_menu_") , addClass(e.target.getAttribute("data-id"))  )

                    : document.getElementById(e.target.getAttribute("data-id")).classList.add("active_menu")

                    : (  removeClass() , document.getElementsByClassName("active_sub_menu_")[0].classList.remove("active_sub_menu_") , document.getElementsByClassName("active_menu")[0].classList.remove("active_menu") ) ; 


               });

        });


 Array.prototype.forEach.call(submenu, function(element,index) {

          element.addEventListener("mouseout", function(e){


                          document.getElementById(e.target.getAttribute("data-id")).style.display = "none" ;


               });


        });



document.getElementById('subscribers_email').addEventListener('blur', function(e) {


this.value.match(/[a-z,A-Z,0-9,\.]{1,64}@[a-z,A-Z,0-9]{1,64}\.([a-z,A-Z]{3,64}|[a-z,A-Z]{2,64}\.[a-z,A-Z]{2,64})/g) ? ( window.sessionStorage.subscribers_email = this.value, window.location.assign("/public/register.html")) :  alert('Please check your email')  ; 


});

document.getElementsByClassName('download_buttons')[0].addEventListener('click', function(e) {

window.location.assign("mobile-app.html");

});

document.getElementsByClassName('download_buttons')[1].addEventListener('click', function(e) {

window.location.assign("mobile-app.html");

});






}());


function showSubmenu(){

document.getElementsByClassName(window.sessionStorage.sinopiaInncatergory)[2].classList.add("active_sub_menu");


}


function addClass(para) {


   Array.prototype.forEach.call(document.getElementsByClassName(para), function(element,index) {


          element.classList.add("active_sub_menu");

        });


}

function removeClass() {


var toRemove = [];

Array.prototype.forEach.call(document.getElementsByClassName("active_sub_menu"), function(element,index) {


          toRemove.push(element);

        

        });


    toRemove.forEach(function(el) {


        el.classList.remove("active_sub_menu");
    

});

}



function closemodal (event){



event == document.getElementById('closeFooter') ? document.getElementsByClassName("modal-footer-panel")[0].style.display =  "none" : document.getElementsByClassName("modal")[0].style.display =  "none";


}


function verifyPrivacy (event) {


event.target.value === 'yes' ? ( sessionStorage.privacy = "yes" , document.getElementsByClassName("modal-footer-panel")[0].style.display   =  "none" )   : ( sessionStorage.removeItem("privacy") , document.getElementsByClassName("modal-footer-panel")[0].style.display  =  "none" ); 


}
