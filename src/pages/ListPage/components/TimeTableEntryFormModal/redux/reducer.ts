import { TimeTableEntryFormMode } from "src/components/TimeTableEntryForm/TimeTableEntryForm";
import { TimeTableEntry } from "src/types";

import { TimeTableFormActions } from "./actions";

export type TimeTableEntryFormState = {
  isModalOpen: boolean;
  formDefaultValues?: TimeTableEntry;
  mode?: TimeTableEntryFormMode;
};

const initialState: TimeTableEntryFormState = {
  isModalOpen: false,
  formDefaultValues: undefined,
  mode: undefined,
};

export function timeTableEntryFormReducer(
  state: TimeTableEntryFormState = initialState,
  action: TimeTableFormActions
) {
  switch (action.type) {
    case "TIME_TABLE_FORM.MODAL.OPEN": {
      const { mode, formDefaultValues } = action.payload;
      return {
        ...state,
        isModalOpen: true,
        mode,
        formDefaultValues,
      };
    }

    case "TIME_TABLE_FORM.MODAL.CLOSE": {
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
