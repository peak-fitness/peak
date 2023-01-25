// import { supabase } from "../../lib/supabaseClient";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function Signup() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log(error);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
        ></input>
        <label>password</label>
        <input
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
