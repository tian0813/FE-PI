import { useEffect } from "react";
// import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { InputField } from "../ui/InputField";
import { editNoteSchema, EditNoteFormType } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import Show from "../show";
import { useNote } from "../../services/note/queries/use-note";
import { useEditNote } from "../../services/note/mutations/use-edit-note";
import { Note } from "../../services/note/types";

const EditNoteFom = ({ id }: { id: string }) => {
  const { mutate, isPending, isError, error } = useEditNote();

  const navigate = useNavigate();

  const { data, isLoading } = useNote(id);

  const note = data?.data as Note;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<EditNoteFormType>({
    resolver: zodResolver(editNoteSchema),
    values: {
      location: note?.location,
      description: note?.description,
      status: note?.status ? "complete" : "pending",
      photo: note?.photo,
    },
  });

  useEffect(() => {
    if (note) {
      setValue("location", note.location);
      setValue("description", note.description);
      setValue("status", note.status ? "complete" : "pending");
    }
  }, [note, setValue]);

  const onsubmit = (formData: EditNoteFormType) => {
    const data = new FormData();
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("status", formData.status === "complete" ? "true" : "false");
    

    if (formData.photo instanceof FileList && formData.photo.length > 0) {
      data.append("photo", formData.photo[0]);
    }

    mutate(
      {
        id,
        payload: data,
      },
      {
        onSuccess: () => {
          alert("Succesfully update complaint!");
          reset();
          navigate("/");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)} encType="multipart/form-data">
      <h4 className="font-semibold mb-2 text-lg">Edit Complaint</h4>
      <div className="flex flex-col gap-2">
        <InputField
          label="Location"
          disabled={isLoading}
          name="location"
          placeholder="Location"
          register={register}
          errors={errors}
        />
        <InputField
          label="Description"
          disabled={isLoading}
          name="description"
          placeholder="Description"
          register={register}
          textArea={true}
          errors={errors}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div>
              <label className="font-medium text-sm">Status</label>
              <select
                {...field}
                className="block w-full text-sm border border-gray-300 rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
              </select>
            </div>
          )}
        />
        {/* ✅ Preview gambar lama */}
        {note?.photo && (
          <div>
            <p className="text-sm font-medium">Current Photo:</p>
            <img
              src={note.photo}
              alt="Current"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}
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

        <div className="p-2 flex space-x-2 gap-2">
          <Button onClick={() => navigate("/")} type="button">
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            isLoading={isPending || isLoading}
            onProcess="Updating..."
            className="bg-green-200 cursor-pointer"
          >
            Edit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditNoteFom;
