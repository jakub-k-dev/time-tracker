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
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
            <NewEntryTile />
          </div>
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
            <CurrentTimerTile />
          </div>
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
            <StatisticsTile />
          </div>
        </div>
      </PageContent>
    </>
  );
}
