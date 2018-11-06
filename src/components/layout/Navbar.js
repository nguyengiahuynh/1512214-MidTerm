import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
	// const user = localStorage.getItem("name");
	const {auth} = props;
	const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
	return (
		<div>
			<nav className="nav-wrapper grey darken-3">
				<Link to='/' className="brand-logo">1512214-FireBase-ChatApp</Link>
				{links}
			</nav>
			<br />
			<br />
		</div>
	)
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		auth: state.firebase.auth
	}
}

export default connect(mapStateToProps)(Navbar)