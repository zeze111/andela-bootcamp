import isEmpty from 'lodash/isEmpty';
import {
  SET_CURRENT_USER,
  UPDATE_USER,
  GET_USER,
  CHANGE_PASSWORD
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  profile: {},
  message: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    case UPDATE_USER:
      return {
        ...state,
        message: action.payload.message,
        profile: action.payload.user,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        message: action.payload.message,
        profile: action.payload.user,
      };
    case GET_USER:
      return {
        ...state,
        profile: action.payload.user,
      };
    default: return state;
  }
};
