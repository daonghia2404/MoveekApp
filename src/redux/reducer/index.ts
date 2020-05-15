import { combineReducers } from "redux";
import { Genres } from "./genres";
import { SearchText } from "./search";
import { CurrentPage } from "./pagination";

export const RootReducer = combineReducers({
  Genres,
  SearchText,
  CurrentPage,
});
