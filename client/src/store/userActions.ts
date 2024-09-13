import axios from 'axios';
import {LOGIN, CHANGE_NAME, LOGOUT, GET_PRODUCT} from './types';
import {Dispatch} from 'redux';
import {url, setHeaders} from './api';

export const loginAction = () => {
  return {
    type: LOGIN,
    payload: true,
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
    payload: false,
  };
};

export const changeNameAction = (userName: string) => {
  return {
    type: CHANGE_NAME,
    payload: userName,
  };
};

export const getProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      const {data} = await axios.get(`${url}/products`);

      dispatch({
        type: GET_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
