import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import styles from "@/styles/Account.module.css";
import { toast } from "react-toastify";

export default function ChangeUsername({ user, setTab, setChange }) {
  const [username, setUsername] = useState(null);
  const [success, setSuccess] = useState(null);
  const [Error, setError] = useState(null);

  const updateUsername = async (evt) => {
    evt.preventDefault();
    let oldUsername = user.username;
    if (username < 3) {
      toast.error("Username must be longer than 3 characters", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      });
      return;
    }
    const { data, error } = await supabase
      .from("user")
      .update({ username: username })
      .eq("username", oldUsername)
      .select()
      .single();
    if (error) {
      setError("Error");
      toast.error("Username taken", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      });
    } else {
      updateFriends(oldUsername);
    }
  };

  const updateFriends = async (oldUsername) => {
    const { data, error } = await supabase
      .from("friends")
      .update({ requester_username: username })
      .match({ requester_username: oldUsername });
    updateFriends2(oldUsername);
  };

  const updateFriends2 = async (oldUsername) => {
    const { data, error } = await supabase
      .from("friends")
      .update({ addressee_username: username })
      .match({ addressee_username: oldUsername });
    toast.success(`Username changed from ${oldUsername} to ${username}`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: "false",
      theme: "dark",
    });
    setTab("");
    setChange(true);
  };

  return (
    <div className={styles.inputBox}>
      <form onSubmit={updateUsername}>
        <label htmlFor="username">
          Username
          <input
            required
            className={styles.usernameInput}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </label>

        <button className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
}
