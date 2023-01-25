import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
// import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  const router = useRouter();
  const session = useSession();
  if (session) router.push('/')

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const {data, error} = await supabase.auth.signInWithPassword({
        email, 
        password
    }); 
    if (error) setFailedLogin(true);
  };

  return (
    !session &&
     <div>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Log In</button>
        </form>
        {failedLogin && <p>Incorrect Email or Password. Please try again</p>}
    </div>
  )
}

// <div className="container" style={{ padding: "50px 0 100px 0" }}>
// {!session ? (
//   <Auth
//     supabaseClient={supabase}
//     appearance={{ theme: ThemeSupa }}
//     theme="dark"
//   />
// ) : (
//   <p>Temp</p>
// )}
// </div>
// </>
