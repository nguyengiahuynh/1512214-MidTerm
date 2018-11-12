import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, getFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import '../../css/Dashboard.css'
import Chat from './Chat'
import ListPeople from './ListPeople'
import { updateStatusPeople } from '../../store/actions/authActions'

class Dashboard extends Component {
    componentDidMount() {
        const { projects, auth } = this.props;
        if (auth.uid)
            this.props.updateStatusPeople()
    }

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
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStatusPeople: () => dispatch(updateStatusPeople())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        'users',
        'chat'
    ])
)(Dashboard)