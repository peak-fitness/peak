import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import styles from "@/styles/Account.module.css";
import { toast } from "react-toastify";

export default function ChangePassword({ user, setTab, setChange }) {
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [success, setSuccess] = useState(null);
  const [Error, setError] = useState(null);
  const session = useSession();

  const updatePassword = async (evt) => {
    evt.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords must match", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      });
      return;
    }

    const access_token = session.access_token;
    const refresh_token = session.refresh_token;
    const res = await supabase.auth.setSession({ access_token, refresh_token });
    console.log(res);
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      console.log(error);
      toast.error("Something went wrong, try again", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      });
    } else {
      toast.success("Password changed successfully");
      setTab("");
      setChange(true);
    }
  };

  return (
    <div className={styles.inputBox}>
      <form onSubmit={updatePassword}>
        <label htmlFor="new password">
          New Password
          <input
            type="password"
            required
            className={styles.usernameInput}
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
        </label>
        <label htmlFor="confirm password">
          Confirm New Password
          <input
            type="password"
            required
            className={styles.usernameInput}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </label>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
}
