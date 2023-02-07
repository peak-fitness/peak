import { supabase } from "../../lib/supabaseClient.js";
import { useEffect, useState } from "react";
import Navbar from "../../comps/Navbar";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSessionContext } from "@supabase/auth-helpers-react";
import styles from "@/styles/Profiles.module.css";

// import { Container, Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Public_Profile() {
  const { isLoading, session, error } = useSessionContext();
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);
  const [friendStatus, setFriendStatus] = useState("N");
  const [Error, setError] = useState(null);
  const { query, isReady } = router;

  const getProfile = async () => {
    try {
      if (!isReady) {
        return;
      }
      const username = query.username;
      const loggedInUserId = await supabase
        .from("user")
        .select("id, username")
        .eq("auth_id", session.user.id)
        .single();
      setLoggedInUser(loggedInUserId.data);
      const { data, error } = await supabase
        .from("user")
        .select(
          "id, username, first_name, last_name, height, current_weight, age, gender, location, bio, social_medias"
        )
        .eq("username", username)
        .single();

      if (error) {
        setError(error);
      } else {
        setUser(data);
      }

      const isAdded = await supabase
        .from("friends")
        .select("id, status_code")
        .match({ requester_id: loggedInUserId.data.id, addressee_id: data.id })
        .single();
      console.log(isAdded);
      if (!isAdded.data) {
        return;
      } else if (isAdded.data.status_code === "Requested") {
        setFriendStatus("R");
      } else if (isAdded.data.status_code === "Accepted") {
        setFriendStatus("A");
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  const handleAdd = async (evt) => {
    const status = evt.target.value;

    if (status === "add") {
      const { data, error } = await supabase.from("friends").insert([
        {
          requester_id: loggedInUser.id,
          requester_username: loggedInUser.username,
          addressee_username: user.username,
          addressee_id: user.id,
          status_code: "Requested",
        },
      ]);
      setFriendStatus("R");
    } else if (status === "requested" || status === "friend") {
      const { data, error } = await supabase
        .from("friends")
        .delete()
        .match({ requester_id: loggedInUser.id, addressee_id: user.id });
      if (error) {
        setError(error);
      } else {
        setFriendStatus("N");
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, [isReady]);

  return (
    <>
      {/* <div>
        <h1>{profile}</h1>
      </div> */}
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          borderRadius: "8px",
        }}
      >
        <Container
          sx={{
            backgroundColor: "#262626",
            marginTop: "3rem",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          {user ? (
            <>
              <Box
                width="100%"
                height="6rem"
                sx={{
                  background: "linear-gradient(90deg, #FC5C7D, #03DAC5)",
                  position: "relative",
                  borderRadius: "8px 8px 0px 0px",
                }}
              ></Box>
              <Box
                sx={{
                  borderRadius: "0px 0px 8px 8px",
                  backgroundColor: "#202020",
                  // background: "linear-gradient(-90deg, #FC5C7D, #03DAC5)",
                  padding: "1rem 3rem 2rem 5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <Box>
                  <AccountCircle
                    id={styles.defaultProfileIcon}
                    sx={{ position: "absolute", top: "11.6rem" }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ marginBottom: "0", marginTop: "3rem" }}
                  >
                    {user.first_name + " " + user.last_name}
                  </Typography>
                  <Typography variant="h5" sx={{ marginTop: "0" }} />
                  {"@" + user.username}
                  <Typography />
                  <Box
                    sx={{
                      display: "flex",
                      padding: "1rem 0rem 0rem 0rem",
                      gap: "1rem",
                    }}
                  >
                    {user.social_medias.instagram && (
                      <>
                        <Link
                          href={user.social_medias.instagram}
                          target="_blank"
                          style={{
                            color: "#E8E8E8",
                            textDecoration: "none",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: ".2rem",
                            }}
                          >
                            <InstagramIcon />{" "}
                            <p style={{ margin: "0" }}>Instagram</p>
                          </Box>
                        </Link>
                      </>
                    )}
                    {user.social_medias.facebook && (
                      <Link
                        href={user.social_medias.facebook}
                        target="_blank"
                        style={{
                          color: "#E8E8E8",
                          textDecoration: "none",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: ".4rem",
                          }}
                        >
                          <FacebookIcon />{" "}
                          <p style={{ margin: "0" }}>Facebook</p>
                        </Box>
                      </Link>
                    )}
                    {user.social_medias.twitter && (
                      <Link
                        href={user.social_medias.twitter}
                        target="_blank"
                        style={{
                          color: "#E8E8E8",
                          textDecoration: "none",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: ".4rem",
                          }}
                        >
                          <TwitterIcon /> <p style={{ margin: "0" }}>Twitter</p>
                        </Box>
                      </Link>
                    )}
                    {user.social_medias.youtube && (
                      <Link
                        href={user.social_medias.youtube}
                        target="_blank"
                        style={{
                          color: "#E8E8E8",
                          textDecoration: "none",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: ".4rem",
                          }}
                        >
                          <YouTubeIcon />
                          <p style={{ margin: "0" }}>Youtube</p>
                        </Box>
                      </Link>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {friendStatus === "R" || friendStatus === "A" ? (
                    <Button
                      variant="contained"
                      value={
                        friendStatus === "R"
                          ? "requested"
                          : friendStatus === "A"
                          ? "friend"
                          : "add"
                      }
                      sx={{
                        border: "solid 1px #03DAC5",
                        backgroundColor: "#242424",
                        borderRadius: "1rem",
                        width: "2rem",
                        padding: ".2rem 5rem .2rem 5rem",
                      }}
                      onClick={handleAdd}
                    >
                      {friendStatus === "R" ? "Requested" : "Unfriend"}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      value="add"
                      sx={{
                        border: "solid 1px #03DAC5",
                        backgroundColor: "#242424",
                        borderRadius: "1rem",
                        width: "2rem",
                        padding: ".2rem 2.5rem .2rem 2.5rem",
                      }}
                      onClick={handleAdd}
                    >
                      ADD
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    sx={{
                      border: "solid 1px #03DAC5",
                      backgroundColor: "#03DAC5",
                      borderRadius: "1rem",
                      width: "2rem",
                      padding:
                        friendStatus === "R" || friendStatus === "A"
                          ? ".2rem 5rem .2rem 5rem"
                          : ".2rem 2.5rem .2rem 2.5rem",
                    }}
                  >
                    SHARE
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#202020",
                  padding: "1rem",
                }}
              >
                <Grid container>
                  <Grid item xs={2}>
                    <Typography variant="p">
                      Weight<br></br>
                      {user.current_weight}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="p">
                      Height<br></br>
                      {user.height}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      Age<br></br>
                      {user.age}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: "1rem" }}>
                  <Grid item xs={6}>
                    <Typography>
                      Bio<br></br>
                      {user.bio}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : Error ? (
            <Box>
              <h2>User does not exist</h2>
            </Box>
          ) : (
            <Box>
              <h2>Loading...</h2>
            </Box>
          )}
        </Container>
      </Container>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { username } = context.query;
//   console.log(username);
//   // const { data } = await supabase
//   //   .from("user")
//   //   .select(
//   //     "username, first_name, last_name, height, current_weight, age, gender, location, bio, social_medias"
//   //   )
//   //   .eq("username", username)
//   //   .single();
//   return { props: { profile: username } };
// }
