import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { useMutation } from "react-query";
import { Button, Loader } from "src/components";
import { TimeTableEntry, TimeTableEntryWithoutId } from "src/types";
import { z } from "zod";

import { createTimeTableEntry, editTimeTableEntry } from "./api";
import TimeTableEntryFormFields from "./TimeTableEntryFormFields";

type FormMode = "creating" | "editing";

type Props = {
  mode: FormMode;
  defaultValues?: TimeTableEntry;
};

export type FormValues = {
  time: string;
  info: string;
  date: string;
};

const FORM_ID = "timeTableEntryForm";

const schema = z.object({
  time: z.coerce.number().positive().int().finite(),
  info: z.string().min(1, {
    message: "Info is required",
  }),
  date: z.coerce.date().or(z.string().max(0)),
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
  date,
  time: time.toString(),
  info,
});

const mapFormValuesToTimeTableEnrty = ({
  date,
  info,
  time,
}: FormValues): TimeTableEntryWithoutId => ({
  date,
  time: parseInt(time),
  info,
});

export default function TimeTableEntryForm({ mode, defaultValues }: Props) {
  const handleFormSubmitSuccess = () => {
    reset(emptyFormValues);
  };

  const { mutate: handleCreateTimeTableEnrty, isLoading: isCreating } =
    useMutation("createTimeTableEntry", createTimeTableEntry, {
      onSuccess: handleFormSubmitSuccess,
    });
  const { mutate: handleEditTimeTableEnrty, isLoading: isEditing } =
    useMutation("editTimeTableEntry", editTimeTableEntry, {
      onSuccess: handleFormSubmitSuccess,
    });

  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
      ? mapDefaultValuesToFormValues(defaultValues)
      : emptyFormValues,
    mode: "onChange",
  });
  const { isDirty } = useFormState({ control });

  const handleFormSubmit = (data: FormValues) => {
    const parsedData = mapFormValuesToTimeTableEnrty(data);
    switch (mode) {
      case "creating": {
        handleCreateTimeTableEnrty(parsedData);
        break;
      }
      case "editing": {
        defaultValues?.id &&
          handleEditTimeTableEnrty({ id: defaultValues.id, data: parsedData });
        break;
      }
    }
  };

  const hasErrors = Object.keys(errors).length !== 0;

  const isSubmitDisabled = !isDirty || hasErrors;

  if (isCreating || isEditing) {
    return <Loader />;
  }

  console.log(errors, getValues());
  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        id={FORM_ID}
        className="flex flex-col gap-8"
      >
        <TimeTableEntryFormFields register={register} errors={errors} />
        <div className="self-end">
          <Button form={FORM_ID} disabled={isSubmitDisabled}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
