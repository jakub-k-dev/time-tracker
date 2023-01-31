import { TimeTableEntry } from "src/types";

export type TimeTableInfoActions =
  | TimeTableInfoModalOpenAction
  | TimeTableInfoModalCloseAction;

type TimeTableInfoModalOpenAction = {
  type: "TIME_TABLE_INFO.MODAL.OPEN";
  payload: { timeTableEntry: TimeTableEntry };
};

type TimeTableInfoModalCloseAction = {
  type: "TIME_TABLE_INFO.MODAL.CLOSE";
};

export const timeTableInfoModalOpen = (
  timeTableEntry: TimeTableEntry
): TimeTableInfoModalOpenAction => ({
  type: "TIME_TABLE_INFO.MODAL.OPEN",
  payload: { timeTableEntry },
});

export const timeTableInfoModalClose = (): TimeTableInfoModalCloseAction => ({
  type: "TIME_TABLE_INFO.MODAL.CLOSE",
});
