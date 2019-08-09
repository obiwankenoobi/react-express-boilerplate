import axios from "axios";
import endpoints from "../constants/endpoints";
const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 60000
});

const setAuthTokenInHeader = (token:string) =>
  (instance.defaults.headers.common.Authorization = `Bearer ${token}`);

const login = (username:string, password:string) =>
  instance.post(endpoints.login, { username, password });

const signup = (username:string, password:string) =>
  instance.post(endpoints.signup, { username, password });

const activate = (token:string, username:string) =>
  instance.get(endpoints.activate(token, username));

const privacyTest = () => instance.get(endpoints.privacyTest);

const askResetPassword = (username:string) =>
  instance.post(endpoints.askResetPassword, { username });

const resetPassword = (username:string) =>
  instance.post(endpoints.resetPassword, { username });

export default {
  setAuthTokenInHeader,
  login,
  signup,
  activate,
  privacyTest,
  askResetPassword,
  resetPassword
};
