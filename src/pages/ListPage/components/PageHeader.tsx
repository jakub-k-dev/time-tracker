import { useDispatch } from "react-redux";
import { Button, PageTitle } from "src/components";

import { timeTableFormModalOpen } from "./TimeTableEntryFormModal/redux/actions";

export default function PageHeader() {
  const dispatch = useDispatch();

  const handleCreateNewEntryButtonClick = () =>
    dispatch(timeTableFormModalOpen("creating"));

  return (
    <div className="w-full flex justify-between">
      <PageTitle>Times List</PageTitle>
      <Button onClick={handleCreateNewEntryButtonClick} type="button">
        Crete new entry
      </Button>
    </div>
  );
}
