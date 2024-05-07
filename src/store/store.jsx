// store.js
import { createStore } from "redux";
import searchHistoryReducer from "./searchHistoryReducer";

const store = createStore(searchHistoryReducer);

export default store;
