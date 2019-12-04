//reducers/channel.js
import {CHANGE_CHANNEL} from '../constants/channel';
export default (state = 1, action) => {
  switch (action.type) {
    case CHANGE_CHANNEL:
      return {...action.payload};
    default:
      return state;
  }
};
