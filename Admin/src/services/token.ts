import { AUTH_TOKEN_NAME } from "../const";

const getToken = () => localStorage.getItem(AUTH_TOKEN_NAME) ?? "";

const setToken = (token: string) =>
  localStorage.setItem(AUTH_TOKEN_NAME, token);

const removeToken = () => localStorage.removeItem(AUTH_TOKEN_NAME);

export { getToken, setToken, removeToken };
