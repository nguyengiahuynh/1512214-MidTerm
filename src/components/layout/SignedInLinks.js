import React from 'react'
import { NavLink } from 'react-router-dom'
import firebase from "firebase";
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions' 

const SignedInLinks = (props) => {
	return (
        <ul className="right">
            <li><NavLink to='/create'>New Project</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className='btn pink lighten'>Xin chào {props.auth.email}!!</NavLink></li>
        </ul>
	)
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)