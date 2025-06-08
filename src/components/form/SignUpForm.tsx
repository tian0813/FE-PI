import Show from "../show";
import { InputField } from "../ui/InputField";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { signUpFormSchema, SignUpFormType } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignUp from "../../services/auth/mutations/use-signup";
import { Link, useNavigate } from "react-router-dom";
import { LS_TOKEN, ROUTES } from "../../utils/constants";

const SignUpForm = () => {

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  })

  const {
    mutate, error, isPending, isError
  } = useSignUp()

  const navigate = useNavigate();

  const onSubmit = (formData: SignUpFormType) => {

    mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          navigate("/");
          localStorage.setItem(LS_TOKEN, data.data!);
        }
      }
    })

  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label='Name'
        name='name'
        placeholder='Name'
        type='text'
        errors={errors}
        register={register}
      />
      <InputField
        label='Email'
        name='email'
        placeholder='Email'
        type='email'
        errors={errors}
        register={register}
      />

      <InputField
        label='Password'
        name='password'
        placeholder='Password'
        type='password'
        errors={errors}
        register={register}
      />

      <Show when={isError}>
        <p className="text-red-500 text-md font-medium">
          {error?.message}
        </p>
      </Show>

      <p>Have an account?{" "}
        <Link className="text-blue-500 underline hover:text-blue-600 font-bold" to={ROUTES.LOGIN}>Sign In</Link></p>
      <Button
        type="submit"
        disabled={isPending}
        onProcess="Signing up..."
        isLoading={isPending}
        className="bg-green-200"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
