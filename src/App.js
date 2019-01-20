import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Room from "./components/Room";
import "./App.css"
import {Button, List} from "antd";
import {getLiveStats} from "./utils/network";
import EulaBox from "./components/app/EulaBox";
import RoomInput from "./components/app/RoomInput";
import RoomList from "./components/app/RoomList";

/**
 *  Website Front End
 *  @version 1.0.0
 *  @author TianqiCS
 */

/**
 * The App itself
 * @returns {*} the App itself
 */
function App() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/:id" component={Child}/>
            </div>
        </Router>
    );
}

/**
 * Room Page
 * @param {string} id - room number
 * @property {string} url - your streaming server source
 * @returns {*} Room Page
 */
function Child({ match }) {
    return (
        <Room room={match.params.id} url={"Http://162.246.157.118:8080/hls/"}/>  //
    );
}

/**
 * Home Page
 * @returns {*} Home Page
 */
class Home extends React.Component {
    state = {
        room: "",  // room to go (RoomInput)
        zh: false,  // use chinese text
        list: [],  // list of rooms on show
    };

    /**
     * Get and parse remote streaming rooms information
     */
    componentDidMount() {
        getLiveStats().then((data) => {  //
            const xml = data.data;
            console.log(xml);
            const rooms = xml.getElementsByTagName("name");
            const times = xml.getElementsByTagName("time");
            for (let i=1;i<rooms.length; i++) {
                this.setState({list: [...this.state.list, {room: rooms[i].innerHTML, time: times[i].innerHTML}]});
            }
        })
    }

    /**
     * Redirect to target room, router will handle the rest
     */
    enterRoom = () => {
        window.location.href="/"+this.state.room;
    };

    /**
     * Flip the boolean of zh
     */
    changeLang = () => {
        this.setState({zh: !this.state.zh})
    };

    /**
     * Home Page
     * @returns {*} Home Page
     */
    render() {
        // noinspection RequiredAttributes for Button
        return (
            <div className="Home">
                <h1>Free Streaming Site</h1>
                <EulaBox changeLang={this.changeLang} zh={this.state.zh}/>
                <br/>
                <RoomInput value={this.state.room} onChange={ev => this.setState({room: ev.target.value})}
                           onPressEnter={this.enterRoom}/>
                <RoomList dataSource={this.state.list} renderItem={room => (
                    <List.Item extra={"Lasting: " + Math.round(room.time / 60000) + " Minutes"}>
                        <List.Item.Meta/>
                        <Button href={room.room}>{room.room}</Button>
                    </List.Item>
                )}/>
            </div>
        );
    }
}

export default App;