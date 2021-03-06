import { history } from "../helpers/history";
import authService from "../services/auth.service";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
    
  export const register = (username, email, password, name) => (dispatch) => {
    return authService.register(username, email, password, name).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        // dispatch({
        //         type: "GET_POSTS",
        //         payload: response.data
        // })
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const login = (username, password) => (dispatch) => {
    return authService.login(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          // payload: { user: data },
        });
        history.push("/profile");
        window.location.reload();
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.error) ||
          error.message ||
          error.toString();
            console.log(message);
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const logout = () => (dispatch) => {
    authService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };

 