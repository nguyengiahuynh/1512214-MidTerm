import React, { Component } from 'react'
import '../../css/SignIn.css'
import firebase from "firebase";
import { connect } from 'react-redux'
import { signIn, loginWithGoogle } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'


var provider = new firebase.auth.GoogleAuthProvider();

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    handleGoogleSignin = () => {
        this.props.loginWithGoogle()
    }

    render() {
        const {authError, auth} = this.props;
        if (auth.uid)
            return <Redirect to='/' />
        return (
            <div className="text-center" style={{width: '40%', margin: '40px auto', backgroundColor: 'white'}}>
                <form id="formLogin" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <input type="email" id="email" className="validate" onChange={this.handleChange}/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input type="password" id="password" className="validate" onChange={this.handleChange}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field text-center">
                        <button className="btn teal lighten-1 z-depth-0">Login</button>
                        <div className="red-text center">
                            {authError ? <span>Login failed!!! Wrong email or password</span> : null}
                        </div>
                    </div>
                </form>
                <p className="grey-text text-darken-3">You don't have account ?</p>
                <a href="/signup">Sign up now</a>
                <div className="text-center">
                    <button className="loginBtn loginBtn--google" onClick={this.handleGoogleSignin.bind(this)}>
                        Login with Google
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
        loginWithGoogle: () => dispatch(loginWithGoogle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)   
