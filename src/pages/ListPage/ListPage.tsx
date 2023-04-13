import { PageTitle } from "src/components";
import PageContent from "src/components/Layout/PageContent";

import PageHeader from "./components/PageHeader";
import TimeTable from "./components/TimeTable";
import TimeTableEntryFormModal from "./components/TimeTableEntryFormModal/TimeTableEntryFormModal";
import TimeTableEntryInfoModal from "./components/TimeTableEntryInfoModal/TimeTableEntryInfoModal";

export default function ListPage() {
  return (
    <>
      <PageTitle>Times List</PageTitle>
      <PageContent>
        <div className="flex flex-col gap-8">
          <PageHeader />
          <TimeTable />
        </div>
      </PageContent>
      <TimeTableEntryFormModal />
      <TimeTableEntryInfoModal />
    </>
  );
}
