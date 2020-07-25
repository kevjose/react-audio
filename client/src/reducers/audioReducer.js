import * as actions from '../actions/audioActions';
import { TRANSCRIPT, filler } from '../transcript';

export const initialState = {
  audioFile:
    'https://zenprospect-production.s3.amazonaws.com/uploads/phone_call/uploaded_content/59e106639d79684277df770d.wav',
  playing: false,
  duration: 0,
  currentTime: 0,
  jumpTo: 0,
  transcript_text: TRANSCRIPT.transcript_text,
  word_timings: TRANSCRIPT.word_timings.map((item) => filler(item)),
  searchText: '',
};

export default function audioReducer(state = initialState, action) {
  switch (action.type) {
    case actions.TOGGLE_PLAY:
      return { ...state, playing: !state.playing };
    case actions.SET_DURATION:
      return { ...state, duration: action.payload.duration };
    case actions.GET_CURRENT_TIME:
      return { ...state, currentTime: action.payload.currentTime };
    case actions.JUMP_TO_TIME:
      return { ...state, jumpTo: action.payload.jumpTo };
    case actions.SET_SEARCH_TEXT:
      return { ...state, searchText: action.payload.searchText };
    default:
      return state;
  }
}
