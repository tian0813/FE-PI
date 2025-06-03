import { useNavigate } from "react-router-dom";
import formatDate from "../utils/format-date";
import Button from "./ui/Button";
import Show from "./show";
import { useDeleteNote } from "../services/note/mutations/use-delete-note";
// import { useEditNote } from "../services/note/mutations/use-edit-note";

interface DetailNoteProps {
  id: string;
  location: string;
  description: string;
  status: boolean;
  photo: string;
  date: string;
  isOpen: boolean;
}

const DetailNote = ({
  id,
  location,
  description,
  status,
  photo,
  date,
  isOpen,
}: DetailNoteProps) => {
  const { mutate, isPending } = useDeleteNote();
  const navigate = useNavigate();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        alert(`Complaint ${id} is success deleted`);
      },
    });
  };

  const handleEdit = () => {
    navigate(`?edit=${id}`);
  };

  return (
    <>
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex flex-col">
        <h4 className={`text-lg font-semibold ${!isOpen && "line-clamp-1"}`}>
          {location}
        </h4>
        <p className="text-xs text-gray-500">{formatDate(date)}</p>
      </div>

      <hr className="border-2 border-gray-200" />

      {/* Description */}
      <div className="px-4 py-2 min-h-24 text-sm">
        <p className={`text-gray-700 ${!isOpen && "line-clamp-3"}`}>
          {description}
        </p>
      </div>

      <hr className="border-2 border-gray-200" />

      {/* Status */}
      <div className="flex items-center">
        <span
          className={`ml-2 inline-block px-3 py-1 text-sm font-semibold rounded-full 
      ${
        status ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
      }`}
        >
          {status ? "Complete" : "Pending"}
        </span>
      </div>

      <hr className="border-2 border-gray-200" />

      {/* Photo */}
      <div className="px-4 py-2 min-h-24 text-sm">
        <img
          src={photo}
          alt="Note Photo"
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      <Show when={isOpen}>
        <hr className="border border-gray-200" />
        <div className="p-2 flex justify-end space-x-2 gap-2">
          <Button
            onClick={handleEdit}
          >
            Edit
          </Button>
          
          <Button 
            isLoading={isPending}
            disabled={isPending}
            onProcess="Process..."
            onClick={handleDelete}
            className="text-white bg-red-500"
          >
            Delete
          </Button>
        </div>
      </Show>
    </>
  );
};

export default DetailNote;
