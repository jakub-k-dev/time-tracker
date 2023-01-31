import { TimeTableEntryFormMode } from "src/components/TimeTableEntryForm/TimeTableEntryForm";
import { TimeTableEntry } from "src/types";

export type TimeTableActions =
  | TimeTableModalOpenAction
  | TimeTableModalCloseAction;

type TimeTableModalOpenAction = {
  type: "TIME_TABLE.MODAL.OPEN";
  payload: { mode: TimeTableEntryFormMode; formDefaultValues?: TimeTableEntry };
};

type TimeTableModalCloseAction = {
  type: "TIME_TABLE.MODAL.CLOSE";
};

export const timeTableModalOpen = (
  mode: TimeTableEntryFormMode,
  formDefaultValues?: TimeTableEntry
): TimeTableModalOpenAction => ({
  type: "TIME_TABLE.MODAL.OPEN",
  payload: { mode, formDefaultValues },
});

export const timeTableModalClose = (): TimeTableModalCloseAction => ({
  type: "TIME_TABLE.MODAL.CLOSE",
});
