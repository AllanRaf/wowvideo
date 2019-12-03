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
  componentDidMount() {
    if (this.props.orientation) {
      console.log('ORIENTATION CHANGED', this.props.orientation);
    }
  }
  channelSelect = (id, icon, name) => {
    const action = {type: 'NEW_CHANNEL', payload: {id, icon, name}};
    this.props.dispatch(action);
    //On channel change reset video states to detect whether video has been seen.
    const actionVideoState = {
      type: 'RESET_BUFFERING',
      payload: {buffering: 0, unstarted: false},
    };
    this.props.dispatch(actionVideoState);
  };

  render() {
    return (
      <>
        <View style={styles.main}>
          <View style={styles.currentChannel}>
            <Text style={styles.currentChannelText}>
              Current Channel:{' '}
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
          <Text style={styles.mainText}>Channel Selector</Text>
          <View style={styles.flatlist}>
            <FlatList
              horizontal={true}
              data={mychannels}
              renderItem={({item}) => (
                <View style={styles.channelIcons}>
                  <TouchableHighlight
                    onPress={() => {
                      this.channelSelect(item.id, item.icon, item.name);
                    }}>
                    <Image
                      key={item.id}
                      style={styles.image}
                      source={{uri: item.icon}}
                    />
                  </TouchableHighlight>
                  <View style={styles.videoNumber}>
                    <Text>{item.playlist.length}</Text>
                  </View>
                  <Text>{item.name}</Text>
                </View>
              )}
              keyExtractor={item => item.name}
            />
          </View>
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
    flex: 2,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  mainText: {
    fontSize: 30,
    color: 'blue',
  },
  flatlist: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  image: {
    height: 50,
    width: 50,
    marginHorizontal: 40,
    marginBottom: 10,
  },
  channelIcons: {
    flex: 0.75,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  currentChannel: {
    flex: 0.2,
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  currentChannelText: {
    color: 'blue',
    borderBottomColor: 'black',
    borderStyle: 'solid',
  },
  currentChannelIcon: {
    marginLeft: 20,
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  videoNumber: {
    borderRadius: 30,
    borderWidth: 1,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
