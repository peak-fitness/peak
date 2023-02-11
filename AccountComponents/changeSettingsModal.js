import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import styles from "@/styles/Account.module.css";
import ChangeUsername from "@/AccountComponents/changeUsername";

export default function ChangeSettingsModal({ user, tab, setTab }) {
  const [email, setEmail] = useState(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <button className={styles.cancelBtn} onClick={() => setTab("")}>
          Cancel
        </button>
        {tab === "username" && <ChangeUsername user={user} setTab={setTab} />}
        {/* <p>
          Forgot your password? Enter your email and we&apos;ll send you a
          recovery link.
        </p>
        <div className={styles.formBox}>
          <form>
            <label className={styles.label} htmlFor="email">
              Email
              <input
                id="email"
                className={styles.emailInput}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </label>
          </form> */}
        {/* </div> */}
        {/* <button className={styles.sendBtn} onClick={handleReset} type="submit">
          Send Email
        </button>
        {sent && <p>Email sent! Please check your email.</p>}
        {error && <p>Something went wrong. Please try again.</p>} */}
      </div>
    </div>
  );
}
