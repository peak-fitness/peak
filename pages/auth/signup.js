import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const router = useRouter();

  const session = useSession();
  if (session) router.push('/')

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const usernames = await supabase.from("user").select("username");

    const checkUsernames = (usernameArr) => {
      for (const name of usernameArr) {
        if (name.username === username) {
          return false;
        }
      }
      return true;
    };

    if (checkUsernames(usernames.data)) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      setSubmitted(true);

      const res = await supabase
        .from("user")
        .insert({
          auth_id: data.user.id,
          email: data.user.email,
          username: username,
        })
        .select("*");

      setUsernameTaken(false);
    } else {
      setUsernameTaken(true);
    }
  };

  return (
    !session && 
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="username"
          onChange={(evt) => {
            setUsername(evt.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="email"
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          type="password"
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>Please check your email for a verification link!</p>}
      {usernameTaken && <p>Username already in use!</p>}
    </div>
  );
}
