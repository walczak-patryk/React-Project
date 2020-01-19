import { 
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SERVICE
 } from './constants';

export const initialState = {
  service: null
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case LOGIN_ERROR: {
      const { name } = action.payload;
      alert(`User ${name} not found.`);
      return { ...state, user: null };
    }
    case SERVICE: {
      const { serv } = action.payload;
      return { ...state, service: serv};
    }
    default:
        return state
  }
}

export default appReducer;