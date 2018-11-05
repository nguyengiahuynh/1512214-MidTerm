import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state)
  }
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) 
        return <Redirect to='/' /> 
    return (
      <div className="text-center" style={{width: '40%', margin: '40px auto', backgroundColor: 'white'}}>
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <input type="email" id='email' className="validate" onChange={this.handleChange} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input type="password" id='password' className="validate" onChange={this.handleChange} />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field">
            <input type="text" id='firstName' className="validate" onChange={this.handleChange} />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="input-field">
            <input type="text" id='lastName' className="validate" onChange={this.handleChange} />
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div className="input-field text-center">
            <button className="btn teal lighten-1 z-depth-0">Sign Up</button>
            <div className="red-text center">
                {authError ? <span>{authError}</span> : null}
            </div>
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
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)