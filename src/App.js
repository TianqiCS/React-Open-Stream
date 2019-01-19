import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Room from "./components/Room";
import "./App.css"
import {Alert, Input} from "antd";

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


function Child({ match }) {
    return (
        <Room room={match.params.id} url={"Http://162.246.157.118:8080/hls/"}/>  // change your streaming output source here!
    );
}

class Home extends React.Component {
    state = {
        room: ""
    };

    enterRoom = () => {
        window.location.href="/"+this.state.room;
    };

    render() {

        const eula = "End User License Agreement - You agree to this if continue using the site\n" +
            "Welcome to this site made by Tianqi!" +
            " You as a visitor can stream and watch under some basic restrictions which are as follows. \n" +
            "- As a host:\n" +
            "You are allowed to stream video at whatever room you like unless there's another host using it.\n" +
            "You are allowed to broadcast whatever contents as long as legal under both Canadian law and Chinese Mainland law.\n" +
            "To be specific, you should not broadcast any violent scenes in the real world, protected contents like some movies and shows,\n" +
            " sexual and adult scenes, politics affairs and any other contents which are not suitable.\n" +
            "- As a viewer:\n" +
            "You are allowed to watch the contents on this website, and chat with others. Good manner should be kept at your grace.\n"+
            "You should be aware that this platform is non-profitable and not secured, which may stop services at anytime.\n" +
            " No responsibility will be taken by the provider if you have any kind of loss during using the website.\n" +
            "- You should not attack or do harm to the website and others. That's the basic line for using this product.\n" +
            ":) Enjoy your day!+\n" +
            "\n" +
            "@@@@@@@@@@@@@@@@@@@@@Usage:@@@@@@@@@@@@@@@@@@@\n" +
            "- Host -\n" +
            "Using any custom source broadcast software (like OBS),\n" +
            " you can stream at [rtmp://live.vanillacraft.cn/live], with the streaming [key] as your [room]\n" +
            "- Viewer -\n" +
            "Input the room you want to Enter in the bar beneath. Be aware that Phone layout is not well supported!\n" +
            "You may need to rotate your phone.\n";

        const Go = Input.Search;

        return (
            <div className="Home">
                <h1>Free Streaming Site</h1>
                <Alert message={<pre>{eula}</pre>} type="success" />
                <br/>
                <Go className="RoomInput" type="text" placeholder="Room" value={this.state.room} onChange={ev => this.setState({room: ev.target.value})}
                    onPressEnter={this.enterRoom} enterButton="Go!" onSearch={this.enterRoom} size="large"/>
            </div>
        );

    }


}

export default App;