export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_WATCHED_VIDEO':
      console.log('ADD_WATCHED_VIDEO', action.payload);
      return [...state, action.payload];

    default:
      return state;
  }
};
