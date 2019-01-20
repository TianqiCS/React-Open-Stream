import React from "react";
import {Input, List, Avatar, Icon, /*notification*/ } from 'antd';
import './Chat.css';

/**
 * Real-time Chat
 * @version 1.0.0
 * @author TianqiCS
 */
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

        /**
         * send the message to the backend with text author and text.
         * FOR SAFETY REASON FILES OPTIONS ARE REMOVED
         * @see {@link https://github.com/TianqiCS/Chat} Original Chat
         */
        this.sendMessage = () => {
            if (!this.props.username) {alert("Enter a user name first!"); return}
            this.props.socket.emit('SEND_MESSAGE', {
                author: this.props.username,
                message: this.state.message
            });
            this.setState({message: {
                    text: "",
                    files: [],
                }});
        };

        /* You can have this cool notification
        const openNotification = (data) => {
            notification.open({
                message: data.author,
                description: data.message.text,
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        };*/

        this.props.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
            // openNotification(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            sessionStorage.setItem('messages', JSON.stringify(this.state.messages));
            console.log(this.state.messages);
        };

        this.clearMessage = () => {
            sessionStorage.setItem('messages', JSON.stringify([]));
            this.setState({
                messages: JSON.parse(sessionStorage.getItem('messages'))
            })
        }
    }


    /**
     * Render Chat
     * @see random images {@link http://lorempixel.com}
     * @see List {@link https://ant.design/components/list/}
     * @see Input {@link https://ant.design/components/input/}
     * @returns {*} Chat
     */
    render(){

        const Send = Input.Search;
        return (
                <div id="chat">
                    <List id="chatbox"
                          size="small"
                          itemLayout="vertical"
                          dataSource={this.state.messages}
                          footer={<Icon type="delete" onClick={this.clearMessage}/>}
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
                    <Send type="text"
                          placeholder="Message"
                          className="form-control"
                          value={this.state.message.text}
                          onChange={
                              ev => this.setState(
                                  { message: {text: ev.target.value, files: this.state.message.files} }
                              )}
                          onPressEnter={this.sendMessage}
                          enterButton="Send"
                          onSearch={this.sendMessage}/>
                </Input.Group>
                </div>
        );
    }
}
export default Chat;