//reducers/videos.js
import {ADD_WATCHED_VIDEO, UPDATE_WATCHED_VIDEOS} from '../constants/video';
export default (state = [], action) => {
  switch (action.type) {
    case ADD_WATCHED_VIDEO:
      return [...state, action.payload];
    case UPDATE_WATCHED_VIDEOS:
      return [...action.payload];
    default:
      return state;
  }
};
