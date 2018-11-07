const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed'
      }
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null
      }
    case 'UPDATE_STATUS_SUCCESS':
      console.log('update success');
      return {
        ...state,
        authError: null
      }
    case 'UPDATE_STATUS_ERROR':
      console.log('update failed');
      return {
        ...state,
        authError: 'Update status failed'
      }
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.err.message
      }
    default:
      return state
  }
};

export default authReducer;