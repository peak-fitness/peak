import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";

import Navbar from "../../comps/Navbar";

import Link from "next/link";
import Image from "next/image";

import { Container, Typography, Box, Grid, Button } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YoutubeIcon from "@mui/icons-material/Youtube";
import AccountCircle from "@mui/icons-material/AccountCircle";

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
  const [bio, setBio] = useState(null);
  const [streak, setStreak] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [twitter, setTwitter] = useState(null);
  const [youtube, setYoutube] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("user")
        .select(
          `username, first_name, last_name, email, created_at, height, current_weight, age, location, bio, social_medias`
        )
        .eq("auth_id", user.id)
        .single();
      console.log(data, "DATA");

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
        setLocation(data.location);
        setBio(data.bio);
        setInstagram(data.social_medias.instagram);
        setFacebook(data.social_medias.facebook);
        setTwitter(data.social_medias.twitter);
        setYoutube(data.social_medias.youtube);
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
              padding: "1.5rem 3rem 1.5rem 3rem",
              marginLeft: "2rem",
              boxShadow: "0px 10px 10px rgba(0,0,0,0.2)",
              borderRadius: "4px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <AccountCircle sx={{ width: "10rem", height: "10rem" }} />
            </Box>
            <Typography
              variant="h5"
              sx={{ color: "#E8E8E8", textAlign: "center" }}
            >
              {username}
            </Typography>
            <Box
              sx={{
                marginTop: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              {instagram && (
                <>
                  <Link
                    href={instagram}
                    target="_blank"
                    style={{
                      padding: "10px",
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
                      <InstagramIcon /> <p style={{ margin: "0" }}>Instagram</p>
                    </Box>
                  </Link>
                </>
              )}
              {facebook && (
                <Link
                  href={facebook}
                  target="_blank"
                  style={{
                    padding: "10px",
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
                    <FacebookIcon /> <p style={{ margin: "0" }}>Facebook</p>
                  </Box>
                </Link>
              )}
              {twitter && (
                <Link
                  href={twitter}
                  target="_blank"
                  style={{
                    padding: "10px",
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
                    <TwitterIcon /> <p style={{ margin: "0" }}>Twitter</p>
                  </Box>
                </Link>
              )}
              {youtube && (
                <Link
                  href={youtube}
                  target="_blank"
                  style={{
                    padding: "10px",
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
                    <YoutubeIcon /> <p style={{ margin: "0" }}>Youtube</p>
                  </Box>
                </Link>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "#242424",
              padding: "3rem 6rem 6rem 6rem",
              width: "49rem",
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
            <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={4}>
                <Typography variant="h5" sx={{ color: "#E8E8E8" }}>
                  {firstName || `First Name`}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" sx={{ color: "#E8E8E8" }}>
                  {lastName || `Last Name`}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={3}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {height ? `H: ${height} in` : `H: `}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {weight ? `W: ${weight} lbs` : `W: `}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {age ? `A: ${age} yrs` : `A: `}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={9}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {location || `Location not specified`}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={9}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {`Current Streak: ${streak || `0`}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={9}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  PRs or Achievements
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={9}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {bio || ""}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </>
    )
  );
}
