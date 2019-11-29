//reducers/channel.js
export default (state = 1, action) => {
  switch (action.type) {
    case 'NEW_CHANNEL':
      console.log('NEW CHANNEL', action.payload);
      return {...action.payload};

    default:
      return state;
  }
};
