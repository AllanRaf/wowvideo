import React, {Component} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import ChannelBarVisualiser from './channelbar/ChannelBarVisualiser';
import VideoVisualiser from './videoscreen/VideoVisualiser';

class App extends Component {
  constructor(props) {
    super(props);
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
          <VideoVisualiser />
          {this.state.orientation && <ChannelBarVisualiser />}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: '#e67300',
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
