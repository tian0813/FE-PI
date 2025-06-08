import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/form/SignUpForm";
import { useEffect } from "react";
import { LS_TOKEN } from "../utils/constants";

const SignUpPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(LS_TOKEN);
    if (token) {
      navigate("/");
    }
  }, [navigate]);


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-[6px_6px_0px_black] border-4 border-black">
        <h2 className="text-2xl font-bold text-black">Sign Up</h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
