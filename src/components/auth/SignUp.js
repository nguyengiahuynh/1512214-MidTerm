import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class SignUp extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {
    const { auth } = this.props;
    if (auth.uid) 
        return <Redirect to='/' /> 
    return (
      <div className="text-center" style={{width: '40%', margin: '40px auto', backgroundColor: 'white'}}>
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <input type="email" id='email' className="validate" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input type="password" id='password' className="validate" />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field">
            <input type="text" id='firstName' className="validate" />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="input-field">
            <input type="text" id='lastName' className="validate" />
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div className="input-field text-center">
            <button className="btn teal lighten-1 z-depth-0" onClick={this.handleSubmit}>Sign Up</button>
          </div>
        </form>
        <p className="grey-text text-darken-3">You had account ?</p>
        <a href="/signin">Log in now</a>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)