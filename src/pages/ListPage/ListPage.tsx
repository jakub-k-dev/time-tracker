import { PageTitle } from "src/components";

import TimeTable from "./components/TimeTable";

export default function ListPage() {
  return (
    <div className="flex flex-col gap-8 items-start">
      <PageTitle title="Times List" />
      <TimeTable />
    </div>
  );
}
