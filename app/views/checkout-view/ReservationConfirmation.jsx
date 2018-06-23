const React = require('react');

class RoomRowName extends React.Component {
	

render (){
	
		return <tr>
					
										<th className="mdl-data-table__cell--non-numeric" colSpan="3"> {this.props.element.name} </th>

									

			</tr>
	}



}
class RoomRow extends React.Component {
	

render (){
	
	
	return <table>
	<tbody>
			<tr>
			<th className="mdl-data-table__cell--non-numeric" colSpan="3"> {this.props.element.name} </th>
			</tr>
			<tr>
					
										<th className="mdl-data-table__cell--non-numeric"> {this.props.element.description} </th>

										<th className="mdl-data-table__cell--non-numeric"> USD </th>

										<th className="moneyCell"> { (this.props.element.price * this.props.reservation.numofdays).toFixed(2)  }  </th>

			</tr>
			</tbody>
			</table>
			
							
				
	
	}



}

class AmenityRow extends React.Component {
	


render (){
	
	
	return 							<tr>

											<th className="mdl-data-table__cell--non-numeric">  {this.props.element.name}  </th>

											<th className="mdl-data-table__cell--non-numeric">   USD </th>

											<th className="moneyCell"> 

											 { this.props.element.frequency === 'person'  ?  (this.props.element.price * this.props.reservation.guests).toFixed(2)  :   this.props.element.frequency === 'room'   ?   ( this.props.element.price * this.props.reservation.rooms.length ).toFixed(2) :   ( this.props.element.price * this.props.reservation.numofdays).toFixed(2)      }  

											</th>

											</tr>

	
	
	}



}

class OfferRow extends React.Component {
	
render (){
	
	
	return <tr>
										<th className="mdl-data-table__cell--non-numeric"> {this.props.element.name} </th>

										<th className="mdl-data-table__cell--non-numeric"> USD </th>

										<th className="moneyCell">  { (this.props.element.amount * this.props.reservation.roomTotal).toFixed(2) } </th>

						</tr>
									
									
		

	
	
	}



}



class ReservationConfirmation extends React.Component {
	
	constructor(props) {

super(props);


this.formatDate  = this.formatDate.bind(this);

}


formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

 var dayNames = [
    "Sun", "Mon", "Tue",
    "Wed", "Thu", "Fri", "Sat"
  ];

  return  dayNames[date.getDay()]+', '+date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
  
  
}



render(){
	
		   const context = this ; 

var roomsName = [] 
var rooms = [] 
var offers = []; 
var amenities = []; 



	
	if(this.props.reservation != null) { 
		
		
		
		

this.props.reservation.rooms.forEach(function(element,index){
	
	
	
	roomsName.push(< RoomRowName   element={element}   key={"RoomsNames"+index}/>);
	
	rooms.push( < RoomRow reservation={context.props.reservation}  element={element}  key={"Rooms"+index} /> );
	
	
}) ,


this.props.reservation.offers.forEach(function(element,index){
	
	
	offers.push(<OfferRow reservation={context.props.reservation}  element={element}  key={"Offers"+index} /> );
	
	
}) ,



this.props.reservation.amenities.forEach(function(element,index){
	
	
	amenities.push( < AmenityRow reservation={context.props.reservation}  element={element}  key={"Amenities"+index} />   );
	
	
}) ;



		
	return 	<div className="paymentPanel">
								
								
								 <br />
									 
									 		  <medium> Thank you {this.props.reservation.fname} for your reservation. We will contact you shortly via the email you provided to complete your booking..   </medium>
								
	
	
	
	<article>
            <table className="">
 <tbody>
    
<tr>

<td colSpan="3"> <h6 className="mdl-data-table__cell--non-numeric" >  {this.formatDate(new Date(this.props.reservation.fromdate)) }  -  {this.formatDate(new Date(this.props.reservation.todate))} </h6> </td>

</tr>
</tbody>
</table>

<table>
    <tr>

        <th colSpan="3" className="mdl-data-table__cell--non-numeric" > {rooms} </th>

    </tr>
	
</table>
<table>
<thead>
    <tr>

        <th colSpan="3" className="mdl-data-table__cell--non-numeric" > <h6 >  Amenities </h6> </th>

    </tr>
	
	</thead>
	<tbody>
	{amenities}
	</tbody>
	</table>
	
	
<table>
<thead>
    <tr>


        <th colSpan="3" className="mdl-data-table__cell--non-numeric" > <h6 >  Offers </h6> </th>

    </tr>
	
</thead>
	<tbody>
	{offers}
  
 </tbody>
</table>  
   <table>
<thead>
    <tr>


        <th colSpan="3" className="mdl-data-table__cell--non-numeric" > <h6 >  Personal Details </h6> </th>

    </tr>

</thead>
	<tbody>
    <tr>

        <th className="mdl-data-table__cell--non-numeric" >   First Name :  </th>
        <th className="mdl-data-table__cell--non-numeric" colSpan="2">  {this.props.reservation.fname}  </th>
 

    </tr>

    <tr>

        <th className="mdl-data-table__cell--non-numeric" >   Last Name :  </th>
        <th className="mdl-data-table__cell--non-numeric" colSpan="2"> {this.props.reservation.lname}   </th>


    </tr>

      <tr>

        <th className="mdl-data-table__cell--non-numeric" > Phone :  </th>
        <th className="mdl-data-table__cell--non-numeric" colSpan="2" >   {this.props.reservation.phone}  </th>
      

    </tr>

      <tr>

        <th className="mdl-data-table__cell--non-numeric" >  Email :  </th>
        <th className="mdl-data-table__cell--non-numeric" colSpan="2">  {this.props.reservation.email} </th>
      

    </tr>

    <tr>

        <th className="mdl-data-table__cell--non-numeric" >   Guests : </th>
        <th className="mdl-data-table__cell--non-numeric" colSpan="2"> {this.props.reservation.guests}  </th>
     

    </tr>
</tbody>
</table>
 <table>
<thead>
    <tr>


        <th className="mdl-data-table__cell--non-numeric" >TOTAL :  </th>
        <th className="mdl-data-table__cell--non-numeric" >USD  </th>
        <th className="moneyCell" >   {this.props.reservation.total}</th>

    </tr>



      <tr>

        <th className="mdl-data-table__cell--non-numeric" >   TAX:  </th>
        <th className="mdl-data-table__cell--non-numeric" >   USD  </th>
        <th className="moneyCell" >  </th>

    </tr>

        <tr>

        <th className="mdl-data-table__cell--non-numeric" >  DEPOSIT TO PAID : </th>
        <th className="mdl-data-table__cell--non-numeric" >    USD  </th>
        <th className="moneyCell" > {this.props.reservation.deposit} </th>

    </tr>

      <tr>

        <th className="mdl-data-table__cell--non-numeric" >   BALANCE:  </th>
        <th className="mdl-data-table__cell--non-numeric" >  USD  </th>
        <th className="moneyCell"> {this.props.reservation.deposit}  </th>

    </tr>





  </thead>
</table>  
 </article>

								</div>
								
}else{
	
	
	return <article>
	
	</article>
	
	
	}
	
	
	}
	
}


module.exports = ReservationConfirmation;