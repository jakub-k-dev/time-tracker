import { combineReducers } from "redux";

import {
  timeTableReducer,
  TimeTableState,
} from "./pages/ListPage/components/TimeTableEntryFormModal/redux/reducer";

export type StoreState = {
  timeTableReducer: TimeTableState;
};

export const rootReducer = combineReducers<StoreState>({
  timeTableReducer,
});
