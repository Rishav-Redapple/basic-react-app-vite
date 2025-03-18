import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { InitialState } from "./lib/store";
import { useNavigate } from "react-router-dom";

export default function AuthCheck({
  children,
}: {
  readonly children: ReactNode;
}) {
  const goto = useNavigate();
  const { user } = useSelector((state: InitialState) => state.user);

  useEffect(() => {
    if (!user) {
      goto("/login");
      return;
    }
  }, [user, goto]);

  if (!user) return <>No user</>;

  return <>{children}</>;
}
