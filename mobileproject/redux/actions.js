import { 
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SERVICE
  } from './constants';

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user
    }
  };
};
export const loginError = name => {
  return {
    type: LOGIN_ERROR,
    payload: {
      name
    }
  };
};
export const service = Service => {
  return {
    type: SERVICE,
    payload: {
      Service
    }
  };
};