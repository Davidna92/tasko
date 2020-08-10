import { myUrl } from "../config.json";
import http from "./httpService";
import jwtDecode from "jwt-decode";

const userToken = "token";

export function logout() {
  localStorage.removeItem(userToken);
}

export function getThisUser() {
    try {
      const jwt = localStorage.getItem(userToken);
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  }

export async function login(email, password) {
  const { data } = await http.post(`${myUrl}/auth`, { email, password });
  localStorage.setItem(userToken, data.token);
}

export default { login, logout, getThisUser };
