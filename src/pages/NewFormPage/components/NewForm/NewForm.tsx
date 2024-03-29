import { zodResolver } from "@hookform/resolvers/zod";
import {
  Control,
  FieldValues,
  useFieldArray,
  useForm,
  useFormState,
} from "react-hook-form";
import {
  Button,
  DateAndTimeInput,
  DateInput,
  DateRangeInput,
  Input,
  TextAreaInput,
  TimeInput,
} from "src/components";
import { Optional } from "src/types";
import { z, ZodTypeAny } from "zod";

type Props = {};

const FORM_ID = "newFormId";

export type FormValues = {
  name: string;
  description: string;
  numberOfAttempts?: number;
  limit?: number;
  array: {
    name: string;
    number?: number;
  }[];
  dateInput: Optional<Date>;
  timeInput: Optional<Date>;
  dateAndTimeInput: Optional<Date>;
  dateRangeInput: [Optional<Date>, Optional<Date>];
};

const schema = z.object<{ [T in keyof FormValues]: ZodTypeAny }>({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string(),
  numberOfAttempts: z.number(),
  limit: z.number().gte(2).lte(20),
  array: z
    .array(
      z.object({
        name: z.string().min(0),
        number: z.number().int(),
      })
    )
    .nonempty(),
  dateInput: z.date({ required_error: "Required" }),
  timeInput: z.date({ required_error: "Required" }),
  dateAndTimeInput: z.date({ required_error: "Required" }),
  dateRangeInput: z.array(z.date().nullable()).superRefine((val, ctx) => {
    const result = z
      .tuple([
        z.date({ invalid_type_error: "Required" }),
        z.date({ invalid_type_error: "Select second date" }),
      ])
      .safeParse(val);
    if (!result.success) {
      ctx.addIssue({
        ...result.error.errors[0],
        path: [],
      });
    }
  }),
});

const defaultValues: FormValues = {
  name: "",
  description: "",
  array: [],
  dateInput: null,
  timeInput: null,
  dateAndTimeInput: null,
  dateRangeInput: [null, null],
};

export default function NewForm({}: Props) {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "all",
  });
  const { fields, append, remove } = useFieldArray({ control, name: "array" });

  return (
    <>
      <form
        onSubmit={handleSubmit(() => {})}
        id={FORM_ID}
        className="flex flex-col gap-8"
      >
        <Input control={control} name="name" label="Name" />
        <TextAreaInput
          control={control}
          name="description"
          label="Description"
        />
        <Input
          control={control}
          name="numberOfAttempts"
          label="Number of attempts"
          type="number"
        />
        <Input control={control} name="limit" label="Limit" type="number" />
        <DateInput label="Date input" control={control} name="dateInput" />
        <TimeInput label="Time input" control={control} name="timeInput" />
        <DateRangeInput
          label="Date range input"
          control={control}
          name="dateRangeInput"
        />
        <DateAndTimeInput
          label="Date and time input"
          control={control}
          name="dateAndTimeInput"
        />
        {fields.map((field, index) => (
          <li key={field.id} className="flex gap-4">
            <Input
              control={control}
              name={`array.${index}.name`}
              label="Name"
            />
            <Input
              control={control}
              name={`array.${index}.number`}
              label="Number"
              type="number"
            />
            <Button onClick={() => remove(index)}>Remove</Button>
          </li>
        ))}
        <Button onClick={() => append({ name: "" })}>Add new</Button>
        <FormFooter control={control} />
      </form>
    </>
  );
}

type FormFooterProps<T extends FieldValues> = {
  control: Control<T>;
};

function FormFooter<T extends FieldValues>({ control }: FormFooterProps<T>) {
  const { errors } = useFormState({ control });

  const hasErrors = Object.keys(errors).length !== 0;
  const isSubmitDisabled = hasErrors;

  return (
    <div className="self-end flex gap-4">
      <Button form={FORM_ID} disabled={isSubmitDisabled}>
        Submit
      </Button>
    </div>
  );
}
