export type TimeTableEntry = {
  id: string;
  info: string;
  date: string;
  time: number;
};

export type TimeTableEntryWithoutId = Omit<TimeTableEntry, "id">;
