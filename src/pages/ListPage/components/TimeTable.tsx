import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { IconButton, Loader, Tile } from "src/components";
import { TimeTableEntry } from "src/types";

import { deleteTimeTableEntry, fetchTimeTable } from "../api";

import { timeTableModalOpen } from "./TimeTableEntryFormModal/redux/actions";

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
};

const TableBody = ({
  data,
  onRowDeleteButtonClick,
  onRowEditButtonClick,
}: TableContentProps) => (
  <tbody>
    {data.map(({ id, info, time, date }) => (
      <tr key={`row-${id}`}>
        <td className="p-2 border-t-2 border-t-black text-center">{time}</td>
        <td className="p-2 border-t-2 border-t-black text-center">{info}</td>
        <td className="p-2 border-t-2 border-t-black text-center">{date}</td>
        <td className="p-2 border-t-2 border-t-black">
          <TableActionButtons
            onRowDeleteButtonClick={() => onRowDeleteButtonClick(id)}
            onRowEditButtonClick={() => onRowEditButtonClick(id)}
          />
        </td>
      </tr>
    ))}
  </tbody>
);

type TableRowActionButtonsProps = {
  onRowEditButtonClick: () => void;
  onRowDeleteButtonClick: () => void;
};

const TableActionButtons = ({
  onRowDeleteButtonClick,
  onRowEditButtonClick,
}: TableRowActionButtonsProps) => {
  return (
    <div className="flex gap-2">
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
    timeTableEntry && dispatch(timeTableModalOpen("editing", timeTableEntry));
  };

  const handleRowDeleteButtonClick = (id: string) => {
    handleTimeTableDeleteEntry(id);
  };

  if (isLoading || isDeleting) {
    return <Loader />;
  }

  if (isError || !isSuccess) {
    return "error";
  }

  const parsedData = mapResponseDataToTableData(timeTableResponse);

  return (
    <Tile>
      <table>
        <TableHeader />
        <TableBody
          data={parsedData}
          onRowDeleteButtonClick={handleRowDeleteButtonClick}
          onRowEditButtonClick={handleRowEditButtonClick}
        />
      </table>
    </Tile>
  );
}
