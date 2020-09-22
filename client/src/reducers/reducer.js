//import action types that are required by the reducer
import { ADD_LIST, READ, UPDATE, DELETE, ADD_CARD } from "../actions/actions";
import {
  FETCH_ITEMS_BEGIN,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
} from "../actions/actions";

//initial state for redux store
const initialState = {
  boardLists: [],
};

//reducer function
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        boardLists: action.payload.data.boardLists,
      };
    case FETCH_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        boardLists: [],
      };
    //handless creation of data
    case ADD_LIST:
      const { list } = action.payload;
      return {
        boardLists: [...state.boardLists, list],
      };

    case ADD_CARD:
      const { card, listID } = action.payload;
      return {
        boardLists: state.boardLists.map((list) => {
          return list._id === listID
            ? {...list, cards: [...list.cards, card]}
            : list;
        }),
      };

    //reads all the data from the store
    case READ:
      return state;

    //handles item updates in redux store
    case UPDATE: {
      const updatedItem = { ...action.payload.item };
      return {
        boardLists: [...state.boardLists].map((item) => {
          if (item.id === updatedItem.id) {
            return updatedItem;
          } else return item;
        }),
      };
    }

    //handles item deletion from redux store
    case DELETE: {
      const { id } = action.payload;
      return {
        menuItems: [...state.menuItems].filter((item) => item.id !== id),
      };
    }

    //returns default state, in case some unknown action type is discovered
    default:
      return state;
  }
}
