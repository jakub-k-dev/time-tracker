import { PageTitle } from "src/components";

import CurrentTimerTile from "./components/CurrentTimerTile";
import NewEntryTile from "./components/NewEntryTile";
import StatisticsTile from "./components/StatisticsTile";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle>Dashboard</PageTitle>
      <div className="grid grid-cols-2 gap-8">
        <NewEntryTile />
        <CurrentTimerTile />
        <StatisticsTile />
      </div>
    </div>
  );
}
