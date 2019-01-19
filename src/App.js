import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Room from "./components/Room";
import "./App.css"
import {Alert, Avatar, Icon, Input, List} from "antd";
import {getLiveStats} from "./utils/network";

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
        room: "",
        zh: false,
        list: [],
    };

    componentDidMount() {
        getLiveStats().then((data) => {
            const xml = data.data;
            const rooms = xml.getElementsByTagName("name");
            for (let i=1;i<rooms.length; i++) {
                this.setState({list: [...this.state.list, rooms[i].innerHTML]});
            }
        })
    }

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
            ":) Enjoy your day!\n" +
            "\n"+
            "Usage:\n" +
            "- Host -\n" +
            "Using any custom source broadcast software (like OBS),\n" +
            " you can stream at [rtmp://live.vanillacraft.cn/live], with the streaming [key] as your [room]\n" +
            "- Viewer -\n" +
            "Input the room you want to Enter in the bar beneath. Be aware that Phone layout is not well supported!\n" +
            "You may need to rotate your phone.\n";
        const eulaZh = "最终用户协议 - 你继续使用本网站便意味你同意\n" +
            "欢迎你来到这个网站" +
            " 作为使用者你需要遵守以下一些规定. \n" +
            "- 作为主播:\n" +
            "你可以在任何没有其他主播使用的房间直播.\n" +
            "你可以直播任何内容，只要他们不违反加拿大法律以及中国大陆的法律.\n" +
            "详细来说, 你不应该播出现实生活中的暴力血腥场景, 有版权限制的内容,\n" +
            " 色情淫乱的场景, 政治内容, 或者任何不恰当的内容.\n" +
            "- 作为观众:\n" +
            "你可以观看这个网站的内容, 也可以跟其他人交流. 但请注意你的言行素质.\n"+
            "你应该注意这个平台是非赢利性质并且不具备安全保密的特性, 所以有可能随时不提前通知停止服务.\n" +
            " 提供方将不负责任任何你访问这个网站可能造成的损失.\n" +
            "- 你不可以攻击这个网站或其他用户. 这是最基础的准则.\n" +
            ":) 祝你有一个美好的一天!\n" +
            "\n"+
            "食用方法:\n" +
            "- 主播 -\n" +
            "使用任何开放推流软件 (比如 OBS),\n" +
            " 你可以推流到 [rtmp://live.vanillacraft.cn/live], 密钥 [key] 就是你的 [房间]\n" +
            "- 观众 -\n" +
            "在下方输入你想看的房间. 但请注意手机端目前支持不完善!\n" +
            "你可能需要旋转手机.\n";

        const Go = Input.Search;

        return (
            <div className="Home">
                <h1>Free Streaming Site</h1>
                <Alert message={<div><Icon type="global" style={{color: "red"}} onClick={()=>{this.setState({zh: !this.state.zh})}}/>中/英<pre>{this.state.zh ? eulaZh: eula}</pre></div>} type="success" />
                <br/>
                <Go className="RoomInput" type="text" placeholder="Room" value={this.state.room} onChange={ev => this.setState({room: ev.target.value})}
                    onPressEnter={this.enterRoom} enterButton="Go!" onSearch={this.enterRoom} size="large"/>

                <List id="roomList"
                      size="small"
                      itemLayout="vertical"
                      dataSource={this.state.list}
                      renderItem={room => (
                          <List.Item>
                              <List.Item.Meta
                                  title={<a href={room}>{room}</a>}
                              />
                          </List.Item>
                      )}
                />
            </div>
        );

    }


}

export default App;