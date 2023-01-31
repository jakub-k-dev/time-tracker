import { TimeTableEntry } from "src/types";

import { TimeTableInfoActions } from "./actions";

export type TimeTableEntryInfoState = {
  isModalOpen: boolean;
  timeTableEntry?: TimeTableEntry;
};

const initialState: TimeTableEntryInfoState = {
  isModalOpen: false,
  timeTableEntry: undefined,
};

export function timeTableEntryInfoReducer(
  state: TimeTableEntryInfoState = initialState,
  action: TimeTableInfoActions
) {
  switch (action.type) {
    case "TIME_TABLE_INFO.MODAL.OPEN": {
      const { timeTableEntry } = action.payload;
      return {
        ...state,
        isModalOpen: true,
        timeTableEntry,
      };
    }

    case "TIME_TABLE_INFO.MODAL.CLOSE": {
      return {
        ...state,
        isModalOpen: false,
        mode: undefined,
        formDefaultValues: undefined,
      };
    }

    default:
      return state;
  }
}
