import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {withFirestore} from 'react-redux-firebase'
import {compose} from 'redux'
import _ from 'lodash'

class People extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const {user} = this.props
    return (
      <div>
        <Link to={"/chatwith/" + user.UID}>
          <li className={user.UID === this.props.match.params.id ? "clearfix active" : "clearfix"}>
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

  const mapDispatchToProps = (dispatch, props) => {
    return {

    }
  }
  
  const mapStateToProps = (state) => {
    return {

    }
  }

export default withRouter(
  compose(
    withFirestore,
    connect(mapStateToProps, mapDispatchToProps)
  )(People)
);
