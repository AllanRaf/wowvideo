import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import YouTube from 'react-native-youtube';
import {mychannels} from '../../../channels/mychannels';
import {connect} from 'react-redux';

export class VideoVisualiser extends Component {
  componentDidMount() {
    //check youtube ref
    console.log('this', this.player.state.playerParams.videoId);
  }
  currentVideo = () => {
    //add current video to the list
    console.log('Changing video');
  };
  render() {
    return (
      <>
        <YouTube
          // The YouTube video ID
          //videoId="FOH3ZOMBwhY"
          ref={item => (this.player = item)}
          //videoId={mychannels[1].playlist[0]}
          videoIds={
            mychannels[
              this.props.state.channel.id ? this.props.state.channel.id - 1 : 0
            ].playlist
          }
          play // control playback of video with true/false
          fullscreen={false} // control whether the video should play in fullscreen or inline
          loop // control whether the video should loop when ended
          onReady={e => {
            console.log('onReady');
            this.setState({isReady: true});
          }}
          onChangeState={(...args) => {
            console.log('onChangeState', args);
            this.currentVideo();
            // this.setState({status: e.state});
          }}
          onChangeQuality={e => this.setState({quality: e.quality})}
          onError={e => this.setState({error: e.error})}
          style={styles.videoArea}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(VideoVisualiser);

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
    flex: 3,
    alignSelf: 'stretch',
    height: 300,
  },
});
