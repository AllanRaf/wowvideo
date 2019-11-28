import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import YouTube from 'react-native-youtube';
import {mychannels} from '../../../channels/mychannels';

export default class VideoVisualiser extends Component {
  render() {
    return (
      <>
        <YouTube
          // The YouTube video ID
          //videoId="FOH3ZOMBwhY"
          videoIds={mychannels[1].playlist}
          play // control playback of video with true/false
          fullscreen={false} // control whether the video should play in fullscreen or inline
          loop // control whether the video should loop when ended
          onReady={e => this.setState({isReady: true})}
          onChangeState={e => this.setState({status: e.state})}
          onChangeQuality={e => this.setState({quality: e.quality})}
          onError={e => this.setState({error: e.error})}
          style={styles.videoArea}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 30,
    color: 'blue',
  },
  channelBar: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoArea: {
    flex: 4,
    alignSelf: 'stretch',
    height: 300,
  },
});
