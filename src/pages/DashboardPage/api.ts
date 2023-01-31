import { api } from "src/api";

import { CurrentEntry } from "./components/CurrentTimerTile";

export type CurrentEntryResponse = Array<CurrentEntry & { id: string }>;

export const getCurrentEntry = () =>
  api
    .get<CurrentEntryResponse>("/newEntry")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

// workaround because of mockapi
export const checkIn = (data: CurrentEntry) =>
  api
    .post("/newEntry", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

// workaround because of mockapi
export const checkOut = (id: string) =>
  api
    .delete(`/newEntry/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
