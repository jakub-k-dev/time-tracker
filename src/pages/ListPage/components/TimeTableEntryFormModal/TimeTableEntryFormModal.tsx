import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, TimeTableEntryForm } from "src/components";
import { TimeTableEntryFormMode } from "src/components/TimeTableEntryForm/TimeTableEntryForm";

import { timeTableFormModalClose } from "./redux/actions";
import {
  getFormDefaultValues,
  getFormMode,
  getIsModalOpen,
} from "./redux/selectors";

const mapModeToModalTitle: Record<TimeTableEntryFormMode, string> = {
  creating: "Creating new entry",
  editing: "Editing existing entry",
};

export default function TimeTableEntryFormModal() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(getIsModalOpen);
  const formMode = useSelector(getFormMode);
  const formDefaultValues = useSelector(getFormDefaultValues);

  const handleCloseModal = () => dispatch(timeTableFormModalClose());

  return (
    <Modal
      isOpen={isModalOpen}
      title={formMode && mapModeToModalTitle[formMode]}
      onRequestClose={handleCloseModal}
    >
      <TimeTableEntryForm
        mode={formMode}
        defaultValues={formDefaultValues}
        onFormSubmitSuccess={handleCloseModal}
        additionalFooterContent={
          <Button onClick={handleCloseModal} variant="secondary" type="button">
            Cancel
          </Button>
        }
      />
    </Modal>
  );
}
