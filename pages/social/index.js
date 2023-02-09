import { useEffect, useState } from "react";
import styles from "@/styles/Groups.module.css";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import {
  useSession,
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Navbar from "@/comps/Navbar";
import Link from "next/link";
import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Feed from "@/SocialComponents/Feed";

export default function Groups() {
  const [tab, setTab] = useState(true);
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  // const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { isLoading, session, error } = useSessionContext();

  const handleFriendTab = () => {
    setTab(true);
  };

  const handleInvitationTab = () => {
    setTab(false);
  };

  const getAllUsers = async () => {
    const { data, error } = await supabase.from("user").select("id, username");
    setAllUsers(data);
  };

  const handleRequestAccept = async (requestId) => {
    try {
      await supabase
        .from("friends")
        .update({ status_code: "Accepted" })
        .match({ status_code: "Requested" })
        .eq("id", requestId)
        .single();
      getProfile();
      toast.success("Request Accepted!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: "false",
        theme: "dark",
      });
    } catch (error) {
      toast.error("Something went wrong :(", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      });
    }
  };

  const handleRequestDecline = async (requestId) => {
    try {
      await supabase.from("friends").delete().eq("id", requestId).single();
      getProfile();
      toast.success("Request Declined", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: "false",
        theme: "dark",
      });
    } catch (error) {
      toast.error("Something went wrong :(", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      });
    }
  };

  const getProfile = async () => {
    if (session !== null) {
      const user = await supabase
        .from("user")
        .select("*, friends!friends_addressee_id_fkey(*)")
        .eq("auth_id", session.user.id)
        .eq("friends.status_code", "Requested")
        .single();
      setUser(user.data);

      // Getting friends where the user.id is the requester
      const friendspt1 = await supabase
        .from("friends")
        .select("id, addressee_id, addressee_username")
        .eq("requester_id", user.data.id)
        .eq("status_code", "Accepted");

      // Getting friends where the user.id is the addressee
      const friendspt2 = await supabase
        .from("friends")
        .select("id, requester_id, requester_username")
        .eq("addressee_id", user.data.id)
        .eq("status_code", "Accepted");
      setFriends([...friendspt1.data, ...friendspt2.data]);
    } else return;
  };

  const handleOnSelect = (item) => {
    router.push(`/social/${item.username}`);
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

  useEffect(() => {
    getProfile();
    getAllUsers();
  }, [session]);

  return session ? (
    <>
      <Navbar />
      {isLoading ? (
        ""
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.groupContainer}>
              <p className={styles.header}>SOCIAL</p>
              <div className={styles.content}>
                <div className={styles.friends}>
                  <div className={styles.friendsTabs}>
                    <button
                      className={tab ? `${styles.active}` : ""}
                      onClick={handleFriendTab}
                    >
                      <GroupIcon
                        id={styles.icon}
                        className={tab ? `${styles.active}` : ""}
                        sx={{ color: "#fafafa", height: "40px", width: "40px" }}
                      />
                    </button>
                    <button
                      className={tab ? "" : `${styles.active}`}
                      onClick={handleInvitationTab}
                    >
                      <div className={styles.emailIcon}>
                        <EmailIcon
                          id={styles.icon}
                          className={tab ? "" : `${styles.active}`}
                          sx={{
                            color: "#fafafa",
                            height: "40px",
                            width: "40px",
                          }}
                        />
                        <p>{user.friends ? user.friends.length : ""}</p>
                      </div>
                    </button>
                  </div>
                  {tab ? (
                    <div className={styles.friendsContainer}>
                      <div className={styles.searchUsers}>
                        {" "}
                        <ReactSearchAutocomplete
                          items={allUsers}
                          fuseOptions={{ keys: ["username"] }}
                          resultStringKeyName="username"
                          onSelect={handleOnSelect}
                          autoFocus
                          formatResult={formatResult}
                          placeholder="Search user"
                          styling={{
                            backgroundColor: "#262626",
                            border: "1px solid #161616",
                            color: "#fafafa",
                            hoverBackgroundColor: "#202020",
                            fontFamily: "Montserrat",
                          }}
                        />{" "}
                      </div>
                      {/* Map over all the friends */}
                      {friends.length === 0 ? (
                        <div className={styles.noFriends}>
                          <p>No friends yet :&#40;</p>
                          <p>Search users to add them!</p>
                        </div>
                      ) : (
                        friends.map((friend) => (
                          <div key={friend.id} className={styles.friend}>
                            <AccountCircleIcon
                              id={styles.icon}
                              sx={{
                                color: "#fafafa",
                                height: "40px",
                                width: "40px",
                              }}
                            />
                            <Link
                              href={`/social/${
                                friend.addressee_username
                                  ? friend.addressee_username
                                  : friend.requester_username
                              }`}
                            >
                              <p>
                                {friend.addressee_username
                                  ? friend.addressee_username
                                  : friend.requester_username}
                              </p>
                            </Link>
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className={styles.requestContainer}>
                      {/* map over all the requests */}
                      {user.friends.length === 0 ? (
                        <div className={styles.noRequests}>
                          <p>No requests yet!</p>
                        </div>
                      ) : (
                        user.friends.map((request) => (
                          <div key={request.id} className={styles.request}>
                            <AccountCircleIcon
                              id={styles.icon}
                              sx={{
                                color: "#fafafa",
                                height: "45px",
                                width: "45px",
                              }}
                            />
                            <Link
                              href={`/social/${request.requester_username}`}
                            >
                              <p>{request.requester_username}</p>
                            </Link>
                            <div className={styles.requestBtns}>
                              <Grid container spacing={2}>
                                <Grid item xs={4}>
                                  <IconButton
                                    className={styles.requestBtn}
                                    aria-label="group-icon"
                                    onClick={() =>
                                      handleRequestAccept(request.id)
                                    }
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
                                    onClick={() =>
                                      handleRequestDecline(request.id)
                                    }
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
                        ))
                      )}
                    </div>
                  )}
                </div>
                <Feed user={user} friends={friends} />
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  ) : (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
      >
        <Box
          sx={{
            width: "80rem",
            height: "20rem",
            marginTop: "15vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#242424",
            borderRadius: "8px",
            boxShadow: "0px 10px 10px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#E8E8E8", textAlign: "center" }}
          >
            You need an account to access this page
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <Link
              href="auth/login"
              style={{
                padding: "10px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(#161616, #161616) padding-box, linear-gradient(to right,#da6b03, #b59500, #89b33e, #56ca82, #03dac5) border-box",
                  border: "2px solid transparent",
                  padding: "1rem 1rem 1rem 1rem",
                }}
              >
                Sign Into Your Account
              </Button>
            </Link>
            <Link
              href="auth/signup"
              style={{
                padding: "10px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(#161616, #161616) padding-box, linear-gradient(to right,#da6b03, #b59500, #89b33e, #56ca82, #03dac5) border-box",
                  border: "2px solid transparent",
                  padding: "1rem 1rem 1rem 1rem",
                }}
              >
                Create A New Account
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
