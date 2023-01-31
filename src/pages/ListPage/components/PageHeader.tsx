import { useDispatch } from "react-redux";
import { Button, PageTitle } from "src/components";

import { timeTableModalOpen } from "./TimeTableEntryFormModal/redux/actions";

export default function PageHeader() {
  const dispatch = useDispatch();

  const handleCreateNewEntryButtonClick = () =>
    dispatch(timeTableModalOpen("creating"));

  return (
    <div className="w-full flex justify-between">
      <PageTitle title="Times List" />
      <Button onClick={handleCreateNewEntryButtonClick}>Crete new entry</Button>
    </div>
  );
}
