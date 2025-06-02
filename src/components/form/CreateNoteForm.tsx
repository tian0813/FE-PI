import { useForm } from "react-hook-form";
import { InputField } from "../ui/InputField";
import { noteFormSchema, NoteFormType } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import { useCreateNote } from "../../services/note/mutations/use-create-note";
import Show from "../show";

const CreateNoteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<NoteFormType>({
    resolver: zodResolver(noteFormSchema),
  });

  const { mutate, isPending, isError, error } = useCreateNote();

  const onsubmit = (formData: NoteFormType) => {
    const data = new FormData();
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("photo", formData.photo); // ✅ File sudah benar

    mutate(data, {
      onSuccess: (data) => {
        if (data.success) {
          reset();
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)} encType="multipart/form-data">
      <h4 className="font-semibold mb-2 text-lg">Create Complaint</h4>
      <div className="flex flex-col gap-2">
        <InputField
          label="Location"
          name="location"
          placeholder="Location"
          register={register}
          errors={errors}
        />
        <InputField
          label="Description"
          name="description"
          placeholder="Description"
          register={register}
          errors={errors}
        />

        <label className="text-sm font-medium text-gray-700">Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue("photo", file, { shouldValidate: true });
            }
          }}
        />

        {errors.photo && (
          <span className="text-red-500 text-sm">{errors.photo.message}</span>
        )}

        <Show when={isError}>
          <p className="text-red-500 text-md font-medium">{error?.message}</p>
        </Show>

        <Button
          type="submit"
          disabled={isPending}
          isLoading={isPending}
          onProcess="Creating..."
          className="bg-green-200"
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateNoteForm;
