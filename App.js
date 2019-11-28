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

import {Colors} from 'react-native/Libraries/NewAppScreen';

class App extends Component {
  render() {
    return (
      <>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.main}>
              <Text style={styles.mainText}>Wow Video</Text>
              <YouTube
                // The YouTube video ID
                videoId="FOH3ZOMBwhY"
                play // control playback of video with true/false
                fullscreen={false} // control whether the video should play in fullscreen or inline
                loop // control whether the video should loop when ended
                onReady={e => this.setState({isReady: true})}
                onChangeState={e => this.setState({status: e.state})}
                onChangeQuality={e => this.setState({quality: e.quality})}
                onError={e => this.setState({error: e.error})}
                style={styles.videoArea}
              />
            </View>
          </ScrollView>
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
