import { Link } from "react-router-dom";
import { useUser } from "./lib/hooks";

export default function Nav() {
  const user = useUser();

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <strong>Home</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            {user ? (
              <Link to="/profile">Profile</Link>
            ) : (
              <Link to="/login" role="button">
                Login
              </Link>
            )}
          </li>
          <li>
            <Link to="/auth-page">Auth page</Link>
          </li>
          <li>
            <Link to="/not-auth-page">NOT Auth page</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
