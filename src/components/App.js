import React, {Component} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import ChannelVisualiser from './channelbar/ChannelVisualiser';
import VideoVisualiser from './videoscreen/VideoVisualiser';

class App extends Component {
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
              <Text style={styles.header}>WOW VIDEO</Text>
            </View>
          )}
          <VideoVisualiser orientation={this.state.orientation} />
          {this.state.orientation && (
            <ChannelVisualiser orientation={this.state.orientation} />
          )}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: '#e67300', //'#e60000',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
