import { Link } from "react-router-dom";
import AuthCheck from "../auth-check";
import { useUser } from "../lib/hooks";

export default function Home() {
  const user = useUser();

  return (
    <AuthCheck>
      <h3>Hello, {user?.name}</h3>
      <Link to="/profile">Go to your profile</Link>
    </AuthCheck>
  );
}
