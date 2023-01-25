import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function Signup() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    setSubmitted(true);

    await supabase.from('user').insert({
      auth_id: data.user.id, email: data.user.email, username: username
    }).select();

    // console.log(data);
    // console.log(error);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input
        type='email'
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
        ></input>
        <label>password</label>
        <input
        type='password'
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
        />
        <label>username</label>
         <input
         type='username'
          onChange={(evt) => {
            setUsername(evt.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>Please check your email for a verification link!</p>}
    </div>
  );
}
