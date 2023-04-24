import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm, useFormState } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Button, Loader } from "src/components";
import { TimeTableEntry, TimeTableEntryWithoutId } from "src/types";
import { z } from "zod";

import { createTimeTableEntry, editTimeTableEntry } from "./api";
import TimeTableEntryFormFields from "./TimeTableEntryFormFields";

export type TimeTableEntryFormMode = "creating" | "editing";

type Props = {
  mode?: TimeTableEntryFormMode;
  defaultValues?: TimeTableEntry;
  onFormSubmitSuccess?: () => void;
  additionalFooterContent?: ReactNode;
};

export type FormValues = {
  time: string;
  info: string;
  date: Date | "";
};

const FORM_ID = "timeTableEntryForm";

const schema = z.object({
  time: z.coerce
    .number()
    .positive({ message: "Time is required" })
    .finite()
    .max(24),
  info: z.string().min(1, {
    message: "Info is required",
  }),
  date: z.date().or(z.string().max(0)),
});

const emptyFormValues: FormValues = {
  time: "",
  info: "",
  date: "",
};

const mapDefaultValuesToFormValues = ({
  date,
  info,
  time,
}: TimeTableEntry): FormValues => ({
  date: new Date(date),
  time: time.toString(),
  info,
});

const mapFormValuesToTimeTableEntry = ({
  date,
  info,
  time,
}: FormValues): TimeTableEntryWithoutId => ({
  date: date.toString(),
  time: parseInt(time),
  info,
});

export default function TimeTableEntryForm({
  mode = "creating",
  defaultValues,
  onFormSubmitSuccess,
  additionalFooterContent,
}: Props) {
  const queryClient = useQueryClient();
  const handleFormSubmitSuccess = () => {
    reset(emptyFormValues);
    queryClient.invalidateQueries({ queryKey: "fetchTimeTable" });
    onFormSubmitSuccess?.();
  };

  const { mutate: handleCreateTimeTableEntry, isLoading: isCreating } =
    useMutation("createTimeTableEntry", createTimeTableEntry, {
      onSuccess: handleFormSubmitSuccess,
    });
  const { mutate: handleEditTimeTableEntry, isLoading: isEditing } =
    useMutation("editTimeTableEntry", editTimeTableEntry, {
      onSuccess: handleFormSubmitSuccess,
    });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
      ? mapDefaultValuesToFormValues(defaultValues)
      : emptyFormValues,
    mode: "all",
  });
  const { isDirty } = useFormState({ control });

  const handleFormSubmit = (data: FormValues) => {
    const parsedData = mapFormValuesToTimeTableEntry(data);
    switch (mode) {
      case "creating": {
        handleCreateTimeTableEntry(parsedData);
        break;
      }
      case "editing": {
        defaultValues?.id &&
          handleEditTimeTableEntry({ id: defaultValues.id, data: parsedData });
        break;
      }
    }
  };

  const hasErrors = Object.keys(errors).length !== 0;

  const isSubmitDisabled = !isDirty || hasErrors;

  if (isCreating || isEditing) {
    return <Loader />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        id={FORM_ID}
        className="flex flex-col gap-8"
      >
        <TimeTableEntryFormFields
          register={register}
          errors={errors}
          control={control}
        />
        <div className="self-end flex gap-4">
          {additionalFooterContent}
          <Button form={FORM_ID} disabled={isSubmitDisabled}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
