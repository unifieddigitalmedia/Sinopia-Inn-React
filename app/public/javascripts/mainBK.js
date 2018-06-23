$(window).scroll(function() {


if ($(this).scrollTop() > $(".mdl-layout__content").position().top){  


    $('.reservationform').addClass("sticky");
 
  }
  
  else{
 
    $('.reservationform').removeClass("sticky");
  
  }

});


$(function() {
 

$('#fromdate,#fromdatePage').datepicker({ dateFormat: "D, d MM yy" }).on( "change", function() {


 $(this).parent().addClass('is-focused');


} );


$('#todate,#todatePage').datepicker({ dateFormat: "D, d MM, yy" }).on( "change", function() {




 $(this).parent().addClass('is-focused');



} );





});




(function() {
  'use strict';

/*if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../../sw.js').then(function() { 
    console.log("Service Worker Registered"); 
  });
}*/


 var dialog = document.querySelector('dialog');

    var showModalButton = document.querySelector('.show-modal');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    showModalButton.addEventListener('click', function() {
      dialog.style.display = "block";
      dialog.showModal();
    });
    dialog.querySelector('.closeDialog').addEventListener('click', function() {
      dialog.close();
       dialog.style.display = "none";
    });
    

window.localStorage.getItem("sinopiaInn-checkout-bag") != null ? document.getElementById("basket").innerHTML = JSON.parse(window.localStorage.getItem("sinopiaInn-checkout-bag")).length: document.getElementById("basket").innerHTML = 0   ;

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



document.getElementById('contactForm') != null ? document.getElementById('contactForm').addEventListener('submit', function(e) {

e.preventDefault();

document.getElementById('Email').value.match(/[a-z,A-Z,0-9,\.]{1,64}@[a-z,A-Z,0-9]{1,64}\.([a-z,A-Z]{3,64}|[a-z,A-Z]{2,64}\.[a-z,A-Z]{2,64})/g) ? this.submit() :  alert('Please check your email')  ; 


}) : "" ;

Array.prototype.forEach.call(document.getElementsByClassName('resForm'), function(element,index) {



          element.addEventListener("submit", function(e){

                        e.preventDefault();

                        const today = new Date();

                        const fromDate = new Date(e.target.querySelector('.fromdate').value);

                        const toDate = new Date(e.target.querySelector('.todate').value);

                        toDate < fromDate  ? alert('Please check you check out date.') :  (today > fromDate || toDate  > toDate) ?  alert('Dates cannot be in the past.' ) :  (

                        toDate == 'Invalid Date' ||  fromDate ==   'Invalid Date') ?  alert('Please check your reservation dates.')  : ( window.sessionStorage.fromdate = 

                        fromDate.getDate() + "-" +(fromDate.getMonth()  + 1)+ "-" + fromDate.getFullYear() ,

                        window.sessionStorage.todate =  toDate.getDate() + "-" +(toDate.getMonth()  + 1)+ "-" + toDate.getFullYear() ,  

                        window.sessionStorage.lengthOfstay =  Math.round((toDate - fromDate)/(1000*60*60*24)) ,

                        this.submit() );


          });


});


Array.prototype.forEach.call(document.getElementsByClassName('dateChooser'), function(element,index) {



          element.addEventListener("click", function(e){



                        document.getElementById("bookingNav").style.height = "100%";


          });


});

Array.prototype.forEach.call(document.getElementsByClassName('closedateChooser'), function(element,index) {



          element.addEventListener("click", function(e){


                          document.getElementById("bookingNav").style.height = "0%";


          });


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

function showAmenities(para){


var slideIndex = para;

        var slides = document.getElementsByClassName("myTravelSlides");
        
        var dots = document.getElementsByClassName("demoTravel");

        para > slides.length ? slideIndex = 1 : "";
        
        para < 1 ? slideIndex = slides.length : "";
        
        Array.prototype.forEach.call(slides, function(element,index) {


                slides[index].style.display = "none";

                dots[index].className = dots[index].className.replace("w3-opacity-off", "");




        });

        slides[slideIndex-1].style.display = "block";
        
        dots[slideIndex-1].className += "w3-opacity-off";


}

function showDivs(para) {



        var slideIndex = para;

        var slides = document.getElementsByClassName("mySlides");
        
        var dots = document.getElementsByClassName("demo");

        para > slides.length ? slideIndex = 1 : "";
        
        para < 1 ? slideIndex = slides.length : "";
        
        Array.prototype.forEach.call(slides, function(element,index) {


                slides[index].style.display = "none";

                dots[index].className = dots[index].className.replace("w3-opacity-off", "");




        });

        slides[slideIndex-1].style.display = "block";
        
        dots[slideIndex-1].className += "w3-opacity-off";

}

function showPanel(para) {

 var panel = para.nextElementSibling;

 if (panel.style.maxHeight){

      panel.style.maxHeight = null;
  
    } else {
  
      panel.style.maxHeight = panel.scrollHeight + "px";
  
    } 
 
}


function displayTravelModal(para) {

Array.prototype.forEach.call(para.parentElement.parentElement.parentNode.getElementsByClassName('mdl-card__title'), function(element,index) {


element.style.setProperty( 'background', 'url('+para.getAttribute("data-image")+') center / cover' );



        });

Array.prototype.forEach.call(para.parentElement.parentElement.parentNode.getElementsByClassName("captionTravel"), function(element,index) {


element.innerHTML = para.getAttribute("data-title");

        });

Array.prototype.forEach.call(para.parentElement.parentElement.parentNode.getElementsByClassName("descriptionTravel"), function(element,index) {


element.innerHTML = para.getAttribute("data-description");

        });





}


function loadTravelPictures(){



Array.prototype.forEach.call(document.getElementsByClassName('table'), function(element,index) {

element.querySelector(".btn") != null ? element.querySelector(".btn").click() : "" ;





});



}

function getInquiry() {


document.getElementById('Name').value = location.search.replace("?", "").split("&")[0].split("=")[1] != undefined ? location.search.replace("?", "").split("&")[0].split("=")[1] :  "" ; 

document.getElementById('Email').value =  location.search.replace("?", "").split("&")[1].split("=")[1] != undefined ? location.search.replace("?", "").split("&")[1].split("=")[1] : "" ; 



}

function startCountdown(){


var countDownDate = new Date("Jan 1, 2019 00:00:01").getTime();


var x = setInterval(function() {

   
    var now = new Date().getTime();
    

    var distance = countDownDate - now;
    

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    

    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }

}, 1000);

}


function goTotrip(event){


window.sessionStorage.parish = event.getAttribute("data-id");

window.location.assign("/your-trip.html");


}

function initMap() {


 var bounds = new google.maps.LatLngBounds();

        // Create a new StyledMapType object, passing it an array of styles,
        // and the name to be displayed on the map type control.
        var styledMapType = new google.maps.StyledMapType(

          [
  {
    "featureType": "poi.business",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]
  ,
            {name: 'Sinopia_Inn'});



        var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 4
  };
  var dashedPolyline = {
    strokeOpacity: 0,
    strokeColor: "#cb410b",
    icons: [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
    }]
  };


 var  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true,polylineOptions:dashedPolyline});
 var directionsService = new google.maps.DirectionsService;
 
 // Multiple Markers
    var markers = [
        ['Blue Lagoon',18.170649,-76.385876],
        ['Winnifred Beach',18.169946, -76.375721],
        ['Sinopia Inn',18.166518,-76.380669]
    ];
           


  

        // Create a map object, and include the MapTypeId to add
        // to the map type control.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:18.166518,lng:-76.380669},
          zoom: 16,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'Sinopia_Inn']
          }
        });

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(18.166630, -76.381253),
          map: map,
          title: 'Sinopia Inn'
        });

         google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
    });

var contentString = '<div id="content" class="infowindowLogo" >'+
        '<div id="siteNotice">'+
        '</div>'+
        '<img src="images/logo.png" class="logo infoWinLogo" style="width:250px;height:50px!important;"><p class="infowindowDescription" >  your home away from home here in Jamaica </p>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });


infowindow.open(map,marker);
 map.setTilt(45);
        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('Sinopia_Inn', styledMapType);
        map.setMapTypeId('Sinopia_Inn');
        directionsDisplay.setMap(map);

        //calculateAndDisplayRoute(directionsService, directionsDisplay);
  

      }


   function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var selectedMode = "WALKING";


directionsService.route({
          origin: {lat:18.170328,lng: -76.385918},  // Haight.
          destination: {lat:18.169087,lng: -76.373850},  // Ocean Beach.
          waypoints: [{
            location:new google.maps.LatLng(18.166630, -76.381253),
          stopover:false}],  optimizeWaypoints: true,
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
        
        


      }
      

      function googleTranslateElementInit() {

  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');

}


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '619443938242215',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


/* href="https://twitter.com/share" class="twitter-share-button" data-show-count="false"*/


function socialShareMail (para) {


var url = 'mailto:?subject='+para.alt+'&body='+this.location.href;

window.open(url,'_self');


}


function socialShareTwitter (para) {


var url = 'https://twitter.com/share?text='+para.alt;

window.open(url,'_self');


}

function socialShare (para) {





FB.ui(

  {
    method: 'share',
    href: para.alt,
  },

  function(response) {}

);

}



function socialSharePinInterest (para) {


var url = 'https://twitter.com/share?text='+para.alt;

window.open(url,'_self');


}

document.getElementById("defaultOpen") != null ? document.getElementById("defaultOpen").click() : "";

function openCity(evt, cityName) {
   
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}



