import { TimeTableEntryFormMode } from "src/components/TimeTableEntryForm/TimeTableEntryForm";
import { TimeTableEntry } from "src/types";

export type TimeTableFormActions =
  | TimeTableFormModalOpenAction
  | TimeTableFormModalCloseAction;

type TimeTableFormModalOpenAction = {
  type: "TIME_TABLE_FORM.MODAL.OPEN";
  payload: { mode: TimeTableEntryFormMode; formDefaultValues?: TimeTableEntry };
};

type TimeTableFormModalCloseAction = {
  type: "TIME_TABLE_FORM.MODAL.CLOSE";
};

export const timeTableFormModalOpen = (
  mode: TimeTableEntryFormMode,
  formDefaultValues?: TimeTableEntry
): TimeTableFormModalOpenAction => ({
  type: "TIME_TABLE_FORM.MODAL.OPEN",
  payload: { mode, formDefaultValues },
});

export const timeTableFormModalClose = (): TimeTableFormModalCloseAction => ({
  type: "TIME_TABLE_FORM.MODAL.CLOSE",
});
