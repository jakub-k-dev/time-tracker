import { PageTitle } from "src/components";
import PageContent from "src/components/Layout/PageContent";

import CurrentTimerTile from "./components/CurrentTimerTile";
import NewEntryTile from "./components/NewEntryTile";
import StatisticsTile from "./components/StatisticsTile";

export default function DashboardPage() {
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <PageContent>
        <div className="grid grid-cols-2 gap-8">
          <NewEntryTile />
          <CurrentTimerTile />
          <StatisticsTile />
        </div>
      </PageContent>
    </>
  );
}
