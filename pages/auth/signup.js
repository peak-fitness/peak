import { useSupabaseClient } from "@supabase/auth-helpers-react";

function Signup() {
  return (
    <div>
      <form>
        <label>email</label>
        <input></input>
        <label>password</label>
        <input></input>
      </form>
    </div>
  );
}

export default Signup;
