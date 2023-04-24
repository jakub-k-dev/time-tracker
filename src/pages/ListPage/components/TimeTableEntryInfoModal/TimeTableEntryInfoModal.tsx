import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "src/components";

import { timeTableInfoModalClose } from "./redux/actions";
import { getIsModalOpen, getTimeTableEntry } from "./redux/selectors";

type FieldDetailProps = { title: string; detail: string };

const FieldDetail = ({ title, detail }: FieldDetailProps) => {
  return (
    <>
      <h3 className="font-bold">{title}</h3>
      <p>{detail}</p>
    </>
  );
};

export default function TimeTableEntryInfoModal() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(getIsModalOpen);
  const timeTableEntry = useSelector(getTimeTableEntry);

  const handleCloseModal = () => dispatch(timeTableInfoModalClose());

  return (
    <Modal
      isOpen={isModalOpen}
      title="Entry info"
      onRequestClose={handleCloseModal}
    >
      <div className="flex flex-col gap-4">
        {timeTableEntry && (
          <>
            {timeTableEntry.date && (
              <FieldDetail
                title="Date"
                detail={new Date(timeTableEntry.date).toLocaleDateString()}
              />
            )}
            <FieldDetail title="Time" detail={`${timeTableEntry.time} hours`} />
            <FieldDetail title="Info" detail={timeTableEntry.info} />
          </>
        )}
        <Button onClick={handleCloseModal} variant="secondary" type="button">
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
