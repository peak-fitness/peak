import { useState } from "react";
import styles from "@/styles/Groups.module.css";
import { Grid, IconButton } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
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

export default function Groups({ data }) {
  const [tab, setTab] = useState(true);
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

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

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    router.push(`/social/${item.username}`);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

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
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
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
                  <Link href="/social/justindjsuh135">
                    <div className={styles.friend}>
                      <AccountCircleIcon
                        className={tab ? "" : `${styles.active}`}
                        sx={{ color: "#fafafa", height: "40px", width: "40px" }}
                      />
                      <p>justinsuh135</p>
                    </div>
                  </Link>
                  <Link href="/social/seanbrown139">
                    <div className={styles.friend}>
                      <AccountCircleIcon
                        className={tab ? "" : `${styles.active}`}
                        sx={{ color: "#fafafa", height: "40px", width: "40px" }}
                      />
                      <p>seanbrown139</p>
                    </div>
                  </Link>
                  <Link href="/social/bryanolivo274">
                    <div className={styles.friend}>
                      <AccountCircleIcon
                        className={tab ? "" : `${styles.active}`}
                        sx={{ color: "#fafafa", height: "40px", width: "40px" }}
                      />
                      <p>bryanolivo274</p>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className={styles.requestContainer}>
                  {/* map over all the requests */}
                  <Link href="/social/justindjsuh135">
                    <div className={styles.request}>
                      <AccountCircleIcon
                        className={tab ? "" : `${styles.active}`}
                        sx={{ color: "#fafafa", height: "45px", width: "45px" }}
                      />
                      <p>justinsuh135</p>
                      <div className={styles.requestBtns}>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <IconButton
                              className={styles.requstBtn}
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
                              className={styles.requstBtn}
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
                  <Link href="/social/seanbrown139">
                    <div className={styles.request}>
                      <AccountCircleIcon
                        className={tab ? "" : `${styles.active}`}
                        sx={{ color: "#fafafa", height: "45px", width: "45px" }}
                      />
                      <p>seanbrown139</p>
                      <div className={styles.requestBtns}>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <IconButton
                              className={styles.requstBtn}
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
                              className={styles.requstBtn}
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
                  <Link href="/social/warrenchan364">
                    <div className={styles.request}>
                      <AccountCircleIcon
                        className={tab ? "" : `${styles.active}`}
                        sx={{ color: "#fafafa", height: "45px", width: "45px" }}
                      />
                      <p>warrenchan364</p>
                      <div className={styles.requestBtns}>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <IconButton
                              className={styles.requstBtn}
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
                              className={styles.requstBtn}
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
                </div>
              )}
            </div>
            <div className={styles.groupsContainer}>
              <div className={styles.groups}>
                {/* CREATE GROUP */}
                <Link href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AddCircleOutlinedIcon
                      sx={{ color: "#262626", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Create Group</p>
                  <p className={styles.members}></p>
                </Link>
                {/* GROUP 1 */}
                <Link href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#843732", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>The Boys</p>
                  <p className={styles.members}>8 members</p>
                </Link>
                {data &&
                  data.map((group) => (
                    <Link
                      key={group.id}
                      href="/groups/:id"
                      className={styles.group}
                    >
                      <IconButton aria-label="group-icon">
                        <AccountCircleIcon
                          sx={{
                            color: "#843732",
                            height: "80px",
                            width: "80px",
                          }}
                        />
                      </IconButton>
                      <p className={styles.groupName}>{group.name}</p>
                      <p className={styles.members}>
                        {/* {group.members.length} members */}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("groups")
    .select("*, members (*) ");
  console.log("ERROR", error);

  // {
  //   created_at: "2023-02-02T17:19:28.022418+00:00";
  //   desc: "A test description";
  //   id: 1;
  //   name: "test group";
  //   --include statement--
  //   members: [{}, {}]
  // }

  // search functionality
  // create group button functionality
  // single group view page
  // content??
  // admins
  // edit settings (name, description)
  // edit users
  // add other admins?
  // creator???

  // const {data, error} = await supabase.from("group members").
  return { props: { data } };
}
