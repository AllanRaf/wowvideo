/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import YouTube from 'react-native-youtube';
import {mychannels} from './channels/mychannels';
import ChannelVisualiser from './src/components/channelbar/ChannelContainer';

import {Colors} from 'react-native/Libraries/NewAppScreen';

class App extends Component {
  render() {
    console.log('mychannels is', mychannels);
    return (
      <>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.main}>
            <Text>Videos</Text>
            <ChannelVisualiser />
          </View>
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
  mainText: {
    fontSize: 30,
    color: 'blue',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
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

export default App;
