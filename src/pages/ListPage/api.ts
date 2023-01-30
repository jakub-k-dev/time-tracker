import { api } from "src/api";
import { TimeTableEntry } from "src/types";

type TimeTableResponse = TimeTableEntry[];

export const fetchTimeTable = () =>
  api
    .get<TimeTableResponse>("/timetable")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const deleteTimeTableEntry = (id: string) =>
  api
    .delete<TimeTableResponse>(`/timetable/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
