import { useEffect, useState } from "react";
import styles from "@/styles/Groups.module.css";
import { Grid, IconButton } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import {
  useSession,
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Navbar from "@/comps/Navbar";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router";
import sampleData from "@/comps/sampleData";
import Feed from "@/SocialComponents/Feed";

export default function Groups({ data }) {
  const [tab, setTab] = useState(true);
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { isLoading, session, error } = useSessionContext();

  const handleFriendTab = () => {
    setTab(true);
  };

  const handleInvitationTab = () => {
    setTab(false);
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnSelect = (item) => {
    router.push(`/social/${item.username}`);
  };

  const getProfile = async () => {
    if (session !== null) {
      const user = await supabase
        .from("user")
        .select("*, friends!friends_addressee_id_fkey(*)")
        .eq("auth_id", session.user.id)
        .single();
      setUser(user.data);

      const friendspt1 = await supabase
        .from("friends")
        .select("id, addressee_username")
        .eq("requester_id", user.data.id);
      setFriends(friendspt1.data);

      const friendspt2 = await supabase
        .from("friends")
        .select("id, requester_username")
        .eq("addressee_id", user.data.id);
      // console.log("FRIENDS PT 2", friendspt2);
      friendspt2.data.forEach((friend) => friends.push(friend));
    } else return;
  };

  useEffect(() => {
    getProfile();
  }, [session]);

  const formatResult = (item) => {
    return (
      <>
        <span
          className={styles.searchResults}
          style={{
            display: "flex",
            textAlign: "left",
            gap: "1rem",
            justifyContent: "flex-start",
          }}
        >
          <AccountCircleIcon
            className={tab ? "" : `${styles.active}`}
            sx={{ color: "#fafafa", height: "40px", width: "40px" }}
          />
          {item.username}
        </span>
      </>
    );
  };

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        ""
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.groupContainer}>
              <p className={styles.header}>GROUPS</p>
              <div className={styles.content}>
                <div className={styles.friends}>
                  <div className={styles.friendsTabs}>
                    <button
                      className={tab ? `${styles.active}` : ""}
                      onClick={handleFriendTab}
                    >
                      <GroupIcon
                        className={tab ? `${styles.active}` : ""}
                        sx={{ color: "#fafafa", height: "40px", width: "40px" }}
                      />
                    </button>
                    <button
                      className={tab ? "" : `${styles.active}`}
                      onClick={handleInvitationTab}
                    >
                      <EmailIcon
                        className={tab ? "" : `${styles.active}`}
                        sx={{ color: "#fafafa", height: "40px", width: "40px" }}
                      />
                    </button>
                  </div>
                  {tab ? (
                    <div className={styles.friendsContainer}>
                      <ReactSearchAutocomplete
                        items={sampleData}
                        fuseOptions={{ keys: ["username"] }}
                        resultStringKeyName="username"
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        autoFocus
                        formatResult={formatResult}
                        styling={{
                          backgroundColor: "#262626",
                          border: "1px solid #161616",
                          color: "#fafafa",
                          hoverBackgroundColor: "#202020",
                          fontFamily: "Montserrat",
                        }}
                      />
                      {/* Map over all the friends */}
                      {friends.map((friend) => (
                        <p key={friend.id}>
                          {friend.addressee_username
                            ? friend.addressee_username
                            : friend.requester_username}
                        </p>
                      ))}
                      <Link href="/social/justindjsuh135">
                        <div className={styles.friend}>
                          <AccountCircleIcon
                            className={tab ? "" : `${styles.active}`}
                            sx={{
                              color: "#fafafa",
                              height: "40px",
                              width: "40px",
                            }}
                          />
                          <p>justinsuh135</p>
                        </div>
                      </Link>
                      <Link href="/social/seanbrown139">
                        <div className={styles.friend}>
                          <AccountCircleIcon
                            className={tab ? "" : `${styles.active}`}
                            sx={{
                              color: "#fafafa",
                              height: "40px",
                              width: "40px",
                            }}
                          />
                          <p>seanbrown139</p>
                        </div>
                      </Link>
                      <Link href="/social/bryanolivo274">
                        <div className={styles.friend}>
                          <AccountCircleIcon
                            className={tab ? "" : `${styles.active}`}
                            sx={{
                              color: "#fafafa",
                              height: "40px",
                              width: "40px",
                            }}
                          />
                          <p>bryanolivo274</p>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div className={styles.requestContainer}>
                      {/* map over all the requests */}
                      {user.friends.map((request) => (
                        <Link
                          key={request.id}
                          href={`/social/${request.requester_username}`}
                        >
                          <div className={styles.request}>
                            <AccountCircleIcon
                              className={tab ? "" : `${styles.active}`}
                              sx={{
                                color: "#fafafa",
                                height: "45px",
                                width: "45px",
                              }}
                            />
                            <p>{request.requester_username}</p>
                            <div className={styles.requestBtns}>
                              <Grid container spacing={2}>
                                <Grid item xs={4}>
                                  <IconButton
                                    className={styles.requestBtn}
                                    aria-label="group-icon"
                                  >
                                    <CheckCircleIcon
                                      sx={{
                                        color: "#57B95F",
                                        height: "30px",
                                        width: "30px",
                                      }}
                                    />
                                  </IconButton>
                                </Grid>
                                <Grid item xs={8}>
                                  <IconButton
                                    className={styles.requestBtn}
                                    aria-label="group-icon"
                                  >
                                    <CancelIcon
                                      sx={{
                                        color: "#D73A38",
                                        height: "30px",
                                        width: "30px",
                                      }}
                                    />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Feed />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
