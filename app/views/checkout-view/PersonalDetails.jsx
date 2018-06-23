const React = require('react');

class PersonalDetails extends React.Component {

	constructor(props) {

		super(props);

	}



	render() {


		return <article className="personalDetails">
			<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-focused">
				<input className="mdl-textfield__input firstname" type="text" id="firstname" type="text" pattern="((^[A-Z,a-z]([-']?[A-Z,a-z]+)*( [A-Z,a-z]([-']?[A-Z,a-z]+)*)+$)|(^[A-Z,a-z]([-']?[A-Z,a-z]+)*(\s)))|((^[A-Z,a-z]*))" onChange={this.props.handleFirstnameChange} />
				<label className="mdl-textfield__label" htmlFor="firstname">FIRST NAME</label>
				<span className="mdl-textfield__error">Only alphabet and no spaces, please!</span>
			</div>


			<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
				<input className="mdl-textfield__input" type="text" pattern="((^[A-Z,a-z]([-']?[A-Z,a-z]+)*( [A-Z,a-z]([-']?[A-Z,a-z]+)*)+$)|(^[A-Z,a-z]([-']?[A-Z,a-z]+)*(\s)))|((^[A-Z,a-z]*))" id="lastname" onChange={this.props.handleLastnameChange} />
				<label className="mdl-textfield__label" htmlFor="lastname">LAST NAME</label>
				<span className="mdl-textfield__error">Only alphabet and no spaces, please!</span>
			</div>

			<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
				<input className="mdl-textfield__input" type="email" onChange={this.props.handleEmailChange} pattern="[a-z,A-Z,0-9,\.]{1,64}@[a-z,A-Z,0-9]{1,64}\.([a-z,A-Z]{3,64}|[a-z,A-Z]{2,64}\.[a-z,A-Z]{2,64})" id="Email" />
				<label className="mdl-textfield__label" htmlFor="email">Email</label>
				<span className="mdl-textfield__error">Please check your email!</span>
			</div>

		</article>


	}



}



module.exports = PersonalDetails;