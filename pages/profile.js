import { useState, useEffect } from "react";
import Head from "next/head";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";

import Navbar from "../comps/Navbar";

import Link from "next/link";

import { useRouter } from "next/router";

import { Container, Typography, Box, Grid, Button } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AccountCircle from "@mui/icons-material/AccountCircle";

import styles from "@/styles/Profiles.module.css";

export default function Account() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
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
  const [targetWeight, setTargetWeight] = useState(null);
  const [gender, setGender] = useState(null);
  const [targetCalories, setTargetCalories] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("user")
        .select(
          `username, first_name, last_name, email, created_at, height, current_weight, age, location, bio, social_medias, target_calories, gender, target_weight, avatar_url`
        )
        .eq("auth_id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data && session) {
        setUsername(data.username);
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
        setGender(data.gender);
        setTargetWeight(data.target_weight);
        setTargetCalories(data.target_calories);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  const responsiveContainer = {
    flex: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
    marginTop: "5vh",
    backgroundColor: "#262626",
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" },
    gap: "2rem",
    padding: { xs: ".2rem", sm: "1rem", md: "5rem" },
    borderRadius: "8px",
  };

  const responsiveSidePanel = {
    flex: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
    maxWidth: { xs: "100%", sm: "100%", md: "20rem" },
    backgroundColor: "#242424",
    padding: { xs: ".3rem", sm: "1rem", md: "3rem" },
    boxShadow: "0px 10px 10px rgba(0,0,0,0.2)",
    borderRadius: "4px",
  };

  const responsiveSidePanelSocials = {
    flex: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
    marginTop: "2rem",
    flexDirection: { xs: "row", sm: "row", md: "column", lg: "column" },
    gap: "1rem",
    alignItems: "center",
  };

  const responsiveProfileInfoBox = {
    flex: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
    backgroundColor: "#242424",
    padding: "1.5rem 3rem 3rem 3rem",
    maxWidth: { xs: "100%", sm: "100%", md: "49rem" },
    width: { md: "49rem" },
    boxShadow: "0px 10px 10px rgba(0,0,0,0.2)",
    borderRadius: "4px",
  };

  return session ? (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
        }}
      >
        <Box sx={responsiveContainer}>
          <Box sx={responsiveSidePanel}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              {avatarUrl ? (
                <img
                  src={`https://cfbogjupbnvkonljmcuq.supabase.co/storage/v1/object/public/profile-pics/${avatarUrl}`}
                  alt=""
                  className={styles.userPfp}
                />
              ) : (
                <AccountCircle id={styles.defaultProfileIcon} />
              )}
            </Box>
            <Typography
              variant="h5"
              sx={{ color: "#E8E8E8", textAlign: "center" }}
            >
              {username}
            </Typography>
            <Box sx={responsiveSidePanelSocials}>
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
                      gap: ".4rem",
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
                      gap: "1.8rem",
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
                      gap: "1rem",
                    }}
                  >
                    <YouTubeIcon />
                    <p style={{ margin: "0" }}>Youtube</p>
                  </Box>
                </Link>
              )}
            </Box>
          </Box>
          <Box sx={responsiveProfileInfoBox}>
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
                onClick={() => router.push("/editProfile")}
              >
                EDIT
              </Button>
            </Box>
            <Grid
              container
              spacing={2}
              sx={{
                marginBottom: "2rem",
                textAlign: { xs: "center", sm: "center", md: "start" },
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Typography variant="h5" sx={{ color: "#E8E8E8" }}>
                  {firstName || `First Name`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Typography variant="h5" sx={{ color: "#E8E8E8" }}>
                  {lastName || `Last Name`}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              sx={{ marginBottom: "2rem", textAlign: "center" }}
            >
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {height ? `H: ${height} in` : `H: `}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {weight ? `W: ${weight} lbs` : `W: `}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {age ? `A: ${age} yrs` : `A: `}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              sx={{
                marginBottom: "2rem",
                textAlign: { xs: "center", sm: "center", md: "center" },
              }}
            >
              <Grid item xs={6}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {targetCalories
                    ? `Calorie Goal: ${targetCalories}`
                    : "Calorie Goal:"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {targetWeight
                    ? `Weight Goal: ${targetWeight}`
                    : "Weight Goal:"}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              sx={{
                marginBottom: "2rem",
                textAlign: { xs: "center", sm: "center", md: "start" },
              }}
            >
              <Grid item xs={12}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {gender ? `Gender: ${gender}` : "Gender not specified"}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              sx={{
                marginBottom: "2rem",
                textAlign: { xs: "center", sm: "center", md: "start" },
              }}
            >
              <Grid item xs={12}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {location || `Location not specified`}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              sx={{
                marginBottom: "2rem",
                textAlign: { xs: "center", sm: "center", md: "start" },
              }}
            >
              <Grid item xs={12}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {`Current Streak: ${streak || `0`}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              sx={{
                marginBottom: "2rem",
                textAlign: { xs: "center", sm: "center", md: "start" },
              }}
            >
              <Grid item xs={12}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  PRs or Achievements
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              sx={{
                marginBottom: "2rem",
                textAlign: { xs: "center", sm: "center", md: "start" },
                overflowWrap: "break-word",
              }}
            >
              <Grid item xs={12}>
                <Typography variant="p" sx={{ color: "#E8E8E8" }}>
                  {bio || ""}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {/* <ToastContainer /> */}
        </Box>
      </Container>
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
