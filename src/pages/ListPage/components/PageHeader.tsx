import { useDispatch } from "react-redux";
import { Button } from "src/components";

import { timeTableFormModalOpen } from "./TimeTableEntryFormModal/redux/actions";

export default function PageHeader() {
  const dispatch = useDispatch();

  const handleCreateNewEntryButtonClick = () =>
    dispatch(timeTableFormModalOpen("creating"));

  return (
    <Button onClick={handleCreateNewEntryButtonClick} type="button">
      Crete new entry
    </Button>
  );
}
