import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import styles from "@/styles/resetPasswordModal.module.css";

export default function ResetPasswordModal({ setResetOpen }) {
  const [email, setEmail] = useState(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://peakfitness.netlify.app/auth/update-password",
    });
    if (data) {
      setSent(true);
    } else {
      setSent(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <button
          className={styles.cancelBtn}
          onClick={() => setResetOpen(false)}
        >
          Cancel
        </button>
        <p>
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
          </form>
        </div>
        <button className={styles.sendBtn} onClick={handleReset} type="submit">
          Send Email
        </button>
        {sent && <p>Email sent! Please check your email.</p>}
        {error && <p>Something went wrong. Please try again.</p>}
      </div>
    </div>
  );
}
