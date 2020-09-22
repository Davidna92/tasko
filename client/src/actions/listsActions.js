import http from "../services/httpService";
import { myUrl } from "../config.json";

export const FETCH_LISTS_BEGIN = "begin fetching lists";
export const FETCH_LISTS_SUCCESS = "Lists fetched successfully";
export const FETCH_LISTS_FAILURE = "Failed to fetch lists";

export const READ_LISTS = "READ_LISTS";

export const fetchListsBegin = () => ({
  type: FETCH_LISTS_BEGIN,
});
export const fetchListsSuccess = (data) => ({
  type: FETCH_LISTS_SUCCESS,
  payload: { data },
});
export const fetchListsFailure = (errors) => ({
  type: FETCH_LISTS_FAILURE,
  payload: { errors },
});



