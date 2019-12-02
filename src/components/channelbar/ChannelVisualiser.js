import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import {mychannels} from '../../../channels/mychannels';
import {connect} from 'react-redux';

export class ChannelVisualiser extends Component {
  channelSelect = (id, icon, name) => {
    const action = {type: 'NEW_CHANNEL', payload: {id, icon, name}};
    this.props.dispatch(action);
    //reset buffering to 0 and unstart to zero on channel change
    const actionVideoState = {
      type: 'RESET_BUFFERING',
      payload: {buffering: 0, unstarted: false},
    };
    this.props.dispatch(actionVideoState);
    console.log(
      'RESET_BUFFERING AFTER CHANGING CHANNELS',
      this.props.state.videostate,
    );
  };
  render() {
    return (
      <>
        <View style={styles.main}>
          <Text style={styles.mainText}>Change Channels Below</Text>

          <FlatList
            horizontal={true}
            data={mychannels}
            renderItem={({item}) => (
              <View style={styles.channelIcons}>
                <TouchableHighlight
                  onPress={() => {
                    console.log('item is', item);
                    this.channelSelect(item.id, item.icon, item.name);
                    this.props.changingChannel();
                  }}>
                  <Image
                    key={item.id}
                    style={styles.image}
                    source={{uri: item.icon}}
                  />
                </TouchableHighlight>
                <Text>{item.name}</Text>
              </View>
            )}
            keyExtractor={item => item.name}
          />
        </View>
        <View style={styles.currentChannel}>
          <Text>
            You are currently watching channel{' '}
            {this.props.state
              ? this.props.state.channel.name
              : mychannels[0].name}
          </Text>
          <Image
            style={styles.currentChannelIcon}
            source={{
              uri: this.props.state
                ? this.props.state.channel.icon
                : mychannels[0].icon,
            }}
          />
        </View>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(ChannelVisualiser);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  mainText: {
    fontSize: 30,
    color: 'blue',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  image: {
    height: 50,
    width: 50,
    marginHorizontal: 50,
    margin: 10,
  },
  channelIcons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  currentChannel: {
    flex: 0.2,
    flexDirection: 'row',
  },
  currentChannelIcon: {
    width: 20,
    height: 20,
  },
});
