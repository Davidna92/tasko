import { myUrl } from "../config.json";
import http from "./httpService";

export function createList(list) {
  return http.post(`${myUrl}/lists/add-list`, list);
}

export function getList(listID) {
  return http.get(`${myUrl}/lists/${listID}`);
}

export default {
  createList,
  getList,
};
