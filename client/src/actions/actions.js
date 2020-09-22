import http from "../services/httpService";
import { myUrl } from "../config.json";

//action types created and exported
export const ADD_LIST = "ADD_LIST";
export const ADD_CARD = "ADD_CARD";
export const READ = "fetch all items";
export const UPDATE = "update item";
export const DELETE = "delete item";
export const FETCH_ITEMS_BEGIN = "begin fetching items";
export const FETCH_ITEMS_SUCCESS = "Items fetched successfully";
export const FETCH_ITEMS_FAILURE = "Failed to fetch items";

export const fetchItemsBegin = () => ({
  type: FETCH_ITEMS_BEGIN,
});
export const fetchItemsSuccess = (data) => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: { data },
});
export const fetchItemsFailure = (errors) => ({
  type: FETCH_ITEMS_FAILURE,
  payload: { errors },
});

//dispatched when item needs to be created
export const addList = (list) => {
  return {
    type: ADD_LIST,
    payload: { list },
  };
};

// add card
export const addCard = (card, listID) => {
  return {
    type: ADD_CARD,
    payload: { card, listID }
  };
};

//dispatched when all the lists from board stored in redux store needs to be read
export const getBoardLists = () => {
  return (dispatch) => {
    // function starts
    dispatch(fetchItemsBegin()); // fetching begins
    return http
      .get(`${myUrl}/boards/one`) // req data from server
      .then(({ data }) => {

        // if data is found
        dispatch(fetchItemsSuccess(data)); // success
      })
      .catch((error) => dispatch(fetchItemsFailure(error))); //errors
  };
};

//get list
// export const getList = (listID) => {
//   return (dispatch) => {
//     dispatch(fetchItemsBegin());
//     return http
//       .get(`${myUrl}/lists/${listID}`)
//       .then(({ data }) => {
//         dispatch(fetchItemsSuccess(data)); // success
//       })
//       .catch((error) => dispatch(fetchItemsFailure(error)));
//   };
// };

//dispatched when certain item needs to be updated
export const updateItem = (item) => ({
  type: UPDATE,
  payload: { item },
});

//dispatched when certain item needs to be removed from redux store
export const deleteItem = (id) => ({
  type: DELETE,
  payload: { id },
});
