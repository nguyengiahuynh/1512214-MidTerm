import { provider } from '../../config/FireBaseConfig'

  export const signOut = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();

      let uid = firebase.auth().O;
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
        firestore.update({collection: 'users', doc: uid}, {status: "offline"});
      });
    }
  }

  export const loginWithGoogle = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();

      firebase.auth().signInWithPopup(provider).then(res => {
        dispatch({ type: 'LOGIN_SUCCESS' })
        const user = res.user;
        firestore.collection('users').doc(res.user.uid).set({
          display_name: user.displayName,
          username: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          phoneNumber: user.phoneNumber,
          status: 'offline',
          UID: user.uid
        })
      }).catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
      })
    }
  }

  export const updateStatusPeople = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
      
      let uid = firebase.auth().O;
      firestore.update({collection: 'users', doc: uid}, {status: "online"}).then(() => {
        dispatch({type: 'UPDATE_STATUS_SUCCESS'});
      }).catch((err) => {
        dispatch({type: 'UPDATE_STATUS_ERROR'});
      })
    }
  }