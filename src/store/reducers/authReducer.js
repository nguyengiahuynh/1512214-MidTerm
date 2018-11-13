const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login failed'
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'UPDATE_STATUS_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'UPDATE_STATUS_ERROR':
      return {
        ...state,
        authError: 'Update status failed'
      }
    case 'SIGNOUT_SUCCESS':
      return state
    default:
      return state
  }
};

export default authReducer;