import React, {Component} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import ChannelVisualiser from '../components/channelbar/ChannelVisualiser';
import VideoVisualiser from '../components/videoscreen/VideoVisualiser';

class VideoApp extends Component {
  constructor() {
    super();

    /**
     * Returns true if the screen is in portrait mode
     */
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
      console.log('ORIENTATION HAS CHANGED');
    });
  }
  /*state = {
    channelChanged: false,
  };
  channelChangedHandler = () => {
    this.setState({channelChanged: !this.state.channelChanged});
    //alert('channel changing');
  };*/

  render() {
    return (
      <>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.main}>
            <Text>Videos</Text>
          </View>
          <VideoVisualiser channelChanged={this.state.channelChanged} />
          <ChannelVisualiser changingChannel={this.channelChangedHandler} />
          <View style={styles.main}>
            <Text>Navigation</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default VideoApp;

/*
            <ChannelVisualiser channelChanging={this.channelChangedHandler}/>
            </View>
            <VideoVisualiser channelChanged={this.state.channelChanged} />
      tried to refer to other component using ref
                      <VideoVisualiser ref={instance => (this.video = instance)} />
          <ChannelVisualiser
            changingChannel={() => {
              this.video.currentVideo();
            }}
          />
            */
