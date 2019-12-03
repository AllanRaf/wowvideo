import {ADD_WATCHED_VIDEO, UPDATE_WATCHED_VIDEOS} from '../constants/video';
export default (state = [], action) => {
  switch (action.type) {
    case ADD_WATCHED_VIDEO:
      console.log('ADD_WATCHED_VIDEO', action.payload);
      return [...state, action.payload];
    case UPDATE_WATCHED_VIDEOS:
      console.log('UPDATING WATCHED VIDEOS', action.payload);
      return [...action.payload];

    default:
      return state;
  }
};
