import { useDispatch, useSelector } from "react-redux";
import { Dispatch, InitialState } from "./store";

export const useUserDispatch = useDispatch.withTypes<Dispatch>();
export function useUser() {
  const { user } = useSelector((state: InitialState) => state.user);
  return user;
}
