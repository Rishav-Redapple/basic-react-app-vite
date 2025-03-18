import { FormEvent, useState } from "react";
import { setUser } from "../../lib/userSlice";
import { User } from "../../lib/types/user";
import { useUserDispatch } from "../../lib/hooks";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File>();

  const dispatch = useUserDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const user: User = {
      name,
      email,
      username,
      password,
      image: image && URL.createObjectURL(image),
      token: crypto.randomUUID(),
      id: `${username}-${email}`,
    };

    dispatch(setUser(user));
    (e.currentTarget as HTMLFormElement).reset();
    navigate("/");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Profile image
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
            {image && (
              <>
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  style={{ maxWidth: "5rem", display: "block" }}
                />
                <button onClick={() => setImage(undefined)}>Remove</button>
              </>
            )}
          </label>
          <label>
            Name
            <input
              name="name"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Username
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <small>
              {username && username.trim().length < 4 && (
                <div>Must be at least 4 characters</div>
              )}
              {username && !/^[a-z0-9_]+$/i.test(username) && (
                <div>Only use a-z and 0-9</div>
              )}
            </small>
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small>
              {password && password.trim().length < 6 && (
                <div>Must be at least 6 characters</div>
              )}
              {password && !/[!@#$%&]/.test(password) && (
                <div>Must include a special character</div>
              )}
            </small>
          </label>
        </fieldset>

        <input type="submit" value="Login" />
      </form>
    </>
  );
}
