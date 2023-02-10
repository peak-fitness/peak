import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import styles from "@/styles/resetPasswordModal.module.css";
import Link from "next/link";
import Navbar from "@/comps/Navbar";

export default function ResetPassword() {
  const [password, setPassword] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = async () => {
    if (password.length < 6) {
      setError("Password must be more than 6 characters long");
      return;
    } else {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (data) {
        setError(false);
        setSuccess(true);
      } else {
        console.log(error);
        setError(true);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.dummyContainer}>
        <div className={styles.container}>
          <div className={styles.box}>
            <p>Please enter a new password</p>
            <div className={styles.formBox}>
              <form>
                <label className={styles.label} htmlFor="password">
                  Password
                  <input
                    type="password"
                    id="password"
                    required
                    className={styles.emailInput}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </label>
              </form>
            </div>
            <button
              className={styles.sendBtn}
              onClick={handleReset}
              type="submit"
            >
              Submit
            </button>
            {success && (
              <>
                <p>Password successfully changed!</p>{" "}
                <Link href="/auth/login">Login</Link>
              </>
            )}
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
