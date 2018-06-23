$(document).ready(function () {

$('#myCarousel,#competitonsCarousel').carousel({

interval: 10000

})


$('.carousel .item').each(function () {

var next = $(this).next();

if (!next.length) {

next = $(this).siblings(':first');

}

next.children(':first-child').clone().appendTo($(this));

if (next.next().length > 0) {

next.next().children(':first-child').clone().appendTo($(this));

} else {

$(this).siblings(':first').children(':first-child').clone().appendTo($(this));

}

});

});


function loadCarousel(){

  var divNode1,divNode2,imgNode,linkNode;    

this.xhttp = new XMLHttpRequest();

	this.xhttp.onreadystatechange = function() {

if (this.readyState == 4 && this.status == 200) {
	
window.sessionStorage.recipeID = null;			
			
var z = 0; 

for(var x = z ; x <  JSON.parse(this.responseText).length; x++){
	
divNode1 = document.createElement("div"); 

x === 0 ? divNode1.className = 'item active' : divNode1.className = 'item';

for(var y = 0 ; y <  3 ; y++){
	

						divNode2 = document.createElement("div"); 

						divNode2.className = 'col-xs-4';

						linkNode= document.createElement("a"); 

						imgNode = document.createElement("img");    

						imgNode.setAttribute("src", JSON.parse(this.responseText)[x+y >= JSON.parse(this.responseText).length ? 0 : x+y].image_url);

						imgNode.className = 'img-responsive';

						imgNode.addEventListener("click", function(e){
         
						              window.sessionStorage.recipeID = e.target.getAttribute("data-id");

						              window.location.assign("recipe.html");

						});


						linkNode.appendChild(imgNode); 

						divNode2.appendChild(linkNode);

						divNode1.appendChild(divNode2);  

z += 1 ;


}
		
	document.getElementsByClassName("recipes-carousel-inner")[0].appendChild(divNode1);
						
}


			
			
		}

}

this.xhttp.open("GET", "/api/recipe?", true);

this.xhttp.setRequestHeader("Content-Type", "application/json");

this.xhttp.send();


}