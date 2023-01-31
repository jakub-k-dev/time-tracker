import { api } from "src/api";
import { TimeTableEntryWithoutId } from "src/types";

export const createTimeTableEntry = (data: TimeTableEntryWithoutId) =>
  api
    .post("/timetable", data)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });

export const editTimeTableEntry = ({
  id,
  data,
}: {
  id: string;
  data: TimeTableEntryWithoutId;
}) =>
  api
    .put(`/timetable/${id}`, data)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
