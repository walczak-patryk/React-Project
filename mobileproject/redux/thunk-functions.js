import {
    service,
    loginSuccess,
    loginError
  } from "./actions";
  
 
  export const login = name => {
    return dispatch => {
      return fetch("http://localhost:3004/users")
        .then(data => data.json())
        .then(users => {
          const user = users.find(user => user.username === name);
          if (user !== undefined) {
            dispatch(loginSuccess(user));
          } else {
            dispatch(loginError(name));
          }
        });
    };
  };

  export const changeService = serv => {
    return dispatch =>{
      dispatch(service(serv));
    };
  };