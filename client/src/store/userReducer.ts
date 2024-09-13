import {LOGIN, CHANGE_NAME, LOGOUT, GET_PRODUCT} from './types';

const initialState = {
  isSignedIn: false,
  userName: 'Super Man',
  products: [],
};

type ActionType = {
  type: string;
  payload: any;
};

export default (state = initialState, {type, payload}: ActionType) => {
  switch (type) {
    case LOGIN:
      return {...state, isSignedIn: payload};

    case LOGOUT:
      return {...state, isSignedIn: payload};

    case CHANGE_NAME:
      return {...state, userName: payload};

    case GET_PRODUCT:
      return {...state, products: payload};
  }

  return state;
};
