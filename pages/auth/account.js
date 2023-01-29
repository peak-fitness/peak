import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";

import Navbar from "../../comps/Navbar";

import { Container, Typography, Box, Grid, Button } from "@mui/material";

export default function Account() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [age, setAge] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("user")
        .select(
          `username, first_name, last_name, email, created_at, height, current_weight, age`
        )
        .eq("auth_id", user.id)
        .single();
      console.log(data.age, "DATA");

      if (error && status !== 406) {
        throw error;
      }

      if (data && session) {
        setUsername(data.username);
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setWeight(data.current_weight);
        setHeight(data.height);
        setAge(data.age);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, first_name, last_name }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        first_name,
        last_name,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("user").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  console.log(session);

  return (
    session && (
      <>
        <Navbar />
        <Container
          maxWidth="lg"
          sx={{
            marginTop: "5vh",
            backgroundColor: "#262626",
            display: "flex",
            gap: "2rem",
            padding: "5rem",
            borderRadius: "8px",
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#242424",
              padding: "3rem",
              marginLeft: "2rem",
              boxShadow: "0px 10px 10px rgba(0,0,0,0.2)",
              borderRadius: "4px",
            }}
          >
            <Typography variant="h4" sx={{ color: "#E8E8E8" }}>
              {username}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#242424",
              padding: "3rem 6rem 6rem 6rem",
              width: "48.5rem",
              boxShadow: "0px 10px 10px rgba(0,0,0,0.2)",
              borderRadius: "4px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  border: "solid 1px #03DAC5",
                  backgroundColor: "#242424",
                  borderRadius: "1rem",
                  width: "2rem",
                  padding: "0rem 2rem 0rem 2rem",
                }}
              >
                EDIT
              </Button>
            </Box>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={3}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {firstName || `First Name`}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {lastName || `Last Name`}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={3}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {`H: ${height} in` || `Height:`}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {`W: ${weight} lbs` || `Weight:`}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {`A: ${age} yrs` || `Age:`}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={3}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {location || `Location`}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={3}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {`Current Streak: ${location || `0`}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={3}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  PRs
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={3}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  Bio
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </>
    )
  );
}
