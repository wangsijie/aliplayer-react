# ALIPLAYER-REACT

React component wrapper for [aliplayer](https://player.alicdn.com).

Current version: 2.8.2

## Installation

```
npm i aliplayer-react
```

## Usage

[![Edit aliplayer-react](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/floral-wind-5b507?fontsize=14)

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Player from 'aliplayer-react';

const config = {
    source: "//player.alicdn.com/video/aliyunmedia.mp4",
    width: "100%",
    height: "500px",
    autoplay: true,
    isLive: false,
    rePlay: false,
    playsinline: true,
    preload: true,
    controlBarVisibility: "hover",
    useH5Prism: true,
};

class App extends Component {
    state = {
        instance: null,  // player instance, e.g: player.stop();
        components: null, // AliPlayerComponent, e.g: used for RateComponent
    }
    render() {
        return <div>
            <Player
                config={config}
                onGetInstance={instance => this.setState({ instance })}
                onGetComponents={components => this.setState({ components })}
            />
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
```
