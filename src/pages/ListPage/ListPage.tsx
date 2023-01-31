import PageHeader from "./components/PageHeader";
import TimeTable from "./components/TimeTable";
import TimeTableEntryFormModal from "./components/TimeTableEntryFormModal/TimeTableEntryFormModal";

export default function ListPage() {
  return (
    <div className="flex flex-col gap-8 items-start">
      <PageHeader /> <TimeTable />
      <TimeTableEntryFormModal />
    </div>
  );
}
