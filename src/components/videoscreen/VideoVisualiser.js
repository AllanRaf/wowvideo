import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import YouTube from 'react-native-youtube';
import {mychannels} from '../../../channels/mychannels';
import {connect} from 'react-redux';

export class VideoVisualiser extends Component {
  currentVideo = () => {
    const allVideosInChannel =
      mychannels[
        this.props.state.channel.id ? this.props.state.channel.id - 1 : 0
      ].playlist;
    console.log('All VIDEOS IN CHANNEL', allVideosInChannel);
    const allVideosIHaveSeen = this.props.state.videos;
    console.log('ALL VIDEOS I HAVE SEEN', allVideosIHaveSeen);

    const unwatchedVideos = allVideosInChannel.filter(video => {
      return !allVideosIHaveSeen.includes(video);
    });
    console.log('UNWATCHED VIDEOS IN CHANNEL', unwatchedVideos);

    //play first video I haven't seen by finding its index
    let IndexOfFirstUnwatchedVideo = allVideosInChannel.findIndex(
      video => video === unwatchedVideos[0],
    );
    console.log('FIRST INDEX OF UNWATCHED VIDEO', IndexOfFirstUnwatchedVideo);
    //If I have seen everything in the channel then delete all the videos from my watched videos list
    if (IndexOfFirstUnwatchedVideo === -1) {
      const updateVideosIHaventSeen = allVideosIHaveSeen.filter(video => {
        return !allVideosInChannel.includes(video);
      });
      console.log('updateVideosIHaventSeen', updateVideosIHaventSeen);
      //update Redux state to reflect this
      const action = {
        type: 'UPDATE_WATCHED_VIDEOS',
        payload: updateVideosIHaventSeen,
      };
      this.props.dispatch(action);
      IndexOfFirstUnwatchedVideo = 0;
    }

    this._player.playVideoAt(IndexOfFirstUnwatchedVideo);

    const watchedVideo =
      mychannels[
        this.props.state.channel.id ? this.props.state.channel.id - 1 : 0
      ].playlist[IndexOfFirstUnwatchedVideo];

    console.log('VIDEO I HAVE JUST WATCHED', watchedVideo);
    const action = {type: 'ADD_WATCHED_VIDEO', payload: watchedVideo};
    this.props.dispatch(action);
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
            console.log('args', args);
            if (args[0].state === 'unstarted') {
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
