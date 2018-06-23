const React = require('react');
import ReservationConfirmation from './ReservationConfirmation.jsx';
import PersonalDetails from './PersonalDetails.jsx';
import DeliveryOptions from './DeliveryOptions.jsx';
import CollectionOptions from './CollectionOptions.jsx';





class CreatePassword extends React.Component {

	constructor(props) {

		super(props);


	}


	render() {



		return <article></article>



	}


}


class PaymentApp extends React.Component {

	constructor(props) {

		super(props);

		this.state = { deliveryDate: "", deliveryAddress: "", sinopiainnReservation: {}, sinopiainnreservationID: null, fname: "", lname: "", email: "", promotions: "yes", confirmation: null }

		this.delivery = this.delivery.bind(this);

		this.payment = this.payment.bind(this);

		this.confirm = this.confirm.bind(this);

		this.nextStep = this.nextStep.bind(this);

		this.showPanel = this.showPanel.bind(this);

		this.updateBooking = this.updateBooking.bind(this);

		this.handleFirstnameChange = this.handleFirstnameChange.bind(this);

		this.handleLastnameChange = this.handleLastnameChange.bind(this);

		this.handleEmailChange = this.handleEmailChange.bind(this);

		this.generatePaypal = this.generatePaypal.bind(this);

		this.promotions = this.promotions.bind(this);

		this.checkout = this.checkout.bind(this);

		this.updateReservation = this.updateReservation.bind(this);

		this.closeError = this.closeError.bind(this);

		this.formatDate = this.formatDate.bind(this);

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

		return dayNames[date.getDay()] + ', ' + date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();


	}

	closeError(e) {


		document.getElementById('myModal').style.display = "none";


	}


	getTmpReservation(e) {


		const context = this;

		const btnEvent = e;

		const btnTarget = e.target;

		this.xhttp = new XMLHttpRequest();

		this.xhttp.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {

				JSON.parse(this.responseText).ERROR == "" ?

					context.setState({ confirmation: JSON.parse(this.responseText).Reservation }, function () {

						context.nextStep(btnTarget);

					}) :

					(document.getElementById("spinnerText").style.opacity = 0, document.getElementById("spinnerIcon").style.opacity = 0, document.getElementById("spinnerText").innerHTML = " Something went wrong, please try again. You have not been charged.", document.getElementById("spinnerIcon").innerHTML = "mood_bad", document.getElementById("spinnerText").style.opacity = 1, document.getElementById("spinnerIcon").style.opacity = 1);

			}

		}

		this.xhttp.open("GET", '/api/reservationById?resId=' + this.state.sinopiainnreservationID, true);

		this.xhttp.send();
	}

	updateTmpReservation(e, payload_nonce, url) {

		const context = this;

		const btnTarget = e.target;

		var fileSelect = document.getElementById('file-select');

		var files = fileSelect.files;

		var formData = new FormData();

		for (var i = 0; i < files.length; i++) {

			var file = files[i];

			if (!file.type.match('image.*')) {

				alert('Please upload an photo / image file');
				break;

			}

			formData.append('photos', file, file.name);

		}

		formData.append('fname', this.state.fname);
		formData.append('lname', this.state.lname);
		formData.append('email', this.state.email);
		formData.append('promotions', this.state.promotions);
		formData.append('resID', this.state.sinopiainnreservationID);
		formData.append('status', "booked");

		this.xhttp = new XMLHttpRequest();

		this.xhttp.onreadystatechange = function () {




			(
				document.getElementById("spinnerText").innerHTML = "Processing your request and uploading your picture, please wait.",
				document.getElementById("spinnerIcon").innerHTML = "mood",
				document.getElementById('myModal').style.display = "table"
			);




			if (this.readyState == 4 && this.status == 200) {




				JSON.parse(this.responseText).ERROR == "" ?

					context.setState({ confirmation: JSON.parse(this.responseText).Reservation }, function () {


						document.getElementById('myModal').style.display = "none";
						context.nextStep(btnTarget);



					}) :

					(document.getElementById("spinnerText").style.opacity = 0, document.getElementById("spinnerIcon").style.opacity = 0, document.getElementById("spinnerText").innerHTML = " Something went wrong, please try again. You have not been charged.", document.getElementById("spinnerIcon").innerHTML = "mood_bad", document.getElementById("spinnerText").style.opacity = 1, document.getElementById("spinnerIcon").style.opacity = 1);


			}


		}

		this.xhttp.open("PUT", url, true);

		formData.get('photos') ? this.xhttp.send(formData) :

			(

				document.getElementById("spinnerText").innerHTML = " Something went wrong, please try again. You have not been charged.",
				document.getElementById("spinnerIcon").innerHTML = "mood_bad"

			);

	}

	//updateReservation(result,e,payload.nonce){

	updateReservation(e, payload_nonce, url) {

		//result.transaction.id

		const context = this;

		const btnTarget = e.target;

		var fileSelect = document.getElementById('file-select');

		var files = fileSelect.files;

		var formData = new FormData();

		for (var i = 0; i < files.length; i++) {

			var file = files[i];

			if (!file.type.match('image.*')) {

				continue;

			}

			formData.append('photos', file, file.name);

		}



		formData.append('fname', this.state.fname);
		formData.append('lname', this.state.lname);
		formData.append('email', this.state.email);
		formData.append('promotions', this.state.promotions);
		formData.append('resID', this.state.sinopiainnreservationID);
		formData.append('status', "booked");

		this.xhttp = new XMLHttpRequest();

		this.xhttp.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {

				JSON.parse(this.responseText).ERROR == "" ?

					context.setState({ confirmation: JSON.parse(this.responseText).Reservation }, function () {

						payload_nonce != null ? (document.getElementById('myModal').style.display = "none", context.checkout(payload_nonce, e)) :

							(document.getElementById("spinnerText").style.opacity = 0,
								document.getElementById("spinnerIcon").style.opacity = 0,
								document.getElementById("spinnerText").innerHTML = "Your're being redirected to AirBnB to complete your booking.",
								document.getElementById("spinnerText").style.opacity = 1,
								document.getElementById("spinnerIcon").style.opacity = 1,

								setTimeout(function () {

									context.nextStep(btnTarget);

									//window.location.href = "https://www.airbnb.co.uk/rooms/16317173";


								}, 3000));


					}) :

					(document.getElementById("spinnerText").style.opacity = 0, document.getElementById("spinnerIcon").style.opacity = 0, document.getElementById("spinnerText").innerHTML = " Something went wrong, please try again. You have not been charged.", document.getElementById("spinnerIcon").innerHTML = "mood_bad", document.getElementById("spinnerText").style.opacity = 1, document.getElementById("spinnerIcon").style.opacity = 1);


			}


		}

		this.xhttp.open("PUT", url, true);

		this.xhttp.send(formData);



	}




	checkout(nonce, e) {


		const context = this;

		var formData = new FormData();

		formData.append("nonce", nonce);
		formData.append("amount", Number(this.state.sinopiainnReservation.deposit).toFixed(2));
		formData.append("resID", this.state.sinopiainnreservationID);

		this.xhttp = new XMLHttpRequest();

		this.xhttp.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {


				JSON.parse(this.responseText).transaction != undefined ?  /*context.updateReservation(JSON.parse(this.responseText),e)*/ context.confirm(e) : (document.getElementById("spinnerText").style.opacity = 0, document.getElementById("spinnerIcon").style.opacity = 0, document.getElementById("spinnerText").innerHTML = " Something went wrong, please try again. You have not been charged.", document.getElementById("spinnerIcon").innerHTML = "mood_bad", document.getElementById("spinnerText").style.opacity = 1, document.getElementById("spinnerIcon").style.opacity = 1);



			}


		}



		this.xhttp.open("POST", "/api/checkout", true);

		this.xhttp.send(formData);



	}

	promotions(e) {


		e.target.checked ? this.setState({ promotions: "yes" }) : this.setState({ promotions: "no" });

	}


	generatePaypal() {


		const context = this;

		this.xhttp = new XMLHttpRequest();

		this.xhttp.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {



				var button = document.querySelector('#submit-button');

				braintree.dropin.create({
					authorization: this.responseText,
					container: '#dropin-container',
					paypal: {
						flow: 'checkout',
						amount: context.state.sinopiainnReservation.deposit,
						currency: 'USD'
					}
				}, function (createErr, instance) {

					createErr ? (document.getElementById("spinnerText").style.opacity = 0, document.getElementById("spinnerIcon").style.opacity = 0, document.getElementById("spinnerText").innerHTML = " Something went wrong. Please try again.", document.getElementById("spinnerIcon").innerHTML = "mood_bad", document.getElementById("spinnerText").style.opacity = 1, document.getElementById("spinnerIcon").style.opacity = 1) :


						button.addEventListener('click', function (e) {
							instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {

								document.getElementById('myModal').style.display = "table";
								//context.checkout(payload.nonce,e);
								context.updateReservation(e, payload.nonce, "/api/reservation");




							})
						});

				});

			}

		};



		this.xhttp.open("GET", "/api/checkout/client_token", true);

		this.xhttp.send();








	}

	handleFirstnameChange(event) {

		this.setState({ fname: event.target.value });

	}



	handleLastnameChange(event) {


		this.setState({ lname: event.target.value });


	}



	handleEmailChange(event) {

		this.setState({ email: event.target.value });


	}



	confirm(e) {


		this.nextStep(e);

		window.sessionStorage.removeItem("sinopiainnreservationID");


	}

	payment(e) {


		this.state.fname == "" || this.state.lname == "" || this.state.email == "" ?

			alert("All feilds are required") :

			this.state.email.match(/[a-z,A-Z,0-9,\.]{1,64}@[a-z,A-Z,0-9]{1,64}\.([a-z,A-Z]{3,64}|[a-z,A-Z]{2,64}\.[a-z,A-Z]{2,64})/g) ?

				document.getElementById("ckhterms").checked ?

					this.state.sinopiainnreservationID != null ?

						document.getElementById('file-select').value === "" ?

							alert("Please upload a photo of yourself")

							//: (this.updateTmpReservation(e, null, "/api/redirect")) //context.checkout(payload.nonce,e); ,//this.nextStep(e) )

							: (this.updateTmpReservation(e, null, "/api/booking"))

						: alert("")

					: alert("You must agree to our terms to complete your booking")

				: alert("Please check your email");

	}


	delivery(e) {


		this.state.fname == "" || this.state.lname == "" || this.state.email == "" ?

			alert("All feilds are required") :

			this.state.email.match(/[a-z,A-Z,0-9,\.]{1,64}@[a-z,A-Z,0-9]{1,64}\.([a-z,A-Z]{3,64}|[a-z,A-Z]{2,64}\.[a-z,A-Z]{2,64})/g) ?

				document.getElementById("ckhterms").checked ?

					this.state.sinopiainnreservationID != null ?

						document.getElementById('file-select').value === "" ?

							alert("Please upload a photo of yourself")

							//: (document.getElementById('myModal').style.display = "table", this.updateReservation(null, null, "/api/redirect")) //context.checkout(payload.nonce,e); ,//this.nextStep(e) )

							:(document.getElementById('myModal').style.display = "table", this.updateReservation(null, null, "/api/booking")) //context.checkout(payload.nonce,e); ,//this.nextStep(e) )
						
							: alert("")

					: alert("You must agree to our terms to complete your booking")

				: alert("Please check your email");

	}


	nextStep(e) {


		if (e.target) {

			if (e.target.parentElement.style.height) {

				e.target.parentElement.style.height = null;

				e.target.parentElement.previousSibling.style.backgroundColor = " #f7f7f7";

				e.target.parentElement.previousSibling.style.color = " #444";

				e.target.parentElement.nextElementSibling.nextElementSibling.style.backgroundColor = " #aa9d2e";

				e.target.parentElement.nextElementSibling.nextElementSibling.style.color = " #ffffff";

				e.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.style.height = e.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.scrollHeight + "px";

			}

		} else {


			if (e.parentElement.style.height) {

				e.parentElement.style.height = null;

				e.parentElement.previousSibling.style.backgroundColor = " #f7f7f7";

				e.parentElement.previousSibling.style.color = " #444";

				e.parentElement.nextElementSibling.nextElementSibling.style.backgroundColor = " #aa9d2e";

				e.parentElement.nextElementSibling.nextElementSibling.style.color = " #ffffff";

				e.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.style.height = e.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.scrollHeight + "px";

			}

		}



	}

	updateBooking(event, fname, lname, email) {

		const context = this;


		var fileSelect = document.getElementById('file-select');

		var files = fileSelect.files;

		var formData = new FormData();


		for (var i = 0; i < files.length; i++) {

			var file = files[i];

			if (!file.type.match('image.*')) {

				continue;

			}

			formData.append('photos', file, file.name);

		}



		formData.append('fname', fname),
			formData.append('lname', lname),
			formData.append('email', email),
			formData.append('reservationID', this.state.sinopiainnreservationID)

		this.xhttp = new XMLHttpRequest();

		this.xhttp.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {



			}

		};

		this.xhttp.open("PUT", "/api/reservation", true);


		this.xhttp.send(formData);




	}

	componentDidMount() {

		const context = this;







		window.sessionStorage.sinopiainnreservationID ? this.setState({ sinopiainnreservationID: window.sessionStorage.sinopiainnreservationID, sinopiainnReservation: JSON.parse(window.sessionStorage.sinopiainnReservation) }, function () {


			context.showPanel();
			context.generatePaypal();



		}) : (this.showPanel(), this.generatePaypal());





	}

	showPanel() {



		document.getElementsByClassName("accordion")[0].style.backgroundColor = " #aa9d2e";

		document.getElementsByClassName("accordion")[0].style.color = " #ffffff";

		document.getElementsByClassName("accordion")[0].nextElementSibling.style.height = document.getElementsByClassName("accordion")[0].nextElementSibling.scrollHeight + "px";



	}


	render() {

		const braintree = {

			width: "280px",
			height: "44px"


		}



		if (this.state.sinopiainnreservationID != null) {

			return <article>

				<div className="mdl-grid innerGrid">

					<div className="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone">


						<button className="accordion">1. Your Details</button>

						<div className="paymentPanel">

							<br />

							<large> Personal Details</large>

							<article>
								<PersonalDetails handleFirstnameChange={this.handleFirstnameChange} handleLastnameChange={this.handleLastnameChange} handleEmailChange={this.handleEmailChange} />

							</article>


							<large> please upload a photo so we know who to expect</large>

							<article>


								<input type="file" id="file-select" name="photo" multiple />

							</article>


							<article>




								<label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect smallLabel" >
									<input type="checkbox" id="ckhterms" name="terms" className="mdl-checkbox__input" /> Please agree to the terms of our villa <a href="../house-rules.pdf" className="house-rules">  here </a> before continuing </label>



							</article>
							<article>

								<label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect smallLabel" >
									<input type="checkbox" className="mdl-checkbox__input" onClick={(e) => this.promotions(e)} /> By submitting this form, you agree to receive our emails packed full of travel advice, exclusive offers and events. Tick the box to opt out.
									</label>


							</article>

							<button className="mdl-button mdl-js-button mdl-button--accent wishlistBtn accordinContinue " onClick={(e) => this.payment(e)}>

								Continue to payment

									</button>


						</div>

						<br />

						<button className="accordion">2. Payment</button>
						<div className="paymentPanel paymentDiv">

							<br />

							<large>   </large>

							<p>Thank you, we have received your booking. We are currently in the process of updating our payment gateway
										 and will send you an email confirmation with instructions on how to pay.
										 If you would like to continue with your booking please select the booking confirmation button below.</p>

							{/* <large> Choose a payment type :   </large>
							
							<a href="https://www.braintreegateway.com/merchants/srhrsqv4gy3hq4ph/verified" target="_blank">
							  <img src="https://s3.amazonaws.com/braintree-badges/braintree-badge-wide-dark.png"  style={braintree}/>
							  </a>
									 <section>
									 <article className="payment" >
							
									     <div id="dropin-container"></div>

									 </article>
									 </section> */}


							<button className="mdl-button mdl-js-button mdl-button--accent wishlistBtn accordinContinue" id="submit-button"
								onClick={(e) => this.getTmpReservation(e)}>

								Continue to booking confirmation

									</button>

						</div>

						<br />





						<button className="accordion">3. Order Confirmation</button>



						<ReservationConfirmation reservation={this.state.confirmation} />













					</div>


					<div className="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone orderSummary">

						<button className="accordion">Trip Summary</button>
						<div className="paymentPanel ">


							<ul className="demo-list-three mdl-list list">
								<li className="mdl-list__item mdl-list__item--three-line show">
									<span className="mdl-list__item-primary-content">

										<img src={this.state.sinopiainnReservation.rooms[0].photos[0]} className="w3-circle material-icons mdl-list__item-avatar mdl-list__item-avatar-reservation" />

										<span>{this.state.sinopiainnReservation.rooms.length} room(s)  for {this.state.sinopiainnReservation.numofdays} night(s)</span>
										<span className="mdl-list__item-text-body">


											{this.formatDate(new Date(this.state.sinopiainnReservation.fromdate))}  -  {this.formatDate(new Date(this.state.sinopiainnReservation.todate))}

										</span>
									</span>
								</li>
							</ul>


							<article className="summaryThirdchild">
								<label > <small>  Lodging Total </small> <small> $ {Number(this.state.sinopiainnReservation.roomTotal).toFixed(2)} </small> </label>


							</article>
							<article className="summaryThirdchild">
								<label > <small>  Amenities Total </small> <small> $ {this.state.sinopiainnReservation.amenityTotal} </small> </label>


							</article>

							<article className="summaryThirdchild">
								<label > <small>  Discount </small> <small> $ {this.state.sinopiainnReservation.discount} </small> </label>


							</article>


							<article className="summaryFirstchild">
								<label><small> TOTAL  </small>  <small> $ {this.state.sinopiainnReservation.total}  </small></label>

							</article>


							<article>
								<label>DEPOSIT POLICY:</label><br />
								<small > $ {this.state.sinopiainnReservation.deposit} USD deposit is required upon making a reservation. Final payment is due in full 14 days prior to arrival date, 30 days for Easter and 60 days for Christmas/New Year. This payment is non-refundable.</small> <br />
								<br></br>
								<label>CANCELLATION, NO-SHOW AND REFUND POLICIES:</label><br />
								<small>A full refund is due when cancelled 45 days prior to arrival, 60 days for Easter and 90 days during Christmas and New Year. The full amount of the stay is non-refundable when inside 45 days, 60 days for Easter and 90 days during Christmas and New Year.
		No refund and full amount of stay is forfeited when there is a no-show</small>
							</article>
						</div>




					</div>



				</div>


				<div id="myModal" className="modalReservationError">
					<span className="closeReservation cursor" onClick={(e) => this.closeError(e)}>&times;</span>
					<h1 id="spinnerText" className="spinnerText">Processing, please wait.</h1>
					<i className="material-icons" id="spinnerIcon">mood</i>
					<p className="mdl-spinner mdl-js-spinner mdl-spinner--single-color  progressIcons" id="spinner"></p>
				</div>


			</article>

		}

		else {
			return <article >

				<div className="mdl-grid innerGrid">

					<div className="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone">


						<button className="accordion">1. Your Details</button>

						<div className="paymentPanel">

							<br />

							<large> Personal Details</large>

							<article>
								<PersonalDetails handleFirstnameChange={this.handleFirstnameChange} handleLastnameChange={this.handleLastnameChange} handleEmailChange={this.handleEmailChange} />


							</article>


							<large> create a password now to checkout quicker next time</large>

							<article>

								<div className="mdl-grid innerGrid">

									<div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone">

										<label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" >
											<input type="radio" className="mdl-checkbox__input" name="registerOption" /> Yes
												</label>


									</div>


									<div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone">

										<label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" >
											<input type="radio" className="mdl-checkbox__input" name="registerOption" /> No
												</label>

									</div>
								</div>

							</article>

							<article>




								<label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect smallLabel" >
									<input type="checkbox" id="ckhterms" name="terms" className="mdl-checkbox__input" /> Please agree to the terms of our villa <a href="house-rules.pdf" className="house-rules">  here </a> before continuing </label>



							</article>

							<article>

								<label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect smallLabel" >
									<input type="checkbox" className="mdl-checkbox__input" /> By submitting this form, you agree to receive our emails packed full of travel advice, exclusive offers and events. Tick the box to opt out.
									</label>


							</article>

							<button className="mdl-button mdl-js-button mdl-button--accent wishlistBtn accordinContinue" onClick={(e) => this.delivery(e)}>

								Continue to delivery

									</button>

							<button className="" onClick={(e) => this.payment(e)}>
								Continue to Payment
									  </button>


						</div>
						<br />
						<button className="accordion">2. Delivery</button>

						<div className="paymentPanel">

							<br />

							<large> Choose a delivery type</large>

							<article>

								<div className="mdl-grid innerGrid">

									<div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone">

										<label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" >
											<input type="radio" className="mdl-checkbox__input" name="deliveryOption" /> Delivery
												</label>


									</div>


									<div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone">

										<label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" >
											<input type="radio" className="mdl-checkbox__input" name="deliveryOption" /> Click & Collect
												</label>

									</div>

								</div>

							</article>


							<article>
								<DeliveryOptions />

								<CollectionOptions />

							</article>



							<button className="mdl-button mdl-js-button mdl-button--accent wishlistBtn accordinContinue" onClick={(e) => this.payment(e)}>
								Continue to Payment
									  </button>



						</div>
						<br />
						<button className="accordion">3. Payment</button>
						<div className="paymentPanel ">

							<br />

							<large> Choose a payment type</large>



							<article className="paymentArticle">



								<button className="accordion payment">Pay with an eVocher</button>
								<div className="paymentPanel">



									<div className="mdl-textfield mdl-js-textfield">

										<input className="mdl-textfield__input" type="phone" pattern="[0-9]*" id="eVocher" onChange={this.handleVocherChange} />

										<span className="mdl-textfield__error">Only numbers and no spaces, please!</span>

									</div>


								</div>

								<button className="accordion payment">Apply a  promo code</button>
								<div className="paymentPanel">


									<div className="mdl-textfield mdl-js-textfield">

										<input className="mdl-textfield__input" type="phone" pattern="[0-9]*" id="promoCode" onChange={this.handleVocherChange} />

										<span className="mdl-textfield__error">Only numbers and no spaces, please!</span>

									</div>



								</div>

							</article>




							<br />

							<large> Choose a payment type :   </large>



							<section>
								<article className="payment" >




									<div id="dropin-container"></div>



								</article>
							</section>



							<button className="mdl-button mdl-js-button mdl-button--accent wishlistBtn accordinContinue" id="submit-button" >

								Continue to order confirmation

									</button>


						</div>

						<br />
						<button className="accordion">4. Order Confirmation</button>
						<div className="paymentPanel">



						</div>




					</div>


					<div className="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone">

						<button className="accordion">Order Summary</button>
						<label>Total</label><br />
						<label>Subtotal</label><br />
						<article>
							{this.state.deliveryDate}
							{this.state.deliverAddress}
						</article>



					</div>



				</div>





				<div id="myModal" className="modalReservation">
					<span className="closeReservation cursor" onClick={(e) => context.closeError(e)}>&times;</span>
					<div className="innermodalReservation">
						<h1 id="spinnerText" className="spinnerText">Processing for request and uploading your picture, please wait.</h1>
						<i className="material-icons" id="spinnerIcon">mood</i>
						<p className="mdl-spinner mdl-js-spinner mdl-spinner--single-color  progressIcons" id="spinner"></p>
					</div>
				</div>


			</article>

		}

	}
}


module.exports = PaymentApp;
