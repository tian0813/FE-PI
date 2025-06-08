import { apiResolver } from "../../utils/api";
import axios from "../axios";
import { Response, SignInDTO, SignUpDTO } from "./types";

type token = string;

export function signUp(payload: SignUpDTO) {
  return apiResolver<Response<token>>(() =>
    axios.post("/auth/signup", payload)
  );
}

export function signIn(payload: SignInDTO) {
  return apiResolver<Response<token>>(() =>
    axios.post("/auth/signin", payload)
  );
}

export function authorize() {
  return apiResolver<Response<token>>(() => axios.post("/auth/authorize"));
}
