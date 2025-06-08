import { X } from "lucide-react";
import Show from "../show";

interface ModalContainerProps {
  isOpen: boolean | null | string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
  isFullScreen?: boolean;
}

const ModalContainer = ({
  isOpen,
  setOpen,
  children,
  className,
  isFullScreen,
}: ModalContainerProps) => {
  const handleCloseModal = () => {
    setOpen(false);
  };


  return (
    <Show when={!!isOpen}>
      <div
        className={`${isFullScreen && "top-0 left-0 fixed h-screen w-full flex items-center justify-center bg-black/50 z-100"}`}
      >
        <div
          className={`p-4 bg-white border-2 rounded-b-xl border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] min-w-sm ${className}`}
        >
          <Show when={!!isFullScreen}>
            <div className='flex justify-end'>
              <X
                size={24}
                className='cursor-pointer'
                onClick={handleCloseModal}
              />
            </div>
          </Show>

          {children}
        </div>
      </div>
    </Show>
  );
}


export default ModalContainer;
