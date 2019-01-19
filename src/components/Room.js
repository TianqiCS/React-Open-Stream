import React, { Component } from 'react';
import './Room.css';
import Player from "./Player";
import {Button, Drawer, Input} from "antd";
import Chat from "./Chat";
import io from "socket.io-client";

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewer: 0,
            visible: true,
            username: "",
            socket: this.socket = io('http://vanillacraft.cn:8000')  // chatting server url
        };
        this.socket.emit('JOIN', this.props.room);
        this.socket.emit('QUERY_VIEWER', this.props.room);

        this.socket.on('SEND_VIEWER', function(data){
            setViewer(data);
        });

        const setViewer = (data) => {
            this.setState({
                viewer: data,
            });
        };

    }

    /*
    onChangeUrl = (e) => {
        this.setState({url: "Http://162.246.157.118:8080/hls/"+ e.target.value + ".m3u8", room: e.target.value});
        this.socket.emit('JOIN', e.target.value);
    };
    */


    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    copyUrl = () => {
        alert("Shareable Link: vanillacraft.cn/"+this.props.room)
    };

    render() {
        return (
            <div>
                <Input
                    addonBefore="Room Number: "
                    addonAfter={"Viewers: "+this.state.viewer}
                    value={this.props.room}
                    onClick={this.copyUrl}
                />
                <Player url={this.props.url+this.props.room+".m3u8"}/>
                <div>
                    <Button type="primary" onClick={this.showDrawer}>
                        Chat Room
                    </Button>
                    <Drawer
                        resize="horizontal"
                        className="ChatDrawer"
                        title="Chat"
                        placement="right"
                        width="30vh"
                        closable={true}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        {"Name "}
                        <Input
                            placeholder="username"
                            value={this.state.username}
                            onChange={(e)=>{
                                this.setState({
                                    username: e.target.value})
                            }}
                        />
                        <Chat username={this.state.username} socket={this.state.socket}/>
                    </Drawer>
                </div>
            </div>

        );
    }
}

export default Room;
