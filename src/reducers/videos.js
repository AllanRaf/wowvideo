export default (state = '', action) => {
  switch (action.type) {
    case 'WATCHED_VIDEO':
      console.log('WATCHED_VIDEO', action.payload);
      return [...state, action.payload];

    default:
      return state;
  }
};
