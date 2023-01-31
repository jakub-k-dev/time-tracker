import { StoreState } from "src/reducer";

export const getIsModalOpen = (state: StoreState) =>
  state.timeTableEntryForm.isModalOpen;

export const getFormDefaultValues = (state: StoreState) =>
  state.timeTableEntryForm.formDefaultValues;

export const getFormMode = (state: StoreState) => state.timeTableEntryForm.mode;
