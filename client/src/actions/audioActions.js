export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const SET_DURATION = 'SET_DURATION';
export const GET_CURRENT_TIME = 'GET_CURRENT_TIME';
export const JUMP_TO_TIME = 'JUMP_TO_TIME';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

export const togglePlay = () => ({ type: TOGGLE_PLAY });
export const setDuration = (duration) => ({
  type: SET_DURATION,
  payload: { duration },
});

export const getCurrentTime = (currentTime) => ({
  type: GET_CURRENT_TIME,
  payload: { currentTime },
});

export const setJumpToTime = (jumpTo) => ({
  type: JUMP_TO_TIME,
  payload: { jumpTo },
});

export const setSearchTerm = (searchText) => ({
  type: SET_SEARCH_TEXT,
  payload: { searchText },
});
