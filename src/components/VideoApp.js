import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import ChannelVisualiser from '../components/channelbar/ChannelVisualiser';
import VideoVisualiser from '../components/videoscreen/VideoVisualiser';

class VideoApp extends Component {
  render() {
    return (
      <>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.main}>
            <Text>Videos</Text>
            <ChannelVisualiser />
          </View>
          <VideoVisualiser />
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
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default VideoApp;
