//reducers/test.js
export default (state = '', action) => {
  switch (action.type) {
    case 'NEW_CHANNEL':
      console.log('NEW CHANNEL', action.payload);
      return action.payload;

    default:
      return state;
  }
};
