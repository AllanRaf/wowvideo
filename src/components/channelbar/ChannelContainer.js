import React, {Component} from 'react';
import {FlatList, StyleSheet, Image, View, Text} from 'react-native';
import ChannelVisualiser from './ChannelVisualiser';

export default class ChannelContainer extends Component {
  render() {
    return (
      <>
        <ChannelVisualiser />
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
