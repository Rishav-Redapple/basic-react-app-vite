import { useNavigate } from "react-router-dom";
import AuthCheck from "../../auth-check";
import { useUser, useUserDispatch } from "../../lib/hooks";
import { setUser } from "../../lib/userSlice";
import { FormEvent, useState } from "react";
import Modal from "../../components/modal/modal";
import { User } from "../../lib/types/user";

export default function Profile() {
  const user = useUser();
  const goto = useNavigate();
  const dispatch = useUserDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState<File>();

  function deleteAccount() {
    localStorage.removeItem("user");
    dispatch(setUser(null));
    goto("/login");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formdata = new FormData(form);

    if (!user) return;

    const updatedUserData: User = {
      image: image ? URL.createObjectURL(image) : user.image,
      name: (formdata.get("name") as string) || user.name,
      email: (formdata.get("email") as string) || user.email,
      username: (formdata.get("username") as string) || user.username,
      password: (formdata.get("password") as string) || user.password,
      id: user.id,
      token: user.token,
    };
    dispatch(setUser(updatedUserData));
    form.reset();
    setOpenModal(false);
  }

  return (
    <AuthCheck>
      <article>
        <hgroup>
          {user?.image && (
            <div style={{ maxWidth: "4rem", aspectRatio: "square" }}>
              <img src={user.image} crossOrigin="anonymous" />
            </div>
          )}
          <h5>{user?.name}</h5>
          <h6>
            <a href={"mailto:" + user?.email}>{user?.email}</a>
          </h6>
        </hgroup>

        <p>
          <strong>Username:</strong> {user?.username}
        </p>
        <p>
          <strong>Password:</strong> {user?.password}
        </p>

        <footer className="grid">
          <button onClick={deleteAccount} className="outline">
            Delete account
          </button>
          <button onClick={() => setOpenModal(true)}>Update account</button>
        </footer>
      </article>

      <Modal open={openModal} onOpenChange={setOpenModal}>
        <header>
          <h5>Update your account</h5>
        </header>
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
                defaultValue={user?.name}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={user?.email}
              />
            </label>
            <label>
              Username
              <input
                type="text"
                name="username"
                placeholder="Username"
                defaultValue={user?.username}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Password"
                defaultValue={user?.password}
              />
            </label>
          </fieldset>

          <input type="submit" value="Update" />
          <input
            type="reset"
            value="Cancel"
            onClick={() => setOpenModal(false)}
          />
        </form>
      </Modal>
    </AuthCheck>
  );
}
