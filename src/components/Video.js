/// ShatApp.js
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from '../store';
import VideoApp from './VideoApp';

export default class Video extends Component {
  render() {
    return (
      <Provider store={store}>
        <VideoApp />
      </Provider>
    );
  }
}
