import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import '../../css/Dashboard.css'
import Chat from './Chat'
import ListPeople from './ListPeople'
import firebase from '../../config/FireBaseConfig'

class Dashboard extends Component {
    render() {
        const { projects, auth } = this.props;
        if (!auth.uid)
            return <Redirect to='/signin' />
        return (
          <div className="container clearfix">
            <ListPeople />
            <Chat />
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        'users',
        'chat'
    ])
)(Dashboard)