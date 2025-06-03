import { Controller, useForm } from "react-hook-form";
import { InputField } from "../ui/InputField";
import { createNoteSchema, CreateFormType } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import { useCreateNote } from "../../services/note/mutations/use-create-note";
import Show from "../show";

const CreateNoteForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateFormType>({
    resolver: zodResolver(createNoteSchema),
  });

  const { mutate, isPending, isError, error } = useCreateNote();

  const onsubmit = (formData: CreateFormType) => {
    const data = new FormData();
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("photo", formData.photo[0]);

    mutate(data, {
      onSuccess: (data) => {
        if (data.success) {
          alert("Succesfully create complaint!");
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
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <div>
              <label className="font-medium text-sm">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files)}
                className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md"
              />
            </div>
          )}
        />

        {errors.photo?.message && (
          <span className="text-red-500 text-sm">
            {errors.photo.message.toString()}
          </span>
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
