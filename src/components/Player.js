import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import {message, Button, Slider, Icon} from "antd";
import "./Player.css";

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            volume: 100,
            muted: false,
        }

    }

    onPause = () => {
        console.log('Paused');
        this.setState({ playing: false })
    };

    onPlay = () => {
        console.log('Played');
        this.setState({ playing: true })
    };

    onEnded = () => {
        console.log('Ended');
    };

    pause = () => {
        this.setState({ playing: !this.state.playing })
    };
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
    onBlur = () => {
        if (!this.state.playing) {
            return {
                filter: "blur(5px)",
            };
        }
    };

    render () {
        return (
            <div
                className="Player"
                onClick={this.pause}
                onWheel={this.handleScroll}
            >
                <ReactPlayer
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={this.props.url}
                    playing={this.state.playing}
                    volume={this.state.volume * 0.01}
                    muted={this.state.muted}
                    onReady={() => console.log('Player Ready!')}
                    onStart={() => console.log('Player Start!')}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.onEnded}
                    onError={e => console.log("[Error]: " + e)}
                    style={this.onBlur()}
                />
                <tr>
                    <th><Icon type="sound" className="SoundIcon" /></th>
                    <th>
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
                    </th>
                </tr>

            </div>
        )
    }
}