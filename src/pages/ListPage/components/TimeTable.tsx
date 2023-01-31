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
  date?: string;
};

const mapResponseDataToTableData = (
  responseData: TimeTableEntry[]
): TableRowData[] =>
  responseData.map(({ id, time, info, date }) => ({
    id,
    time: `${time}h`,
    info,
    date: new Date(date).toLocaleDateString(),
  }));

const TableHeader = () => (
  <thead>
    <tr>
      <th className="p-2 w-20">Time</th>
      <th className="p-2 w-60">Info</th>
      <th className="p-2 w-40">Date</th>
      <th className="p-2 w-20">Actions</th>
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
      <tr key={`row-${id}`}>
        <td className="p-2 border-t-2 border-t-black text-center">{time}</td>
        <td className="p-4 border-t-2 border-t-black text-center">
          <p className="max-h-14 overflow-hidden">{info}</p>
        </td>
        <td className="p-2 border-t-2 border-t-black text-center">{date}</td>
        <td className="p-2 border-t-2 border-t-black">
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

  return (
    <Tile title="Time table">
      <table>
        <TableHeader />
        <TableBody
          data={parsedData}
          onRowDeleteButtonClick={handleRowDeleteButtonClick}
          onRowEditButtonClick={handleRowEditButtonClick}
          onInfoButtonClick={handleInfoButtonClick}
        />
      </table>
    </Tile>
  );
}
