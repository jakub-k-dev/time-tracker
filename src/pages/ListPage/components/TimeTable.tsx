import { useMutation, useQuery } from "react-query";
import { IconButton, Tile } from "src/components";
import { TimeTableEntry } from "src/types";
import { parseDateRangeToString } from "src/utils/dateUtils";

import { deleteTimeTableEntry, fetchTimeTable } from "../api";

type TableRowData = {
  id: string;
  time: string;
  info: string;
  date?: string;
};

const mapResponseDataToTableData = (
  responseData: TimeTableEntry[]
): TableRowData[] =>
  responseData.map(({ id, time, info, fromDate, toDate }) => ({
    id,
    time: `${time}h`,
    info,
    date: parseDateRangeToString(fromDate, toDate),
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
  const {
    isLoading,
    isError,
    isSuccess,
    data: timeTableResponse,
    refetch: refetchTimeTable,
  } = useQuery("timeTable", fetchTimeTable);

  const { isLoading: isDeleting, mutate: handleTimeTableDeleteEntry } =
    useMutation("timeTableDeleteEntry", deleteTimeTableEntry, {
      onSuccess: () => refetchTimeTable(),
    });

  const handleRowEditButtonClick = (id: string) => {
    console.log("edit:", id);
  };

  const handleRowDeleteButtonClick = (id: string) => {
    handleTimeTableDeleteEntry(id);
  };

  if (isLoading || isDeleting) {
    return "loading";
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
