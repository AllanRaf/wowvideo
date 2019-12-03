import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import YouTube from 'react-native-youtube';
import {mychannels} from '../../../channels/mychannels';
import {connect} from 'react-redux';
import {VIDEO_UNSTARTED, UPDATE_BUFFERING} from '../../constants/videostate';
import {ADD_WATCHED_VIDEO, UPDATE_WATCHED_VIDEOS} from '../../constants/video';

export class VideoVisualiser extends Component {
  currentVideo = event => {
    //update buffering if buffering for first time on buffering event
    //and set unstarted state to true if moving on to next video in playlist
    if (event === 'unstarted') {
      const action = {
        type: VIDEO_UNSTARTED,
        payload: {buffering: 0, unstarted: true},
      };
      this.props.dispatch(action);
    } else if (this.props.state.videostate.buffering === 0) {
      //video being shown for first time if buffering state was 0
      const actionVideoState = {type: UPDATE_BUFFERING, payload: null};
      this.props.dispatch(actionVideoState);
    } else {
      //second buffer or higher -> video has not changed.  No need to check if video has been watched.
      return;
    }
    //Find first index of unwatched video in channel
    const allVideosInChannel =
      mychannels[
        this.props.state.channel.id ? this.props.state.channel.id - 1 : 0
      ].playlist;
    const allVideosIHaveSeen = this.props.state.videos;
    const unwatchedVideos = allVideosInChannel.filter(video => {
      return !allVideosIHaveSeen.includes(video);
    });

    let indexOfFirstUnwatchedVideo = allVideosInChannel.findIndex(
      video => video === unwatchedVideos[0],
    );
    //If I have seen everything in the channel delete all the videos from my watched videos list
    if (indexOfFirstUnwatchedVideo === -1) {
      const updateVideosIHaveSeen = allVideosIHaveSeen.filter(video => {
        return !allVideosInChannel.includes(video);
      });
      const action = {
        type: UPDATE_WATCHED_VIDEOS,
        payload: updateVideosIHaveSeen,
      };
      this.props.dispatch(action);
      //Reset index to first video in channel
      indexOfFirstUnwatchedVideo = 0;
    }
    //Add the video to allVideosIHaveSeen
    const watchedVideo =
      mychannels[
        this.props.state.channel.id ? this.props.state.channel.id - 1 : 0
      ].playlist[indexOfFirstUnwatchedVideo];
    const action = {type: ADD_WATCHED_VIDEO, payload: watchedVideo};
    this.props.dispatch(action);

    //If the video I am watching is not one I have not seen then change it
    this._player
      .getVideosIndex()
      .then(index => {
        if (index !== indexOfFirstUnwatchedVideo) {
          //change video to show first one I haven't watched
          this._player.playVideoAt(indexOfFirstUnwatchedVideo);
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <>
        <YouTube
          ref={item => (this._player = item)}
          //videoId
          videoIds={
            mychannels[
              this.props.state.channel.id ? this.props.state.channel.id - 1 : 0
            ].playlist
          }
          play={true}
          fullscreen={false}
          onReady={e => {
            this.setState({isReady: true});
          }}
          onChangeState={(...args) => {
            console.log('args', args);
            if (
              args[0].state === 'unstarted' ||
              args[0].state === 'buffering'
            ) {
              this.currentVideo(args[0].state);
            }
          }}
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
    flex: 4,
    alignSelf: 'stretch',
    height: 400,
  },
});
