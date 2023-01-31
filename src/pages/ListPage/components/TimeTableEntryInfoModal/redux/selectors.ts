import { StoreState } from "src/reducer";

export const getIsModalOpen = (state: StoreState) =>
  state.timeTableEntryInfo.isModalOpen;

export const getTimeTableEntry = (state: StoreState) =>
  state.timeTableEntryInfo.timeTableEntry;
