import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Player from "./components/Player";
import {Button, Card, Drawer, Input} from "antd";
import Chat from "./components/Chat";
import io from "socket.io-client";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "Http://162.246.157.118:8080/hls/test.m3u8",
            visible: true,
            username: "",
            room: "test",
            socket: this.socket = io('http://vanillacraft.cn:8000')
        };
        this.socket.emit('JOIN', 'test');

    }

  onChangeUrl = (e) => {
      this.setState({url: "Http://162.246.157.118:8080/hls/"+ e.target.value + ".m3u8", room: e.target.value});
      this.socket.emit('JOIN', e.target.value);
  };

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

  render() {
      const Search = Input.Search;
      return (
          <div>
              <Input
                  addonBefore="Room Number: "
                  addonAfter=".m3u8"
                  defaultValue="test"
                  onPressEnter={this.onChangeUrl}
              />
              <Player url={this.state.url}/>
              <div>
                  <Button type="primary" onClick={this.showDrawer}>
                      Open
                  </Button>
                  <Drawer
                      className="ChatDrawer"
                      title="Chat"
                      placement="right"
                      width="512"
                      closable={false}
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

export default App;
