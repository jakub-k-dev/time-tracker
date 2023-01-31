import { StoreState } from "src/reducer";

export const getIsModalOpen = (state: StoreState) =>
  state.timeTableReducer.isModalOpen;

export const getFormDefaultValues = (state: StoreState) =>
  state.timeTableReducer.formDefaultValues;

export const getFormMode = (state: StoreState) => state.timeTableReducer.mode;
