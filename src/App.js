import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Player from "./components/Player";
import {Button, Card, Drawer, Input} from "antd";
import Chat from "./components/Chat";

class App extends Component {
  state = {
      url: "Http://162.246.157.118:8080/hls/test.m3u8",
      visible: true,
      username: ""
  };

  onChangeUrl = (e) => {
      this.setState({url: "Http://162.246.157.118:8080/hls/"+ e.target.value + ".m3u8"})
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
                      title="Chat"
                      placement="right"
                      closable={false}
                      onClose={this.onClose}
                      visible={this.state.visible}
                  >
                      {"Name"}
                      <Input
                          placeholder="username"
                          value={this.state.username}
                          onChange={(e)=>{
                              this.setState({
                                  username: e.target.value})
                          }}
                      />
                      <Chat username={this.state.username}/>
                  </Drawer>
              </div>
          </div>

      );
  }
}

export default App;
