// Reducer to listen for actions.
const reducer = (state, action) => {
  console.log(action);

  switch(action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists
      };
    default:
      return state;
  }
}

export default reducer;
