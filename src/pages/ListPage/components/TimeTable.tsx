import { ClockIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { IconButton, Loader, Tile } from "src/components";
import { TimeTableEntry } from "src/types";

import { deleteTimeTableEntry, fetchTimeTable } from "../api";

import { timeTableFormModalOpen } from "./TimeTableEntryFormModal/redux/actions";
import { timeTableInfoModalOpen } from "./TimeTableEntryInfoModal/redux/actions";

type TableRowData = {
  id: string;
  time: string;
  info: string;
  date: string;
};

const mapResponseDataToTableData = (
  responseData: TimeTableEntry[]
): TableRowData[] =>
  responseData.map(({ id, time, info, date }) => ({
    id,
    time: `${time}h`,
    info,
    date,
  }));

const TableHeader = () => (
  <thead>
    <tr>
      <th className="p-2 text-left">Date</th>
      <th className="p-2 text-left">Time</th>
      <th className="p-2 text-left">Info</th>
      <th className="p-2 text-left">Actions</th>
    </tr>
  </thead>
);

type TableContentProps = {
  data: TableRowData[];
  onRowEditButtonClick: (id: string) => void;
  onRowDeleteButtonClick: (id: string) => void;
  onInfoButtonClick: (id: string) => void;
};

const TableBody = ({
  data,
  onRowDeleteButtonClick,
  onRowEditButtonClick,
  onInfoButtonClick,
}: TableContentProps) => (
  <tbody>
    {data.map(({ id, info, time, date }) => (
      <tr key={`row-${id}`} className="border-t-2 border-t-black">
        <td className="p-2">
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 p-1 bg-gray-200 rounded-md shadow border-t-4 border-t-red-600 font-bold text-center">
              {new Date(date).getDate()}.
            </div>
            <div>
              <p className="text-sm font-semibold">
                {new Date(date).toLocaleDateString(undefined, {
                  weekday: "long",
                })}
              </p>
              <p className="text-xs">{new Date(date).toLocaleDateString()}</p>
            </div>
          </div>
        </td>
        <td className="p-2 text-center">
          <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-0.5 text-sm font-medium w-20 justify-between">
            <ClockIcon className="h-4" />
            {time}
          </span>
        </td>
        <td className="p-4 max-w-xl">
          <p className=" text-sm line-clamp-2">{info}</p>
        </td>
        <td className="p-2">
          <TableActionButtons
            onRowDeleteButtonClick={() => onRowDeleteButtonClick(id)}
            onRowEditButtonClick={() => onRowEditButtonClick(id)}
            onInfoButtonClick={() => onInfoButtonClick(id)}
          />
        </td>
      </tr>
    ))}
  </tbody>
);

type TableRowActionButtonsProps = {
  onRowEditButtonClick: () => void;
  onRowDeleteButtonClick: () => void;
  onInfoButtonClick: () => void;
};

const TableActionButtons = ({
  onRowDeleteButtonClick,
  onRowEditButtonClick,
  onInfoButtonClick,
}: TableRowActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <IconButton
        icon="info"
        type="button"
        aria-label="Info"
        onClick={onInfoButtonClick}
      />
      <IconButton
        icon="pencil"
        type="button"
        aria-label="Edit"
        onClick={onRowEditButtonClick}
      />
      <IconButton
        icon="trash"
        type="button"
        aria-label="Delete"
        onClick={onRowDeleteButtonClick}
      />
    </div>
  );
};

export default function TimeTable() {
  const dispatch = useDispatch();
  const {
    isLoading,
    isError,
    isSuccess,
    data: timeTableResponse,
    refetch: refetchTimeTable,
  } = useQuery("fetchTimeTable", fetchTimeTable);

  const { isLoading: isDeleting, mutate: handleTimeTableDeleteEntry } =
    useMutation("deleteTimeTableEntry", deleteTimeTableEntry, {
      onSuccess: () => refetchTimeTable(),
    });

  const handleRowEditButtonClick = (id: string) => {
    const timeTableEntry = timeTableResponse?.find(
      ({ id: entryId }) => entryId === id
    );
    timeTableEntry &&
      dispatch(timeTableFormModalOpen("editing", timeTableEntry));
  };

  const handleRowDeleteButtonClick = (id: string) => {
    handleTimeTableDeleteEntry(id);
  };

  const handleInfoButtonClick = (id: string) => {
    const timeTableEntry = timeTableResponse?.find(
      ({ id: entryId }) => entryId === id
    );
    timeTableEntry && dispatch(timeTableInfoModalOpen(timeTableEntry));
  };

  if (isLoading || isDeleting) {
    return <Loader />;
  }

  if (isError || !isSuccess) {
    return <>error</>;
  }

  const parsedData = mapResponseDataToTableData(timeTableResponse);
  const sortedData = parsedData.sort(({ date: date1 }, { date: date2 }) =>
    new Date(date1) > new Date(date2) ? 1 : -1
  );

  return (
    <Tile title="Time table">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <TableHeader />
          <TableBody
            data={sortedData}
            onRowDeleteButtonClick={handleRowDeleteButtonClick}
            onRowEditButtonClick={handleRowEditButtonClick}
            onInfoButtonClick={handleInfoButtonClick}
          />
        </table>
      </div>
    </Tile>
  );
}
