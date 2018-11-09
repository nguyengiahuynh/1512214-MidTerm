const initialState = {
  infoUser: null
}

const chatReducer =  (state = initialState, action) => {
  switch(action.type){
    case 'INFO_USER_CHAT_WITH':
      return{
        ...state,
        infoUser: action.data
      }
    default:
      return state
  }
};

export default chatReducer;