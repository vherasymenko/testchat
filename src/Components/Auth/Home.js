import React, { Component } from 'react';
import fire from '../../config';
import './Home.css';
import defaultAvatar from '../../avatar.jpg';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            current_message: {},
            textarea: '',
            userData: {
                clicked: false,
                user: {},
            }
        }
        
        this.database = fire.database().ref().child('messages');
        this.logout = this.logout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.deviderHandler = this.deviderHandler.bind(this);
    }

    componentWillMount(){
        const previousMessages = this.state.messages;
        this.database.on('child_added', snap => {
            previousMessages.push({
                 id: snap.key,
                 user: snap.val().user,
                 message_text: snap.val().message_text,
                 avatar: snap.val().avatar
            });

            this.setState ({
               notes: previousMessages
            });

        });
    }

    logout() {
        fire.auth().signOut().then(function() {
          }).catch(function(error) {
        });
    }

    sendMessage(e){
        if(e.key === "Enter"){
            e.preventDefault(e);            
            this.database.push().set({user: this.props.user.email, message_text: this.state.current_message.message_text, avatar: this.props.user.photoURL });
            this.setState(() => ({
                textarea: ''
            }))
        }
    }

    deviderHandler(item){
        {this.state.userData.clicked  === false ? this.setState({userData:{clicked: true, user: item}}) : this.setState({userData:{clicked: false, user: {}}})}
    }

    handleChange(e){
        e.preventDefault(e);
        this.setState({textarea: e.target.value});
        let sent_message = {user: this.props.user.email, message_text: e.target.value};
        this.setState({current_message: sent_message});
    }

    renderMessageItem(item) {
        const isItMe = item.user === this.props.user.email;
        return (
        <div onClick={() => this.deviderHandler(item)} key={item.id} className={isItMe ? 'message-block my-message': 'message-block other-message'}>
            <div className="user-message">
                <span className="user-message-email">{isItMe ? 'Me:' : item.user+':'}</span>
                <span className='user-message-text'>{item.message_text}</span>
            </div>
            <img className="avatar-chat" src={item.avatar != null ? item.avatar : defaultAvatar}/>
        </div>
        )
    }
    
    render(){

    const Devider = () => {
        const isItMe = this.state.userData.user.user === this.props.user.email;
        return (
        <div className="user-info-bar">
            <div className="user-info">
                <img className="avatar-chat" src={this.state.userData.user.avatar ? this.state.userData.user.avatar : defaultAvatar} />
                <div className="user-email">{this.state.userData.user.user}</div>
                {isItMe ? <button onClick={this.logout} className="btn btn-danger">Sign out</button> : null }  
            </div>
        </div>
        )
    }

    let messages = null;
    if (this.state.messages) {
        messages = this.state.messages.map((element) => this.renderMessageItem(element))
    }
    return(
        <div>
        <div className="chat-container">    
            <div className="chat-window">
                <div className="messages-container">
                    {messages}
                </div>
            </div>
            {this.state.userData.clicked === false ? null : <Devider />}            
            </div>            
            <textarea value={this.state.textarea} onChange={this.handleChange} onKeyPress={this.sendMessage}  placeholder="Enter chat message here."/>
        </div>
        )
    }
}


export default Home;