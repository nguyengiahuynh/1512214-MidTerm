import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {withFirestore} from 'react-redux-firebase'
import {compose} from 'redux'
import People from '../../components/dashboard/People'
import _ from 'lodash'
import {compareDateReverse} from '../../store/actions/chatActions'
import { Icon } from 'react-icons-kit'

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const mapStateToProps = (state) => {
  let arr = [];
  arr =  state.firestore.data.users;
  let currentPeople = state.firebase.auth;
  let listPeople = [];
  if (arr) {
    arr = Object.entries(arr);
    //console.log(arr[0][1].UID);
    for (let i = 0; i < arr.length; i++)
    {
      if (arr[i][1].UID != currentPeople.uid)
        listPeople.push(arr[i][1]);
    }
  }
  return {
    listPeople: listPeople,
    currentPeople: currentPeople
  }
}

class ListPeople extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: ''
    }
  }

  render() {
    console.log(this.props)
    return (
        <div className="people-list" id="people-list">
          <div className="search">
            <input type="text" placeholder="Search"/>
            {/* <i class="fa fa-search"></i> */}
          </div>
          <ul className="list">
            {!!this.props.listPeople.length && this.props.listPeople.map((item, key) => {
              return(
                  <People user={item} key={key}/>
                  //<p>Hello</p>
                )
              })
            }
          </ul>
        </div>
    );
  }
}

export default withRouter(
  compose(
    withFirestore,
    connect(mapStateToProps, mapDispatchToProps)
  )(ListPeople)
);
