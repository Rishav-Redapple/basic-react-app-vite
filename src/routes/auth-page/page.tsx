import AuthCheck from "../../auth-check";

export default function AuthPage() {
  return (
    <AuthCheck>
      <h3>You are authenticated</h3>
    </AuthCheck>
  );
}
