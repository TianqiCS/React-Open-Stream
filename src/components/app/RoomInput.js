import {Input} from "antd";
import React from "react";

/**
 * RoomInput is an Input bar to go to target room
 * @see Input {@link https://ant.design/components/input/}
 * @param {function} onChange -  change the state to rerender
 * @param {string} value - text entered (room)
 * @param {function} onPressEnter -  redirect to target room
 * @version 1.0.0
 * @author TianqiCS
 */

class RoomInput extends React.Component {
    render() {
        const Go = Input.Search;  // Ant d input style

        return <Go className="RoomInput"
                   type="text"
                   placeholder="Room"
                   value={this.props.value}
                   onChange={this.props.onChange}
                   onPressEnter={this.props.onPressEnter}
                   enterButton="Go!"
                   onSearch={this.props.onPressEnter}
                   size="large"
        />;
    }
}

export default RoomInput