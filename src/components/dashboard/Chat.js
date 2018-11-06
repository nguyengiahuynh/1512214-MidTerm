import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sendMessage } from '../../store/actions/chatActions'
import {withFirestore} from 'react-redux-firebase'
import {createStringIDChat, formatDate} from '../../store/actions/chatActions'
import {compose} from 'redux'
import _ from 'lodash'
import ReactTooltip from 'react-tooltip'

class Chat extends Component {
  static propTypes = {
    profile: PropTypes.object,
  }

  constructor(props){
    super(props)
    const {dataChat} = this.props
    this.state = {
    }
  }

  render() {
    // console.log(this.state);
    const {profile} = this.props
    const uid = profile.uid ? profile.uid : profile.UID
    const display_name = profile.display_name ? profile.display_name : profile.displayName
    return (
      
        <div className="chat">
          <div className="chat-header clearfix">
            <div className="logo">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="logo" />
            </div>
            <div class="chat-about">
              <div class="chat-with">Chat with Vincent Porter</div>
              <div class="chat-num-messages">already 1 902 messages</div>
            </div>
            <i class="fa fa-star"></i>
          </div>
          {/* end chat-header */}
              <div class="chat-history">
            <ul>
              <li class="clearfix">
                <div class="message-data align-right">
                  <span class="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                  <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>
                  
                </div>
                <div class="message other-message float-right">
                  Hi Vincent, how are you? How is the project coming along?
                </div>
              </li>
              
              <li>
                <div class="message-data">
                  <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                  <span class="message-data-time">10:12 AM, Today</span>
                </div>
                <div class="message my-message">
                  Are we meeting today? Project has been already finished and I have results to show you.
                </div>
              </li>
              
              <li class="clearfix">
                <div class="message-data align-right">
                  <span class="message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
                  <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>
                  
                </div>
                <div class="message other-message float-right">
                  Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                </div>
              </li>
              
              <li>
                <div class="message-data">
                  <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                  <span class="message-data-time">10:20 AM, Today</span>
                </div>
                <div class="message my-message">
                  Actually everything was fine. I'm very excited to show this to our team.
                </div>
              </li>
              
              <li>
                <div class="message-data">
                  <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                  <span class="message-data-time">10:31 AM, Today</span>
                </div>
                <i class="fa fa-circle online"></i>
                <i class="fa fa-circle online" style={{color: '#AED2A6'}}></i>
                <i class="fa fa-circle online" style={{color: '#DAE9DA'}}></i>
              </li>
              
            </ul>
            
          </div>
          {/* end chat-history */}
          <div className="chat-message clearfix">
            <form>
              <textarea name="message-to-send" id="message-to-send" placeholder="Type message!!" rows={3}
                defaultValue=""/>
              <span className="media">
                <div className="image-box">
                  <div className="preview-box">
                    {this.state.files && this.state.files.map((item, key) => {
                        return(
                          <div className="tag" key={key}>
                            <button type="button" className="close-x">
                              <span>X</span>
                            </button>
                            <p>{item.name}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                <button type="button">Send</button>
              </span>
            </form>
          </div>
          {/* end chat-message */}
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
      sendMessage: (data, callback) => dispatch(sendMessage(data, callback))
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      profile: state.firebase.profile
    }
  }

export default withRouter(
  compose(
    withFirestore,
    connect(mapStateToProps, mapDispatchToProps)
  )(Chat)
);