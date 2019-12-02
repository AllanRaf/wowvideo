//videostate.js
//used to determine whether we have just changed channel or whether next video is playing in the
//playlist.  "unstarted" event triggered when moving to next video in playlist before any
//"buffering" event and if you have changed channel "buffering" event triggered with no "unstarted"
export default (state = {buffering: 0, unstarted: false}, action = {}) => {
  switch (action.type) {
    case 'UPDATE_BUFFERING':
      console.log('UPDATE_BUFFERING', state.buffering);
      return {...state, ...state.buffering++};
    case 'RESET_BUFFERING':
      //triggered when channel changed by user
      console.log('RESET_BUFFERING');
      return action.payload;
    case 'VIDEO_UNSTARTED':
      console.log('VIDEO_UNSTARTED');
      return action.payload; //{...(state.buffering = 0), ...(state.unstarted = true)};

    default:
      return state;
  }
};
