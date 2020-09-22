import { CONSTANTS } from "../actions";
// import boardService from "../services/boardService";
// import fetchBoardState from "../store/initialState";

let listID = 2;
let cardID = 5;

const initialState = [
  {
    title: "first list",
    id: `list-${0}`,
    cards: [
      { id: `card-${0}`, text: "I created a new card" },
      { id: `card-${1}`, text: "this is another card" },
    ],
  },
  {
    title: "list number two",
    id: `list-${1}`,
    cards: [
      { id: `card-${2}`, text: "nice one" },
      { id: `card-${3}`, text: "this is trello clone" },
      { id: `card-${4}`, text: "amazing job you did here" },
    ],
  },
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_BOARD:
      return {
        ...state,
        boardLists: action.payload,
      };
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`, //need to change
      };
      listID += 1;
      return [...state, newList];

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`, //need to change
      };
      cardID += 1;

      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });

      return newState;
    }
    case CONSTANTS.DRAG_HAPPEND:
      const {
        droppableIdStart,
        droppableIdEnd,
        dropableIndexStart,
        dropableIndexEnd,
        droppableId,
      } = action.payload;
      const newState = [...state];

      //in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(dropableIndexStart, 1);
        list.cards.splice(dropableIndexEnd, 0, ...card);
      }
      //other list
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find((list) => droppableIdStart === list.id);

        const card = listStart.cards.splice(dropableIndexStart, 1);

        const listEnd = state.find((list) => droppableIdEnd === list.id);
        listEnd.cards.splice(dropableIndexEnd, 0, ...card);
      }
      return newState;

    default:
      return state;
  }
};

export default listsReducer;
