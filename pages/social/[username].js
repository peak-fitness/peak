import { supabase } from "../../lib/supabaseClient.js";
import { useEffect, useState } from "react";
import Navbar from "../../comps/Navbar";
import { useRouter } from "next/router";
import { useSessionContext } from "@supabase/auth-helpers-react";

// import { Container, Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Public_Profile() {
  const { isLoading, session, error } = useSessionContext();
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);
  const [requested, setRequested] = useState(false);
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
        setRequested(true);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  const handleAdd = async () => {
    const { data, error } = await supabase.from("friends").insert([
      {
        requester_id: loggedInUser.id,
        requester_username: loggedInUser.username,
        addressee_username: user.username,
        addressee_id: user.id,
        status_code: "Requested",
      },
    ]);
    setRequested(true);
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
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#202020",
                  padding: "1rem 3rem 1rem 5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <Box>
                  <AccountCircle sx={{ width: "8rem", height: "8rem" }} />
                  <Typography variant="h5" sx={{ marginBottom: "0" }}>
                    {user.first_name + " " + user.last_name}
                  </Typography>
                  <Typography variant="h5" sx={{ marginTop: "0" }} />
                  {"@" + user.username}
                  <Typography />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    gap: "1rem",
                  }}
                >
                  {requested ? (
                    <Button
                      variant="contained"
                      disabled
                      sx={{
                        border: "solid 1px #03DAC5",
                        backgroundColor: "#242424",
                        borderRadius: "1rem",
                        width: "2rem",
                        padding: ".2rem 2.5rem .2rem 2.5rem",
                      }}
                      onClick={handleAdd}
                    >
                      Requested
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
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
                      padding: ".2rem 2.5rem .2rem 2.5rem",
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
                <Grid container>
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
