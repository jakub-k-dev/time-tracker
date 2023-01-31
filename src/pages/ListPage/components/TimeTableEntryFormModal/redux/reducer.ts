import { TimeTableEntryFormMode } from "src/components/TimeTableEntryForm/TimeTableEntryForm";
import { TimeTableEntry } from "src/types";

import { TimeTableActions } from "./actions";

export type TimeTableState = {
  isModalOpen: boolean;
  formDefaultValues?: TimeTableEntry;
  mode?: TimeTableEntryFormMode;
};

const initialState: TimeTableState = {
  isModalOpen: false,
  formDefaultValues: undefined,
  mode: undefined,
};

export function timeTableReducer(
  state: TimeTableState = initialState,
  action: TimeTableActions
) {
  switch (action.type) {
    case "TIME_TABLE.MODAL.OPEN": {
      const { mode, formDefaultValues } = action.payload;
      return {
        ...state,
        isModalOpen: true,
        mode,
        formDefaultValues,
      };
    }

    case "TIME_TABLE.MODAL.CLOSE": {
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
