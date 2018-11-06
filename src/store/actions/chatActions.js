import {storage} from '../../config/FireBaseConfig'
import {formatDistance, compareDesc} from 'date-fns'
import locale from 'date-fns/locale/vi'
import format from 'date-fns/format'


export function createStringIDChat(string1, string2){
    if(string1 < string2){
      return string1 + string2;
    }
    return string2 + string1;
  }

export function formatDate(date, name='DD/MM/YYYY') {
    return format(new Date(date), name, {locale: locale})
} 

export function compareDateReverse(dateLeft, dateRight){
  return compareDesc(new Date(dateLeft), new Date(dateRight))
}

export function fromNowTimeStamp(timestamp) {
  let date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
	return formatDistance(new Date(date), new Date(), {addSuffix: true, locale: locale})
}

export const sendMessage = (data, callback) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firestore = getFirestore()
      const firebase = getFirebase()
      let uid = firebase.auth().O
      if(data.content || data.files.length){
        let arr = data.messages
        let date = new Date()
        let createStringIDChat = createStringIDChat(uid, data.infoUser.uid)
        let content = ""
        let tempImages = []
        if(data.content){
          content = data.content
        }
        if(data.files.length){
          let storageRef = storage.ref()
          let imagesStream = []
          data.files.forEach((item) =>{
            let stream = storageRef.child(`images/${new Date().getTime()}`).put(item)
            imagesStream.push(stream)
          })
          Promise.all(imagesStream).then((allUrls) => {
            allUrls.forEach((item) => {
              item.ref.getDownloadURL().then((url) => {
                tempImages.push(url)
              })
            })
          }).then(() => {
            arr.push({
              belongTo: uid,
              chatAt: date.toString(),
              content: content,
              images: tempImages
            })
            console.log(arr);
            firestore.get({collection: 'chatbox', where: ['id', '==', createStringIDChat]}).then((dataFirestore) => {
              if(dataFirestore.docs.length){
                let id = dataFirestore.docs[0].id
                firestore.update({collection: 'chatbox', doc: id}, {lastChatAt: date.toString(), messages: arr}).then(() => {
                  callback()
                })
              }
              else{
                firestore.collection('chatbox').doc(createStringIDChat).set({
                  id: createStringIDChat,
                  lastChatAt: date.toString(),
                  messages: arr
                })
              }
            })
          }).catch(e => console.log(e))
        }
        else{
          arr.push({
            belongTo: uid,
            chatAt: date.toString(),
            content: content,
            images: tempImages
          })
          firestore.get({collection: 'chatbox', where: ['id', '==', createStringIDChat]}).then((dataFirestore) => {
            if(dataFirestore.docs.length){
              let id = dataFirestore.docs[0].id
              firestore.update({collection: 'chatbox', doc: id}, {lastChatAt: date.toString(), messages: arr}).then(() => {
                callback()
              })
            }
            else{
              firestore.collection('chatbox').doc(createStringIDChat).set({
                id: createStringIDChat,
                lastChatAt: date.toString(),
                messages: arr
              })
            }
          })
        }
      }
    }
  }

  export const updateUserChatInfo = (data) => {
    return{
      type: "INFO_CHAT_USER",
      info: data
    }
  }