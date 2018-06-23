
"use strict";


$(window).resize(function () {


  $('.hero-section').css("height", $('.hero-section-image').css("height"));




});


$('.lang-select').click(function () {


  $(this).attr('data-lang') === "en" ? document.cookie = "googtrans=/en/en" : null;

  $('.goog-te-combo').val($(this).attr('data-lang'));

  window.location = $(this).attr('href');

  location.reload();


});

$(window).scroll(function () {



  if ($(this).scrollTop() > $(".mdl-layout__content").position().top) {



    $('.reservationform').addClass("sticky");

  }

  else {

    $('.reservationform').removeClass("sticky");

  }



});


$(function () {


  $('#fromdate,#fromdatePage').datepicker({ dateFormat: "D, d MM yy" }).on("change", function () {


    $(this).parent().addClass('is-focused');


  });


  $('#todate,#todatePage').datepicker({ dateFormat: "D, d MM, yy" }).on("change", function () {




    $(this).parent().addClass('is-focused');



  });


});




var dialog = document.querySelector('dialog');

var showModalButton = document.querySelector('.show-modal');

if (!dialog.showModal) {

  dialogPolyfill.registerDialog(dialog);

}

showModalButton.addEventListener('click', () => {

  dialog.style.display = "block";

  dialog.showModal();

});

dialog.querySelector('.closeDialog').addEventListener('click', () => {

  dialog.close();

  dialog.style.display = "none";

});




//window.localStorage.getItem("sinopiaInn-checkout-bag") != null ? document.getElementById("basket").innerHTML = JSON.parse(window.localStorage.getItem("sinopiaInn-checkout-bag")).length: document.getElementById("basket").innerHTML = 0   ;

typeof (Storage) !== "undefined" ? sessionStorage.privacy != null ? "" : document.getElementsByClassName("modal-footer-panel")[0].style.height = "auto" : "";

document.getElementsByName("optradio").forEach((element) => {

  element.addEventListener("change", (event) => {


    event.target.value === 'yes' ? (sessionStorage.privacy = "yes", document.getElementsByClassName("modal-footer-panel")[0].style.display = "none") : (sessionStorage.removeItem("privacy"), document.getElementsByClassName("modal-footer-panel")[0].style.display = "none");


  });

});

document.getElementById('subscribers_email').addEventListener('blur', function (e) {


  this.value.match(/[a-z,A-Z,0-9,\.]{1,64}@[a-z,A-Z,0-9]{1,64}\.([a-z,A-Z]{3,64}|[a-z,A-Z]{2,64}\.[a-z,A-Z]{2,64})/g) ? (window.sessionStorage.subscribers_email = this.value, window.location.assign("/public/register.html")) : alert('Please check your email');


});

// document.getElementsByClassName('download_buttons')[0].addEventListener('click', (e) => {

//   window.location.assign("mobile-app.html");

// });

// document.getElementsByClassName('download_buttons')[1].addEventListener('click', (e) => {

//   window.location.assign("mobile-app.html");

// });


document.getElementById('contactForm') != null ? document.getElementById('contactForm').addEventListener('submit', function (e) {

  e.preventDefault();

  document.getElementById('Email').value.match(/[a-z,A-Z,0-9,\.]{1,64}@[a-z,A-Z,0-9]{1,64}\.([a-z,A-Z]{3,64}|[a-z,A-Z]{2,64}\.[a-z,A-Z]{2,64})/g) ? this.submit() : alert('Please check your email');


}) : "";


Array.prototype.forEach.call(document.getElementsByClassName('resForm'), (element, index) => {



  element.addEventListener("submit", function (e) {


    e.preventDefault();

    const today = new Date();

    const fromDate = new Date(e.target.querySelector('.fromdate').value);

    const toDate = new Date(e.target.querySelector('.todate').value);

    toDate < fromDate ? alert('Please check you check out date.') : (today > fromDate || toDate > toDate) ? alert('Dates cannot be in the past.') : (

      toDate == 'Invalid Date' || fromDate == 'Invalid Date') ? alert('Please check your reservation dates.') : (window.sessionStorage.fromdate =

        fromDate.getDate() + "-" + (fromDate.getMonth() + 1) + "-" + fromDate.getFullYear(),

        window.sessionStorage.todate = toDate.getDate() + "-" + (toDate.getMonth() + 1) + "-" + toDate.getFullYear(),

        window.sessionStorage.lengthOfstay = Math.round((toDate - fromDate) / (1000 * 60 * 60 * 24)),

        this.submit());


  });


});





function startCountdown() {


  var countDownDate = new Date("Jan 1, 2019 00:00:01").getTime();


  var x = setInterval(() => {


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


document.getElementById("countdown") != undefined ? window.startCountdown = startCountdown() : null;
document.getElementById("shopPage") != undefined ? window.showSubmenu = showSubmenu() : null;



document.getElementsByClassName("demoTravel") != undefined ?

  Array.prototype.forEach.call(document.getElementsByClassName("demoTravel"), (element, index) => {


    element.addEventListener("click", (e) => {



      window.showAmenities = showAmenities(parseInt(element.getAttribute('data-id')));


    });


  })

  : null;




function displayTravelModal(para) {

  Array.prototype.forEach.call(para.parentElement.parentElement.parentNode.getElementsByClassName('featureImg'), (element, index) => {


    //element.style.setProperty( 'background', 'url('+para.getAttribute("data-image")+') center / cover' );



    element.src = para.getAttribute("data-image");

  });

  Array.prototype.forEach.call(para.parentElement.parentElement.parentNode.getElementsByClassName("captionTravel"), (element, index) => {


    element.innerHTML = para.getAttribute("data-title");

  });

  Array.prototype.forEach.call(para.parentElement.parentElement.parentNode.getElementsByClassName("descriptionTravel"), (element, index) => {


    element.innerHTML = para.getAttribute("data-description");

  });



}



document.getElementById("travel") != undefined ? (Array.prototype.forEach.call(document.getElementsByClassName('table'), (element, index) => {

  element.querySelector(".btn") != null ? window.loadTravelPictures = displayTravelModal(element.querySelector(".btn")) : null;


}), Array.prototype.forEach.call(document.getElementsByClassName('btn'), (element, index) => {

  element.addEventListener("click", (e) => { window.displayTravelModal = displayTravelModal(element) });

})) : null;








function googleTranslateElementInit() {

  var e = document.getElementsByClassName("goog-te-combo")[0];

  new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');





}

//window.googleTranslateElementInit = googleTranslateElementInit();

window.fbAsyncInit = function () {
  FB.init({
    appId: '619443938242215',
    xfbml: true,
    version: 'v2.8'
  });
  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



document.getElementById("mail").addEventListener("click", function (e) {


  window.open('mailto:?subject=' + this.alt + '&body=' + this.location.href, '_self');


});

document.getElementById("twitter").addEventListener("click", function (e) {


  window.open('https://twitter.com/share?text=' + this.alt, '_self');


});

document.getElementById("facebook").addEventListener("click", function (e) {


  FB.ui(

    {
      method: 'share',
      href: this.alt,
    },

    function (response) { }

  );



});




document.getElementById("defaultOpen") != null ?


  (window.openCity = openCity(document.querySelector(".tablinks")),
    Array.prototype.forEach.call(document.getElementsByClassName("tablinks"), (element, index) => {


      element.addEventListener("click", (e) => {


        window.openCity = openCity(element);


      });


    })) : null;


function openCity(element) {



  for (var i = 0; i < document.getElementsByClassName("tabcontent").length; i++) {
    document.getElementsByClassName("tabcontent")[i].style.display = "none";
  }


  for (var i = 0; i < document.getElementsByClassName("tablinks").length; i++) {
    document.getElementsByClassName("tablinks")[i].className = document.getElementsByClassName("tablinks")[i].className.replace("active", "");
  }
  document.getElementById(element.getAttribute("data-id")).style.display = "block";
  element.className += " active";



}





function initMap() {



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
    { name: 'Sinopia_Inn' });



  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 18.167217, lng: -76.380402 },
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

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.open(map, marker);
  });

  var contentString = '<div id="content" class="infowindowLogo" >' +
    '<div id="siteNotice">' +
    '</div>' +
    '<img src="images/logo.png" class="logo infoWinLogo" style="width:250px;height:50px!important;"><p class="infowindowDescription" >  your home away from home here in Jamaica </p>' +
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });


  infowindow.open(map, marker);
  map.setTilt(45);
  map.mapTypes.set('Sinopia_Inn', styledMapType);
  map.setMapTypeId('Sinopia_Inn');
  //  directionsDisplay.setMap(map);


}


document.getElementById('contacts') != null ? (window.initMap = initMap(), window.getInquiry = getInquiry()) : null;


function getInquiry() {


  document.getElementById('Name').value = location.search.replace("?", "") != undefined ? location.search.replace("?", "").split("&")[0].split("=")[1] != undefined ? location.search.replace("?", "").split("&")[0].split("=")[1] : null : null;

  document.getElementById('Email').value = location.search.replace("?", "") != undefined ? location.search.replace("?", "").split("&")[1].split("=")[1] != undefined ? location.search.replace("?", "").split("&")[1].split("=")[1] : null : null;



}


Array.prototype.forEach.call(document.getElementsByClassName("sub-menu-menu-menu"), (element, index) => {


  element.addEventListener("click", (e) => {


    var url = "/shop/cat/?cat=" + e.target.getAttribute("data-category") + "&sub=" + e.target.getAttribute("data-sub-catergory");

    window.sessionStorage.sinopiaInncatergory = e.target.getAttribute("data-category");

    window.sessionStorage.sinopiaInnsubcatergory = e.target.getAttribute("data-sub-catergory");

    window.location.assign(url);

  });


});





Array.prototype.forEach.call(document.getElementsByClassName("mdl-layout__tab"), (element, index) => {

  element.addEventListener("mouseover", (e) => {

    e.target.getAttribute("data-id") != null ?

      e.target.classList.contains("submenu")

        ? document.getElementsByClassName("active_sub_menu")[0] != undefined

          ? (removeClass(), addClass(e.target.getAttribute("data-id")))

          : (document.getElementById("sub-menu-menu").classList.add("active_sub_menu_"), addClass(e.target.getAttribute("data-id")))

        : document.getElementById(e.target.getAttribute("data-id")).classList.add("active_menu")

      : (removeClass(), document.getElementsByClassName("active_sub_menu_")[0].classList.remove("active_sub_menu_"), document.getElementsByClassName("active_menu")[0].classList.remove("active_menu"));


  });

});


Array.prototype.forEach.call(document.getElementsByClassName("submenu"), (element, index) => {

  element.addEventListener("mouseout", (e) => {


    document.getElementById(e.target.getAttribute("data-id")).style.display = "none";


  });


});



function showSubmenu() {

  document.getElementsByClassName(window.sessionStorage.sinopiaInncatergory)[2].classList.add("active_sub_menu");


}


function addClass(para) {


  Array.prototype.forEach.call(document.getElementsByClassName(para), (element, index) => {


    element.classList.add("active_sub_menu");

  });


}

function removeClass() {


  var toRemove = [];

  Array.prototype.forEach.call(document.getElementsByClassName("active_sub_menu"), (element, index) => {


    toRemove.push(element);



  });


  toRemove.forEach(function (el) {


    el.classList.remove("active_sub_menu");


  });

}


function showAmenities(para) {


  var slideIndex;

  slideIndex = para > document.getElementsByClassName("myTravelSlides").length ? 1 : para;

  slideIndex = para < 1 ? document.getElementsByClassName("myTravelSlides").length : para;

  Array.prototype.forEach.call(document.getElementsByClassName("myTravelSlides"), (element, index) => {


    document.getElementsByClassName("myTravelSlides")[index].style.display = "none";

    document.getElementsByClassName("demoTravel")[index].className = document.getElementsByClassName("demoTravel")[index].className.replace("w3-opacity-off", "");

  });

  document.getElementsByClassName("myTravelSlides")[slideIndex - 1].style.display = "block";

  document.getElementsByClassName("demoTravel")[slideIndex - 1].className += " w3-opacity-off";

}

function showDivs(para) {



  var slideIndex;

  slideIndex = para > document.getElementsByClassName("mySlides").length ? 1 : para;

  slideIndex = para < 1 ? document.getElementsByClassName("mySlides").length : para;


  Array.prototype.forEach.call(document.getElementsByClassName("mySlides"), (element, index) => {

    document.getElementsByClassName("mySlides")[index].style.display = "none";



    document.getElementsByClassName("demo")[index].className = document.getElementsByClassName("demo")[index].className.replace("w3-opacity-off", " ");


  });



  document.getElementsByClassName("mySlides")[slideIndex - 1].style.display = "block";

  document.getElementsByClassName("demo")[slideIndex - 1].className += " w3-opacity-off";

}


document.getElementById("rooms") != undefined ? (window.showDivs = showDivs(1), window.showAmenities = showAmenities(1)) : document.getElementById("mainPage") != undefined ? (window.showDivs = showDivs(1)) : null;



Array.prototype.forEach.call(document.getElementsByClassName("demo"), (element, index) => {


  element.addEventListener("click", (e) => {

    window.showDivs = showDivs(parseInt(element.getAttribute('data-id')));


  });


});

