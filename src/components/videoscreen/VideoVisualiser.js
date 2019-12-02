import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import YouTube from 'react-native-youtube';
import {mychannels} from '../../../channels/mychannels';
import {connect} from 'react-redux';

export class VideoVisualiser extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    channelChanged: false,
  };

  currentVideo = event => {
    //update buffering if buffering for first time on buffering event
    //and set unstarted state to true on video unstarted event

    if (event === 'unstarted') {
      const actionVideoState = {
        type: 'VIDEO_UNSTARTED',
        payload: {buffering: 0, unstarted: true},
      };
      //1. update unstarted to true
      this.props.dispatch(actionVideoState);
      console.log('AFTER video UNSTARTED', this.props.state.videostate);
    } else if (this.props.state.videostate.buffering === 0) {
      const actionVideoState = {type: 'UPDATE_BUFFERING', payload: null};
      this.props.dispatch(actionVideoState);
      console.log(
        'AFTER BUFFERING DISPATCHED FROM BUFFERINGVIDEO()',
        this.props.state.videostate,
      );
    } else {
      //second buffer or higher -> video has not changed.
      return;
    }

    //2. Find all videos in current channel
    const allVideosInChannel =
      mychannels[
        this.props.state.channel.id ? this.props.state.channel.id - 1 : 0
      ].playlist;
    console.log('All VIDEOS IN CHANNEL', allVideosInChannel);
    //3. Find all videos I have seen
    const allVideosIHaveSeen = this.props.state.videos;
    console.log('ALL VIDEOS I HAVE SEEN', allVideosIHaveSeen);

    //4. Find all videos I haven't seen = unwatchedVideos
    const unwatchedVideos = allVideosInChannel.filter(video => {
      return !allVideosIHaveSeen.includes(video);
    });
    console.log('UNWATCHED VIDEOS IN CHANNEL', unwatchedVideos);

    //play first video I haven't seen by finding its index
    //5. Find index of first unwatchedVideo video I haven't seen in allVideosInChannel
    let indexOfFirstUnwatchedVideo = allVideosInChannel.findIndex(
      video => video === unwatchedVideos[0],
    );

    console.log('FIRST INDEX OF UNWATCHED VIDEO', indexOfFirstUnwatchedVideo);
    //6. If I have seen everything in the channel then delete all the videos from my watched videos list
    if (indexOfFirstUnwatchedVideo === -1) {
      const updateVideosIHaveSeen = allVideosIHaveSeen.filter(video => {
        return !allVideosInChannel.includes(video);
      });
      console.log('updateVideosIHaveSeen', updateVideosIHaveSeen);
      //update Redux state to reflect this
      const action = {
        type: 'UPDATE_WATCHED_VIDEOS',
        payload: updateVideosIHaveSeen,
      };
      //7. Update Redux state to show new videos I haven't seen
      this.props.dispatch(action);
      //8.  Reset index to zero which is the first video of channel
      indexOfFirstUnwatchedVideo = 0;
    }
    //Add video to allVideosIHaveSeen
    const watchedVideo =
      mychannels[
        this.props.state.channel.id ? this.props.state.channel.id - 1 : 0
      ].playlist[indexOfFirstUnwatchedVideo];

    console.log('VIDEO I HAVE JUST WATCHED', watchedVideo);
    const action = {type: 'ADD_WATCHED_VIDEO', payload: watchedVideo};
    this.props.dispatch(action);

    //9.  Find index of current video I am watching
    //find out if the index of first unwatched video is the same as the current video I am watching
    //if it is I don't need to do anything otherwise I should play the first video I have not watched
    this._player
      .getVideosIndex()
      .then(index => {
        console.log(
          'current video index in currentvideo is',
          index,
          'indexOfFirstUnwatchedVideo is',
          indexOfFirstUnwatchedVideo,
        );

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
          // The YouTube video ID
          //videoId="FOH3ZOMBwhY"
          ref={item => (this._player = item)}
          //videoId
          videoIds={
            mychannels[
              this.props.state.channel.id ? this.props.state.channel.id - 1 : 0
            ].playlist
          }
          play // control playback of video with true/false
          fullscreen={false} // control whether the video should play in fullscreen or inline
          loop // control whether the video should loop when ended
          onReady={e => {
            this.setState({isReady: true});
          }}
          //onStart={() => console.log('STARTING')}
          onChangeState={(...args) => {
            console.log('args', args);
            if (
              args[0].state === 'unstarted' ||
              args[0].state === 'buffering'
            ) {
              this.currentVideo(args[0].state);
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
