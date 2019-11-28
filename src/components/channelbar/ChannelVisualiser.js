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
    console.log('changing channel to', channel);
    console.log('this.props is', this.props);
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
            keyExtractor={item => item.id}
          />
        </View>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    c: state,
  };
}

export default connect(mapStateToProps)(ChannelVisualiser);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
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
