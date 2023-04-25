import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Control, FieldValues, useForm, useFormState } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Loader, TextInput, Tile } from "src/components";
import { createTimeTableEntry } from "src/components/TimeTableEntryForm/api";
import * as z from "zod";

import {
  checkIn,
  checkOut,
  CurrentEntryResponse,
  getCurrentEntry,
} from "../api";

export type CurrentEntry = {
  startDate: string;
  info: string;
};

type FormValues = {
  info: string;
};

const FORM_ID = "checkInOrOutForm";

const schema = z.object({
  info: z.string().min(1, {
    message: "Info is required",
  }),
});

const emptyFormValues: FormValues = {
  info: "",
};

export default function CurrentTimerTile() {
  const [currentCheckInTime, setCurrentCheckInTime] = useState<Date>();

  const queryClient = useQueryClient();
  const handleCheckInOrOutSuccess = () => {
    setCurrentCheckInTime(undefined);
    queryClient.invalidateQueries({ queryKey: "getCurrentEntry" });
  };

  const handleLoadCurrentEntry = (data: CurrentEntryResponse) => {
    const currentEntry = data[0];
    reset(currentEntry || emptyFormValues);
  };

  const { isLoading, data, isError, isSuccess } = useQuery(
    "getCurrentEntry",
    getCurrentEntry,
    { onSuccess: handleLoadCurrentEntry }
  );

  const { mutate: handleCheckIn, isLoading: isCheckingIn } = useMutation(
    "checkIn",
    checkIn,
    {
      onSuccess: handleCheckInOrOutSuccess,
    }
  );

  const { mutate: handleCheckOut, isLoading: isCheckingOut } = useMutation(
    "checkOut",
    checkOut,
    {
      onSuccess: handleCheckInOrOutSuccess,
    }
  );

  const { mutate: handleAddEntryToTimeTable } = useMutation(
    "createTimeTableEntry",
    createTimeTableEntry
  );

  const currentTimer = data?.[0];
  const isCheckedIn = currentTimer !== undefined;

  useEffect(() => {
    if (!currentTimer) return;

    const intervalId = setInterval(() => {
      const subtractedTime = new Date(
        new Date().getTime() - new Date(currentTimer.startDate).getTime()
      );
      setCurrentCheckInTime(subtractedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentTimer]);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: emptyFormValues,
    mode: "all",
  });

  if (isError || !isSuccess) {
    return <>error</>;
  }

  const handleCheckInOrOut = ({ info }: FormValues) => {
    if (isCheckedIn) {
      const time =
        (currentCheckInTime &&
          parseFloat(
            (currentCheckInTime.getTime() / 1000 / 60 / 60).toFixed(2)
          )) ||
        0.01;
      handleCheckOut(currentTimer?.id);
      handleAddEntryToTimeTable({ info, time, date: currentTimer.startDate });
      return;
    }
    handleCheckIn({ info, startDate: new Date().toISOString() });
  };

  const parsedTime =
    currentCheckInTime &&
    `${currentCheckInTime.getUTCHours()}:${currentCheckInTime.getUTCMinutes()}:${currentCheckInTime.getUTCSeconds()}`;

  return (
    <Tile title="Automatic entry" header={parsedTime || "00:00:00"}>
      {isLoading || isCheckingIn || isCheckingOut ? (
        <Loader />
      ) : (
        <div className="flex justify-between items-center">
          <form onSubmit={handleSubmit(handleCheckInOrOut)} id={FORM_ID}>
            <TextInput
              label="Info"
              name="info"
              placeholder="Info"
              control={control}
            />
          </form>
          <FormFooter control={control} isCheckedIn />
        </div>
      )}
    </Tile>
  );
}

type FormFooterProps<T extends FieldValues> = {
  control: Control<T>;
  isCheckedIn: boolean;
};

function FormFooter<T extends FieldValues>({
  control,
  isCheckedIn,
}: FormFooterProps<T>) {
  const { errors } = useFormState({ control });

  const hasErrors = Object.keys(errors).length !== 0;
  const isSubmitDisabled = hasErrors;

  return (
    <Button form={FORM_ID} disabled={isSubmitDisabled}>
      {isCheckedIn ? "Check out" : "Check in"}
    </Button>
  );
}
