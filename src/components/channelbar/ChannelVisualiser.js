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
  channelSelect = channel => {
    console.log('the new channel is', channel);
    const action = {type: 'NEW_CHANNEL', payload: channel};
    this.props.dispatch(action);
    console.log('this.props after dispatch', this.props.channel);
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
                <TouchableHighlight onPress={() => this.channelSelect(item.id)}>
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
  },
  channelIcons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
