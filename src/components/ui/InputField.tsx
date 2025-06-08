import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";
import Show from "../show";

interface InputFieldProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  textArea?: boolean;
  className?: string;
}

type InputPropsType<T extends FieldValues, IsTextArea extends boolean> =
  InputFieldProps<T> &
  (IsTextArea extends true
    ? React.TextareaHTMLAttributes<HTMLTextAreaElement>
    : React.InputHTMLAttributes<HTMLInputElement>);

export const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  className,
  textArea = false,
  ...props
}: InputPropsType<T, boolean>) => {

  const inputClasses = `w-full rounded-lg border-2 border-black p-3 shadow-[3px_3px_0px_black] focus:outline-none ${className || ''}`;

  return (
    <div>
      <Show
        when={!!label}
      >
        <label htmlFor={name} className='font-semibold mb-2'>
          {label}
        </label>
      </Show>

      <Show
        when={!!textArea}
        fallback={
          <input
            {...register(name)}
            name={name}
            id={name}
            className={inputClasses}
            {...props as React.InputHTMLAttributes<HTMLInputElement>}
          />
        }
      >
        <textarea
          {...register(name)}
          name={name}
          id={name}
          className={inputClasses}
          {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
        />
      </Show>

      <Show
        when={!!errors[name]}
      >
        <p className='text-red-500 '>{errors[name]?.message as string}</p>
      </Show>
    </div>
  );
};