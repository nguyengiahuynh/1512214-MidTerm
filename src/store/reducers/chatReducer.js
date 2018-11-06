const initialState = {
  infoUser: null
}

const chatReducer =  (state = initialState, action) => {
  switch(action.type){
    case 'INFO_CHAT_USER':
      return{
        ...state,
        infoUser: action.info
      }
    default:
      return state
  }
};

export default chatReducer;