import { myUrl } from "../config.json";
import http from "./httpService";

export function createCard(card, listID) {
  return http.post(`${myUrl}/lists/add-task/${listID}`, card);
}

export function getCard(cardID) {
  return http.get(`${myUrl}/cards/${cardID}`);
}

export default {
  getCard,
  createCard
};
