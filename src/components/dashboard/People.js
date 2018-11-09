import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Icon } from 'react-icons-kit'
import {starO} from 'react-icons-kit/fa/starO'
import {ic_star} from 'react-icons-kit/md/ic_star'
import {fromNowTimeStamp} from '../../store/actions/chatActions'
import {updateUserChatInfo} from '../../store/actions/chatActions'
import {withFirestore} from 'react-redux-firebase'
import {compose} from 'redux'
import _ from 'lodash'

class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: true
    }
  }

  render() {
    const {user} = this.props
    return (
      <div>
        <Link to={"/chatwith/" + user.UID}>
          <li className={this.state.active ? "clearfix active" : "clearfix"}>
            <img width="55" src={user.photoURL} alt="avatar" />
            <div className="about">
              <div className="name">{user.display_name}</div>
              <div className="status">
                {/* <span className={user.status === "online" ? "circle online" : "circle offline"}/> {user.status}
                {user.endAt && user.status === "offline" &&
                  <span className="atTime"> {fromNowTimeStamp(user.endAt)}</span>
                } */}
                <i className={user.status === "online" ? "fa fa-circle online" : "fa fa-circle offline"}></i>{user.status}
              </div>
              </div>
            </li>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
      //updateUserChatInfo: (data) => dispatch(updateUserChatInfo(data))
    }
  }
  
  const mapStateToProps = (state) => {
    // console.log(state);
    let tempProfile = state.firebase.profile && state.firebase.profile.isEmpty ? state.firebase.auth : state.firebase.profile
    let uid = tempProfile.uid ? tempProfile.uid : tempProfile.UID
    let stars = []
    if(state.firestore.data.users){
      let temp = _.values(state.firestore.data.users)
      let myInfo = temp.find((item) => {
        return uid === item.UID
      })
      if(myInfo){
        stars = myInfo.stars
      }
    }
    return{
      myUID: uid,
      stars: stars
    }
  }

export default withRouter(
  compose(
    withFirestore,
    connect(mapStateToProps, mapDispatchToProps)
  )(User)
);
