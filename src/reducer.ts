import { combineReducers } from "redux";

import {
  timeTableEntryFormReducer,
  TimeTableEntryFormState,
} from "./pages/ListPage/components/TimeTableEntryFormModal/redux/reducer";
import {
  timeTableEntryInfoReducer,
  TimeTableEntryInfoState,
} from "./pages/ListPage/components/TimeTableEntryInfoModal/redux/reducer";

export type StoreState = {
  timeTableEntryForm: TimeTableEntryFormState;
  timeTableEntryInfo: TimeTableEntryInfoState;
};

export const rootReducer = combineReducers<StoreState>({
  timeTableEntryForm: timeTableEntryFormReducer,
  timeTableEntryInfo: timeTableEntryInfoReducer,
});
