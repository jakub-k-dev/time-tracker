import PageHeader from "./components/PageHeader";
import TimeTable from "./components/TimeTable";
import TimeTableEntryFormModal from "./components/TimeTableEntryFormModal/TimeTableEntryFormModal";
import TimeTableEntryInfoModal from "./components/TimeTableEntryInfoModal/TimeTableEntryInfoModal";

export default function ListPage() {
  return (
    <div className="flex flex-col gap-8 items-start">
      <PageHeader />
      <TimeTable />
      <TimeTableEntryFormModal />
      <TimeTableEntryInfoModal />
    </div>
  );
}
