import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import styles from "@/styles/Account.module.css";
import ChangeUsername from "@/AccountComponents/changeUsername";
import ChangeEmail from "@/AccountComponents/changeEmail";
import ChangePassword from "@/AccountComponents/changePassword";

export default function ChangeSettingsModal({ user, tab, setTab, setChange }) {
  const [email, setEmail] = useState(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <button className={styles.cancelBtn} onClick={() => setTab("")}>
          Cancel
        </button>
        {tab === "username" && (
          <ChangeUsername user={user} setTab={setTab} setChange={setChange} />
        )}
        {tab === "email" && (
          <ChangeEmail user={user} setTab={setTab} setChange={setChange} />
        )}
        {tab === "password" && (
          <ChangePassword user={user} setTab={setTab} setChange={setChange} />
        )}
      </div>
    </div>
  );
}
