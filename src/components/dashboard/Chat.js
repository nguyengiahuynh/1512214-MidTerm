import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { sendContents } from '../../store/actions/chatActions'
import { withFirestore } from 'react-redux-firebase'
import { infoUserChatWith} from '../../store/actions/chatActions'
import { createIDChat } from '../../functions'
import {compose} from 'redux'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'

class Chat extends Component {

  constructor(props){
    super(props)
    const { Chat } = this.props;
    this.state = {
      contents: Chat && Chat.contents ? Chat.contents : [],
      content: ""
    }
  }

  componentDidMount() {
    if(this.props.match.params && this.props.match.params.id){
      let UID = this.props.match.params.id;
      this.props.infoUserChatWith(UID);
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    if(props.match.params && props.match.params.id) {
      let UID = props.match.params.id;
      props.infoUserChatWith(UID);
      return <Redirect to={'/chatwith/' + UID} />
    }
  }

  handleTypeContents = (e) => {
    if (this.props.match.params && this.props.match.params.id && e.key === 'Enter') {
      e.preventDefault();
      let temp = e.target.value
      e.target.value = ""
      this.setState({
        content: temp
      }, () => {
        this.handleSend()
        this.setState({
          content: ""
        })
      })
    } else if (this.props.match && !this.props.match.params.id && e.key === 'Enter') {
      e.preventDefault();
      e.target.value = ""
    }
  }

  handleSend = (e) => {
    console.log(e)
    if (this.props.match.params) {
      this.props.sendContents({
        contents: this.props.Chat.contents,
        content: this.state.content, 
        userChatWith: this.props.match.params.id
      })
    }
    else {
      e.preventDefault();
    }
  }

  render() {
    const { profile } = this.props
    const { Chat } = this.props
    const { userChatWith } = this.props
    const uid = profile.UID
    return (
      
        <div className="chat">
            <div>
            {userChatWith ?
                <div className="chat-header clearfix">
                  <div className="logo">
                    <img width="55" src={userChatWith.photoURL} alt="logo" />
                  </div>
                  <div className="chat-about">
                    <div className="chat-with">Chat with {userChatWith.display_name}</div>
                  </div>
                  <i className="fa fa-star"></i>
                </div>
                :
                <div className="chat-header clearfix"></div>
            }
            </div>
          {/* end chat-header */}
          <div className="chat-history" id="box-chat">
            <ul>
              {Chat.contents && Chat.contents.map((item, key) => {
                  if(!(item.content)){
                    return null
                  }
                  return(
                    <li className={uid === item.uid ? "clearfix" : ""} key={key}>
                      <div className={uid === item.uid ? "message-data align-right" : "message-data"}>
                        {uid === item.uid ?
                          <div>
                            <span className="message-data-time" >{format(new Date(item.chatTime), 'HH:mm:ss, dd/MM/yyyy')}</span> &nbsp; &nbsp;
                            <span className="message-data-name" >{profile.display_name}</span> <i className="fa fa-circle me"></i>
                          </div>
                          :
                          <div>
                          {userChatWith && 
                            <div>
                              <span className="message-data-name"><i className="fa fa-circle online"></i> {userChatWith.display_name}</span>
                              <span className="message-data-time">{format(new Date(item.chatTime), 'HH:mm:ss, dd/MM/yyyy')}</span>
                            </div>
                          }
                          </div>
                        }
                      </div>
                      <div className={uid === item.uid ? "message other-message float-right" : "message my-message"}>
                        {item.content ? item.content : null}
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
              {/* <div class="chat-history">
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
              
              <li class="clearfix">
                <div class="message-data align-right">
                  <span class="message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
                  <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>
                  
                </div>
                <div class="message other-message float-right">
                  Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                </div>
              </li>
              
            </ul>
            
          </div> */}
          {/* end chat-history */}
          <div>
            {userChatWith ? 
              <div className="chat-message clearfix">
                <form>
                  <textarea name="message-to-send" id="message-to-send" placeholder="Type message!!" rows={3}
                    defaultValue="" onKeyPress={this.handleTypeContents} />
                  <button type="button" onClick={this.handleSend}>Send</button>
                </form>
              </div> :
              <div className="chat-message clearfix">
                <form>
                  <textarea name="message-to-send" id="message-to-send"  placeholder="Chose someone in list to chat with them!!" rows={3} readOnly></textarea>
                  <button type="button">Send</button>
                </form>
              </div>
            }
          </div>
          {/* end chat-message */}
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  var UID = "";
  if (props.match.params.id != "")
    UID = props.match.params.id;
  return {
    infoUserChatWith: (UID) => dispatch(infoUserChatWith(UID)),
    sendContents: (data) => dispatch(sendContents(data))
  }
}
  
  const mapStateToProps = (state, props) => {
    let allDataChat = _.values(state.firestore.data.chat);
    let currentUID = state.firebase.profile.UID;
    var UID = "";
    if (props.match.params.id != "")
      UID = props.match.params.id;
    let IDChat = createIDChat(currentUID, UID);
    allDataChat = allDataChat.filter((doc) => {
      return doc.id === IDChat
    })
    if(allDataChat.length){
      allDataChat = allDataChat[0];
    }
    return {
      Chat: allDataChat,
      profile: state.firebase.profile,
      userChatWith: state.chat.infoUser
    }
  }

export default withRouter(
  compose(
    withFirestore,
    connect(mapStateToProps, mapDispatchToProps)
  )(Chat)
);