import { useLayoutEffect, useState } from "react";
import ModalContainer from "./ui/ModalContainer";
import DetailNote from "./DetailNote";
import { useSearchParams } from "react-router-dom";
// import { useDeleteNote } from "../services/note/mutations/use-delete-note";

interface CardNoteProps {
  id: string;
  location: string;
  description: string;
  status: boolean;
  photo: string;
  date: string;
}

const CardNote = ({
  id,
  location,
  description,
  status,
  photo,
  date,
}: CardNoteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("edit");

  useLayoutEffect(() => {
    if (isEdit) {
      setIsOpen(false);
    }
  }, [isEdit]);

  // return <div>Card Note</div>;
  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border border-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white transition-all hover:shadow-[6px]"
      >
        <DetailNote
          id={id}
          isOpen={isOpen}
          location={location}
          description={description}
          status={status}
          photo={photo}
          date={date}
        />
      </div>

      <ModalContainer
        isOpen={isOpen}
        setOpen={setIsOpen}
        isFullScreen={true}
        className="max-w-2xl"
      >
        <DetailNote
          id={id}
          isOpen={isOpen}
          location={location}
          description={description}
          status={status}
          photo={photo}
          date={date}
        />
      </ModalContainer>
    </>
  );
};

export default CardNote;
