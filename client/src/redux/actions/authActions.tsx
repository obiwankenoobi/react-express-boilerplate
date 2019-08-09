import apiClient from "../../network/apiClient";
import { Dispatch } from "react";

export const actionTypes = {
  SIGNUP: "SIGNUP",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  ACTIVATE: "ACTIVATE",
  ASK_RESET_PASSWORD: "ASK_RESET_PASSWORD",
  RESET_PASSWORD: "RESET_PASSWORD",
  ADD_USERNAME: "ADD_USERNAME",
  ADD_TOKEN: "ADD_TOKEN",
  SIGNED: "SIGNED"
};

export const _setUsername = (username:string) => ({
  type: actionTypes.ADD_USERNAME,
  username
});

export const _addToken = (token:string) => ({
  type: actionTypes.ADD_TOKEN,
  token
});

export const _isSignedup = () => ({
  type: actionTypes.SIGNED
});

export const _logout = () => ({
  type: actionTypes.LOGOUT
});

export const _login = (username:string, password:string) => async (dispatch:Dispatch<any>) => {
  try {
    const { data } = await apiClient.login(username, password);
    console.log(data);
    apiClient.setAuthTokenInHeader(data.token);
    dispatch(_setUsername(username));
    dispatch(_addToken(data.token));
  } catch (error) {
    console.log({ error });
  }
};

export const _signup = (username:string, password:string) => async (dispatch:Dispatch<any>) => {
  try {
    const { data } = await apiClient.signup(username, password);
    dispatch(_isSignedup());
    console.log(data);
    alert("user Signed")
  } catch (err) {
    
    if (err.response.data.errors) {
      err.response.data.errors.forEach((e:any) => {
        if (e.param === "password") {
          alert("password must be at least 8 length")
        }
      });
    } 
    
    if (err && err.response.data.error) {
      if (err.response.data.error.name === "UserExistsError") {
        alert(err.response.data.error.message)
      } 
    }
    console.log({ err });
  }
};

export const _activate = () => async (dispatch:Dispatch<any>, getState:Function) => {
  const { token, username } = getState().auth;

  try {
    const { data } = await apiClient.activate(token, username);
  } catch (error) {
    console.log({ error });
  }
};

export const _askResetPassword = () => async (dispatch:Dispatch<any>, getState:Function) => {
  const { username } = getState().auth;
  try {
    const { data } = await apiClient.askResetPassword(username);
  } catch (error) {
    console.log({ error });
  }
};

export const _resetPassword = () => async (dispatch:Dispatch<any>, getState:Function) => {
  const { username } = getState().auth;
  try {
    const { data } = await apiClient.resetPassword(username);
  } catch (error) {
    console.log({ error });
  }
};
