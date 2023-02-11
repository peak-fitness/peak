import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import styles from "@/styles/Account.module.css";

export default function ChangeUsername({ user, setTab }) {
  const [username, setUsername] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const updateUsername = async () => {
    const { data, error } = await supabase
      .from("user")
      .update({ username: "username" })
      .eq("auth_id", user.id);
  };

  return (
    <div>
      <label htmlFor="username">
        Username
        <input
          className={styles.usernameInput}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </label>
      <button>Submit</button>
    </div>
  );
}
