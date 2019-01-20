import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { findDOMNode } from 'react-dom'
import {Button, Menu, Dropdown, Slider, Icon, Tabs} from "antd";
import "./Player.css";
import screenfull from 'screenfull'

/**
 * The Player
 *  @see ReactPlayer {@link https://www.npmjs.com/package/react-player}
 *  @version 0.9.0-pre
 *  @author TianqiCS
 */
export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: true,
            volume: 100,
            muted: false,
            pip: false,
            visible: false,
            playbackRate: 4,
        }

    }

    onPause = () => {
        this.setState({ playing: false })
    };

    onPlay = () => {
        this.setState({ playing: true })
    };

    onEnded = () => {
        console.log('Ended');
    };

    pause = () => {
        this.setState({ playing: !this.state.playing })
    };

    // adjust volume by scroll
    handleScroll = (e) => {
        if (!this.state.muted) {
            if (this.state.volume < 100 && e.nativeEvent.wheelDelta > 0) {
                this.setState({volume: Math.round(this.state.volume +5)});
            }
            else if (this.state.volume > 0 && e.nativeEvent.wheelDelta < 0) {
                this.setState({volume: Math.round(this.state.volume - 5)});
            }
        }
    };

    pip = () => {
        this.setState({ pip: !this.state.pip })
    };

    setPlaybackRate = (e) => {
        this.setState({ playbackRate: e})
    };

    onBlur = () => {
        if (!this.state.playing) {
            return {
                filter: "blur(5px)",
            };
        }
    };

    onEnablePIP = () => {
        this.setState({ pip: true })
    };
    onDisablePIP = () => {
        this.setState({ pip: false })
    };

    handleMenuClick = (e) => {
        // prevent close
    };

    handleVisibleChange = (flag) => {
        this.setState({ visible: flag });
    };

    handlePlayerClick = () => {
      if (!this.state.visible) {
          this.pause()
      }
    };

    toggleMuted = () => {
        this.setState({ muted: !this.state.muted })
    };

    onClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
    };

    ref = player => {
        this.player = player
    };

    /**
     * Render the player
     * @see Menu {@link https://ant.design/components/menu/}
     * @see Tabs {@link https://ant.design/components/tabs/}
     * @see Slider {@link https://ant.design/components/slider/}
     * @see Dropdown {@link https://ant.design/components/dropdown/}
     * @returns {*} the player
     */
    render () {
        const TabPane = Tabs.TabPane;
        const menu = (
            <Menu onClick={this.handleMenuClick} className="ContentMenu">
                <Tabs defaultActiveKey="1" className="ContentMenuTabs" >
                    <TabPane tab={<span><Icon type="setting" />Basic</span>} key="1">
                        <Icon type="sound"
                              className="SoundIcon"
                              onClick={this.toggleMuted}
                              style={{color: this.state.muted ? "red" : "#08c"}}
                        />
                        <Slider
                            className="VolumeBar"
                            min={0}
                            max={100}
                            onChange={(value)=>{
                                this.setState({
                                    volume: value
                                })
                            }}
                            value={this.state.volume}
                        />
                        <br/>
                        <Icon type="forward" className="SoundIcon"/>
                        <Slider
                            className="VolumeBar"
                            min={1}
                            max={7}
                            onChange={this.setPlaybackRate}
                            value={this.state.playbackRate}
                            tipFormatter={(value) => {return `x${value * 0.25}`;}}
                        />
                        <br/>
                        <span>
                            <Button icon="fullscreen" size="large" className="FullscreenButton" onClick={this.onClickFullscreen}/>
                        {ReactPlayer.canEnablePIP(this.props.url) &&
                            <Button icon="down-square" size="large" className="PiPButton" onClick={this.pip}/>
                        }
                        </span>
                    </TabPane>
                    <TabPane tab={<span><Icon type="bars" />Tab 2</span>} key="2">
                        <h2>Video info</h2>
                        <span>Source: {this.props.url}</span>
                        <p>{"****TODO****"}</p>

                    </TabPane>
                    <TabPane tab={<span><Icon type="info-circle" />About</span>} key="3">
                        Made by Tianqi @ 0.1.0
                    </TabPane>
                </Tabs>
            </Menu>
        );

        return (

            <div
                className="Player"
                onWheel={this.handleScroll}
                key={this.props.url}  // important! force refresh the player
            >
                <Dropdown overlay={menu} trigger={['contextMenu']} onVisibleChange={this.handleVisibleChange} visible={this.state.visible}>
                <ReactPlayer
                    ref={this.ref}
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={this.props.url}
                    playing={this.state.playing}
                    pip={this.state.pip}
                    volume={this.state.volume * 0.01}
                    muted={this.state.muted}
                    playbackRate={this.state.playbackRate * 0.25}
                    onReady={() => console.log('Player Ready!')}
                    onStart={() => console.log('Player Start!')}
                    onPlay={this.onPlay}
                    onEnablePIP={this.onEnablePIP}
                    onDisablePIP={this.onDisablePIP}
                    onPause={this.onPause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.onEnded}
                    onError={e => console.log("[Error]: " + e)}
                    style={this.onBlur()}
                    onClick={this.handlePlayerClick}

                />
                </Dropdown>
                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 0, backgroundColor: '#282c34', borderColor: '#282c34', color: '#08c'}}>
                        Player Settings <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        )
    }
}