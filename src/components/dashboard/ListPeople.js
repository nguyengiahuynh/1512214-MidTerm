import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {withFirestore} from 'react-redux-firebase'
import {compose} from 'redux'
import People from '../../components/dashboard/People'
import _ from 'lodash'
import {format, compareDesc} from 'date-fns/esm'
import { createIDChat } from '../../functions'
import { create } from 'domain';

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const mapStateToProps = (state) => {
  let arr = [];
  let list = [];
  arr =  state.firestore.data.users;
  let currentPeople = state.firebase.auth;
  let listPeople = [];
  if (arr) {
    arr = Object.entries(arr);
    //console.log(arr[0][1].UID);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][1].UID != currentPeople.uid)
        listPeople.push(arr[i][1]);
    }

    let allDataChat = _.values(state.firestore.data.chat);
    if (allDataChat)
    {
      allDataChat.sort((data_A, data_B) => {
        return compareDesc(new Date(data_A.lastChatTime), new Date(data_B.lastChatTime));
      })
  
      for (let i = 0; i < allDataChat.length; i++) {
        for (let j = 0; j < listPeople.length; j++) {
          let ID = createIDChat(currentPeople.uid, listPeople[j].UID)
          if (ID === allDataChat[i].id)
            list.push(listPeople[j])
        }
      }
  
      for (let i = 0; i < list.length; i++) {
        listPeople = listPeople.filter((people) => {
          return people.UID != list[i].UID
        })
      }
    }
  }
  return {
    list: [...list, ...listPeople],
    currentPeople
  }
}

class ListPeople extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <div className="people-list" id="people-list">
          <div className="search">
            <input type="text" placeholder="Search"/>
            {/* <i class="fa fa-search"></i> */}
          </div>
          <ul className="list">
            {!!this.props.list.length && this.props.list.map((item, key) => {
              return(
                  <People user={item} key={key}/>
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
