import Header from "./Header";
import { useNote } from "../services/note/queries/use-note";
import { Note } from "../services/note/types";
import Show from "./show";
import CardNote from "./CardNote";

const Notes = () => {
  const { data, isLoading } = useNote();
  console.log(data);

  const notes = data?.data as Note[];

  return (
    <div>
      <Header />
      <Show
        when={!isLoading}
        fallback={<p className="text-center font-bold">Loading...</p>}
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 my-4">
          {notes?.map((item: Note, index: number) => (
            <div key={index} className="mb-3 max-h-fit">
              <CardNote
                id={item.id}
                location={item.location}
                description={item.description}
                status={item.status}
                photo={item.photo}
                date={item.createdAt}
              />
            </div>
          ))}
        </ul>
      </Show>
    </div>
  );
};

export default Notes;
