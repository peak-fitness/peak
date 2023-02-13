import { useState, useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "../comps/Navbar";

import Link from "next/link";

import styles from "@/styles/Account.module.css";
import ChangeSettingsModal from "@/AccountComponents/changeSettingsModal";

import { useRouter } from "next/router";

export default function AccountSettings() {
  let { isLoading, session, error } = useSessionContext();
  const [tab, setTab] = useState("");
  const [user, setUser] = useState("");
  const [change, setChange] = useState(false);

  const getUser = async () => {
    if (!session) {
      return;
    }

    let { data, error, status } = await supabase
      .from("user")
      .select(
        `username, first_name, last_name, email, created_at, height, current_weight, age, location, bio, social_medias, target_calories, gender, target_weight, avatar_url`
      )
      .eq("auth_id", session.user.id)
      .single();
    setUser({
      username: data.username,
      email: session.user.email,
    });
    setChange(false);
  };

  useEffect(() => {
    getUser();
  }, [isLoading, change]);

  return (
    <>
      <Navbar />
      <div className={styles.accountContainer}>
        <div className={styles.accountContentBox}>
          <div>
            <h2>Account Settings</h2>
          </div>
          {session ? (
            <>
              <div className={styles.accountSettingsOptions}>
                <div className={styles.accountSettingsItem}>
                  <h4 className={styles.accountItemHeader}>{user.username}</h4>
                  <p>
                    Your username is visible and searchable by other users and
                    friends. Make it something fun and unique!
                  </p>
                  <button
                    value="username"
                    className={styles.changeButton}
                    onClick={(e) => setTab(e.target.value)}
                  >
                    Change username
                  </button>
                </div>
                <div className={styles.accountSettingsItem}>
                  <h4 className={styles.accountItemHeader}>{user.email}</h4>
                  <p>
                    The email you give us is used for login as well as password
                    recovery and is never publicly displayed.
                  </p>
                  <button
                    value="email"
                    className={styles.changeButton}
                    onClick={(e) => setTab(e.target.value)}
                  >
                    Change email
                  </button>
                </div>
                <div className={styles.accountSettingsItem}>
                  <h4 className={styles.accountItemHeader}>Password</h4>
                  <p>
                    Required for login. For your security you should never share
                    your password with anyone.
                  </p>
                  <button
                    value="password"
                    className={styles.changeButton}
                    onClick={(e) => setTab(e.target.value)}
                  >
                    Change password
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h1>Loading...</h1>
          )}
          {tab !== "" && (
            <ChangeSettingsModal
              user={user}
              tab={tab}
              setTab={setTab}
              setChange={setChange}
            />
          )}
        </div>
      </div>
    </>
  );
}
