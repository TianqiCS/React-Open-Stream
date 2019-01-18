import React from "react";
import {Input, Card, List, Avatar, Popover, Icon} from 'antd';
import './Chat.css';

import io from "socket.io-client";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            message: {
                text: "",
                files: [],
            },

            messages: sessionStorage.getItem('messages') ? JSON.parse(sessionStorage.getItem('messages')) : []
        };
        console.log(this.state.messages[0]);

        this.socket = io('http://vanillacraft.cn:8000');

        this.sendMessage = () => {
            if (!this.props.username) {alert("Enter a user name first!"); return}
            this.socket.emit('SEND_MESSAGE', {
                author: this.props.username,
                message: this.state.message
            });
            this.setState({message: {
                    text: "",
                    files: [],
                }});
        };


        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            sessionStorage.setItem('messages', JSON.stringify(this.state.messages));
            console.log(this.state.messages);
        };

        const clearMessage = () => {
            sessionStorage.setItem('messages', JSON.stringify([]));
            this.setState({
                messages: JSON.parse(sessionStorage.getItem('messages'))
            })
        }


    }
    render(){
        const Send = Input.Search;
        return (
                <div id="chat">
                    <List id="chatbox"
                          size="small"
                          itemLayout="vertical"
                          dataSource={this.state.messages}
                          renderItem={message => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="http://lorempixel.com/100/100/" />}
                                    title={message.author}
                                    description={message.message.text}
                                />
                            </List.Item>
                          )}
                    />
                <Input.Group>
                    <Send type="text" placeholder="Message" className="form-control" value={this.state.message.text} onChange={ev => this.setState({message: {text: ev.target.value, files: this.state.message.files}})}
                           onPressEnter={this.sendMessage} enterButton="Send" onSearch={this.sendMessage}/>
                </Input.Group>
                </div>
        );

    }
}
// <Input maxLength= "10" type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
export default Chat;