import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {withFirestore} from 'react-redux-firebase'
import {compose} from 'redux'
import People from '../../components/dashboard/People'
import _ from 'lodash'
import {compareDesc} from 'date-fns/esm'
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
    this.state = {
      displayName: '',
      search: []
    }
  }

  handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.setState({
        displayName: e.target.value
      }, () => {
        if (this.state.displayName != '') {
          let temp = this.props.list;
          let arr = [];
          temp.map((e, i) => {
            return e.display_name === this.state.displayName ? arr.push(i) : '' 
          })
          console.log(arr)
          if (arr.length != 0) {
            let result = [];
            for (let i = 0; i < arr.length; i++)
              result.push(temp[arr[i]])
            this.setState({
              search: result
            })
          }
          else {
            this.setState({
              search: []
            })
          }
        }
      })
    }
  }

  render() {
    return (
        <div className="people-list" id="people-list">
          <div className="search">
            <input type="text" placeholder="Search" onKeyPress={this.handleSearch}/>
            <i className="fa fa-search"></i>
          </div>
          <ul className="list">
            {this.state.displayName && !!this.state.search.length ?
              <div>
                {this.state.search.map((item, key) => {
                  return(
                    <People user={item} key={key}/>
                  )
                })}
              </div>
              :
              <div>
              {!!this.props.list.length && this.state.displayName === '' && this.props.list.map((item, key) => {
                return(
                    <People user={item} key={key}/>
                  )
                })
              }
              </div>
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
