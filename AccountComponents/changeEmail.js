import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import styles from "@/styles/Account.module.css";
import { toast } from "react-toastify";

export default function ChangeEmail({ user, setTab, setChange }) {
  const [email, setEmail] = useState(null);
  const [success, setSuccess] = useState(null);
  const [Error, setError] = useState(null);
  const session = useSession();

  const updateEmail = async (evt) => {
    evt.preventDefault();
    const access_token = session.access_token;
    const refresh_token = session.refresh_token;
    const res = await supabase.auth.setSession({ access_token, refresh_token });
    const { data, error } = await supabase.auth.updateUser({ email: email });
    if (error) {
      toast.error("Email already in use", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      });
    } else {
      toast.success(
        "Email sent. Check the email you entered to confirm change"
      );
      setTab("");
      setChange(true);
    }
  };

  return (
    <div className={styles.inputBox}>
      <form onSubmit={updateEmail}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            required
            className={styles.usernameInput}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
}
