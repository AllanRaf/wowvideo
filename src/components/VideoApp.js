import React, {Component} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import ChannelVisualiser from '../components/channelbar/ChannelVisualiser';
import VideoVisualiser from '../components/videoscreen/VideoVisualiser';

class VideoApp extends Component {
  constructor() {
    super();

    //check whether portrait or landscape
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? true : false,
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? true : false,
      });
      console.log('IS PORTRAIT', this.state.orientation);
    });
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.safeArea}>
          {this.state.orientation && (
            <View style={styles.heading}>
              <Text style={styles.header}>Videos</Text>
            </View>
          )}
          <VideoVisualiser orientation={this.state.orientation} />
          {this.state.orientation && (
            <ChannelVisualiser orientation={this.state.orientation} />
          )}
          {/*<View style={styles.main}>
            <Text>Navigation</Text>
    </View>*/}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 20,
    borderColor: 'black',
  },
  header: {
    fontSize: 30,
    color: 'blue',

    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default VideoApp;
