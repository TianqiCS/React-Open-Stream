import {List} from "antd";
import React from "react";

/**
 * RoomList is a List of available live room
 * @see List {@link https://ant.design/components/list/}
 * @param {array} dataSource - array of room Buttons
 * @param {function} renderItem -  how to render
 * @version 1.0.0
 * @author TianqiCS
 */
class RoomList extends React.Component {
    render() {
        return <List size="small"
                     header="Live Rooms"
                     itemLayout="vertical"
                     bordered
                     locale={{emptyText: "None"}}
                     dataSource={this.props.dataSource}
                     renderItem={this.props.renderItem}
        />;
    }
}

export default RoomList