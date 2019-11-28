//reducers/test.js
export default (state = false, action) => {
  switch (action.type) {
    case 'TEST':
      return true;

    default:
      return state;
  }
};
