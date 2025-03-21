import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./lib/hooks";

export default function AuthCheck({
  children,
}: {
  readonly children: ReactNode;
}) {
  const goto = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      goto("/login");
      return;
    }
  }, [user, goto]);

  if (!user) return <></>;

  return <>{children}</>;
}
