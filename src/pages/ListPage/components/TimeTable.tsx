import { IconButton, Tile } from "src/components";

type TableRowData = {
  id: number;
  time: string;
  info: string;
  date?: string;
};

const mockData: TableRowData[] = [
  {
    id: 1,
    time: "2h",
    info: "nič som nerobil",
    date: "11.11.2011 - 12.12.2012",
  },
  { id: 3, time: "2h", info: "spravil som všetko", date: "21.12.2012" },
  { id: 4, time: "2h", info: "zase nič", date: "2.5.2000" },
  { id: 2, time: "2h", info: "bez komentára" },
];

const TableHeader = () => (
  <tr>
    <th className="p-2 w-20">Time</th>
    <th className="p-2 w-60">Info</th>
    <th className="p-2 w-40">Date</th>
    <th className="p-2 w-20">Actions</th>
  </tr>
);

type TableContentProps = {
  data: TableRowData[];
  onRowEditButtonClick: (id: number) => void;
  onRowDeleteButtonClick: (id: number) => void;
};

const TableContent = ({
  data,
  onRowDeleteButtonClick,
  onRowEditButtonClick,
}: TableContentProps) => (
  <>
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
  </>
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
  const handleRowEditButtonClick = (id: number) => {
    console.log("edit:", id);
  };
  const handleRowDeleteButtonClick = (id: number) => {
    console.log("delete:", id);
  };

  return (
    <Tile>
      <table>
        <TableHeader />
        <TableContent
          data={mockData}
          onRowDeleteButtonClick={handleRowDeleteButtonClick}
          onRowEditButtonClick={handleRowEditButtonClick}
        />
      </table>
    </Tile>
  );
}
