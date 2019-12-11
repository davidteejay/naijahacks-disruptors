import { LOADING } from '../actions/types';

const initialState = false;

export default function (state = initialState, action) {
  if (action.type === LOADING) {
    return action.payload;
  } else {
    return state;
  }
}
