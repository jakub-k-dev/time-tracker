import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, TimeTableEntryForm } from "src/components";
import { TimeTableEntryFormMode } from "src/components/TimeTableEntryForm/TimeTableEntryForm";

import { timeTableModalClose } from "./redux/actions";
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

  const handleCloseModal = () => dispatch(timeTableModalClose());

  return (
    <Modal isOpen={isModalOpen}>
      <div className="flex flex-col gap-4">
        {formMode && (
          <h2 className="font-bold">{mapModeToModalTitle[formMode]}</h2>
        )}
        <TimeTableEntryForm
          mode={formMode}
          defaultValues={formDefaultValues}
          onFormSubmitSuccess={handleCloseModal}
          additionalFooterContent={
            <Button onClick={handleCloseModal} variant="secondary">
              Cancel
            </Button>
          }
        />
      </div>
    </Modal>
  );
}
