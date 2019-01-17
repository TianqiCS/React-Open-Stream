import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Player from "./components/Player";
import {Card, Input} from "antd";

class App extends Component {
  state = {
      url: "http://162.246.157.118:8080/hls/test.m3u8"
  };

  onChangeUrl = (e) => {
      this.setState({url: "Http://162.246.157.118:8080/hls/"+ e.target.value + ".m3u8"})
  };
  render() {
      return (
          <Card
              title={
                  <Input
                      addonBefore="Http://162.246.157.118:8080/hls/"
                      addonAfter=".m3u8"
                      defaultValue="test"
                      onPressEnter={this.onChangeUrl}/>
              }
              cover={<Player url={this.state.url}/>}>
          </Card>
      );
  }
}

export default App;
