import { SET_CURRENT_USER, SET_TOKEN } from '../actions/types';

const initialState = {
  user: null,
  token: null,
};

export default function (state = initialState, action) {
  switch(action.type){
    case SET_CURRENT_USER:
      return {
        ...state,
        auth: action.payload,
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    default: {
      return state
    }
  }
}
