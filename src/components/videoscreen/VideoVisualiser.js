import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import YouTube from 'react-native-youtube';
import {mychannels} from '../../../channels/mychannels';
import {connect} from 'react-redux';

export class VideoVisualiser extends Component {
  componentDidMount() {
    //check youtube ref
    //console.log('this', this._player.state.playerParams.videoId);
  }
  currentVideo = () => {
    //add current video to the list
    console.log('Changing video to', this._player);

    this._player
      .getVideosIndex()
      .then(index => {
        const watchedVideo =
          mychannels[
            this.props.state.channel.id ? this.props.state.channel.id - 1 : 0
          ].playlist[index];
        //find out whether I have watched this video before dispatching
        console.log(
          'ALL THE VIDEOS I HAVE WATCHED',
          this.props.state.videos,
          'CURRENT VIDEO',
          watchedVideo,
        );
        console.log(
          'HAVE I WATCHED THIS VIDEO? MATCH OR UNDEFINED',

          this.props.state.videos.find(video => video === watchedVideo),
        );
        if (this.props.state.videos.find(video => video === watchedVideo)) {
          //go to next video in channel if I have seen it otherwise add it to my list
          this._player.nextVideo();
        } else {
          const action = {type: 'ADD_WATCHED_VIDEO', payload: watchedVideo};
          this.props.dispatch(action);
        }
      })
      .catch(errorMessage => {
        console.log(errorMessage);
      });
  };
  render() {
    return (
      <>
        <YouTube
          // The YouTube video ID
          //videoId="FOH3ZOMBwhY"
          ref={item => (this._player = item)}
          //videoId={mychannels[0].playlist[0]}
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
            if (args[0].state === 'playing') {
              this.currentVideo();
            }

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
