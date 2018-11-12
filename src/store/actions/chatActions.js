import { createIDChat } from '../../functions/'

  export const sendContents = (data) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firestore = getFirestore()
      const firebase = getFirebase()
      
      console.log(data);
      let uid = firebase.auth().O
      if(data.content) {
        let IDChat = createIDChat(uid, data.userChatWith);
        let arr = []
        if (data.contents)
          arr = data.contents
        let date = new Date();
        arr.push({
          uid: uid,
          chatTime: date.toString(),
          content: data.content
        })
        firestore.get({
          collection: 'chat',
          where: ['id', '==', IDChat]
        }).then((res) => {
          if (res.docs.length) {
            let id = res.docs[0].id;
            firestore.update({collection: 'chat', doc: id}, {contents: arr, lastChatTime: date.toString()});
          }
          else {
            firestore.collection('chat').doc(IDChat).set({
              id: IDChat,
              lastChatTime: date.toString(),
              contents: arr
            })
          }
        })
      }
    }
  }

  export const infoUserChatWith = (UID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firestore = getFirestore()
      const firebase = getFirebase()
      firestore.collection('users').doc(UID).get().then((res) => {
        let data = res.data();
        dispatch({type: 'INFO_USER_CHAT_WITH', data});
      })
    }
  }