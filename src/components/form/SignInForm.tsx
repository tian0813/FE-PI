import { useForm } from "react-hook-form";
import { signInFormSchema, SignInFormType } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignIn from "../../services/auth/mutations/use-signin";
import { Link, useNavigate } from "react-router-dom";
import { LS_TOKEN, ROUTES } from "../../utils/constants";
import { InputField } from "../ui/InputField";
import Show from "../show";
import Button from "../ui/Button";

const SignInForm = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
  })

  const {
    mutate, error, isPending, isError
  } = useSignIn();

  const onSubmit = (formData: SignInFormType) => {
    mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          navigate("/");
          localStorage.setItem(LS_TOKEN, data.data!);
        }
      },
    })
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      
      <p>Don&apos;t have an account?{" "}
        <Link className="text-blue-500 underline hover:text-blue-600 font-bold" to={ROUTES.REGISTER}>Sign Up</Link></p>
      <Button
        type="submit"
        disabled={isPending}
        onProcess="Signing in..."
        isLoading={isPending}
        className="bg-green-200"
      >
        Sign In
      </Button>
    </form>
  )
}

export default SignInForm