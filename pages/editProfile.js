import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";

import Navbar from "../comps/Navbar";

import { useRouter } from "next/router";

import Link from "next/link";

import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
} from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AccountCircle from "@mui/icons-material/AccountCircle";

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
          `username, first_name, last_name, created_at, height, current_weight, age, location, bio, social_medias`
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
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);

      let { data, error } = await supabase
        .from("user")
        .update({
          first_name: firstName,
          last_name: lastName,
          height: height,
          current_weight: weight,
          age: age,
          location: location,
          bio: bio,
          social_medias: {
            twitter: twitter,
            youtube: youtube,
            facebook: facebook,
            instagram: instagram,
          },
        })
        .eq("auth_id", user.id)
        .select();

      if (error) throw error;
    } catch (error) {
      toast.error("There was an issue saving your changes", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      });
    } finally {
      setLoading(false);
      toast.success("Changes saved!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: "false",
        theme: "dark",
      });
      router.push("/profile");
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
    display: "flex",
    marginTop: "2rem",
    flexDirection: { xs: "column", sm: "column", md: "column", lg: "column" },
    gap: "1rem",
    alignItems: "center",
    marginBottom: "1rem",
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
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          // marginTop: "5vh",
          // backgroundColor: "#262626",
          // display: "flex",
          // gap: "2rem",
          // padding: "5rem",
          // borderRadius: "8px",
          minHeight: "100vh",
        }}
      >
        <Box sx={responsiveContainer}>
          <Box sx={responsiveSidePanel}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <AccountCircle sx={{ width: "10rem", height: "10rem" }} />
            </Box>
            <Typography
              variant="h5"
              sx={{ color: "#E8E8E8", textAlign: "center" }}
            >
              {username}
            </Typography>
            <Box sx={responsiveSidePanelSocials}>
              <TextField
                onChange={(event) => setInstagram(event.target.value)}
                label="Instagram"
                type="url"
                variant="filled"
                InputLabelProps={{
                  shrink: true,
                  sx: { color: "#E8E8E8" },
                }}
                name="instagram"
                value={instagram}
                sx={{
                  backgroundColor: "#242424",
                  input: { color: "#E8E8E8" },
                  label: { color: "#E8E8E8" },
                }}
              ></TextField>

              <TextField
                onChange={(event) => setFacebook(event.target.value)}
                label="Facebook"
                variant="filled"
                type="url"
                InputLabelProps={{
                  shrink: true,
                  sx: { color: "#E8E8E8" },
                }}
                name="facebook"
                value={facebook}
                sx={{
                  backgroundColor: "#242424",
                  input: { color: "#E8E8E8" },
                  label: { color: "#E8E8E8" },
                }}
              ></TextField>
              <TextField
                onChange={(event) => setTwitter(event.target.value)}
                label="Twitter"
                variant="filled"
                type="url"
                InputLabelProps={{
                  shrink: true,
                  sx: { color: "#E8E8E8" },
                }}
                name="twitter"
                value={twitter}
                sx={{
                  backgroundColor: "#242424",
                  input: { color: "#E8E8E8" },
                  label: { color: "#E8E8E8" },
                }}
              ></TextField>
              <TextField
                onChange={(event) => setYoutube(event.target.value)}
                label="Youtube"
                variant="filled"
                type="url"
                InputLabelProps={{
                  shrink: true,
                  sx: { color: "#E8E8E8" },
                }}
                name="youtube"
                value={youtube}
                sx={{
                  backgroundColor: "#242424",
                  input: { color: "#E8E8E8" },
                  label: { color: "#E8E8E8" },
                }}
              ></TextField>
            </Box>
          </Box>
          <Box sx={responsiveProfileInfoBox}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "2rem",
                marginBottom: "2rem",
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
                onClick={() => {
                  updateProfile({
                    first_name: firstName,
                    last_name: lastName,
                    height,
                    current_weight: weight,
                    age,
                    location,
                    bio,
                    twitter,
                    youtube,
                    facebook,
                    instagram,
                  });
                }}
              >
                SAVE
              </Button>

              <Button
                variant="contained"
                sx={{
                  border: "solid 1px #DA3633",
                  backgroundColor: "#242424",
                  borderRadius: "1rem",
                  width: "2rem",
                  padding: "0rem 2.5rem 0rem 2.5rem",
                }}
                onClick={() => router.push("/profile")}
              >
                CANCEL
              </Button>
            </Box>
            <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  onChange={(event) => setFirstName(event.target.value)}
                  label="First Name"
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: "#E8E8E8" },
                  }}
                  name="first_name"
                  value={firstName}
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#E8E8E8" },
                    label: { color: "#E8E8E8" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  onChange={(event) => setLastName(event.target.value)}
                  label="Last Name"
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: "#E8E8E8" },
                  }}
                  name="last_name"
                  value={lastName}
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#E8E8E8" },
                    label: { color: "#E8E8E8" },
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <TextField
                  onChange={(event) => setHeight(event.target.value)}
                  label="Height"
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: "#E8E8E8" },
                  }}
                  name="height"
                  value={height}
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#E8E8E8" },
                    label: { color: "#E8E8E8" },
                    marginBottom: "2rem",
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <TextField
                  onChange={(event) => setWeight(event.target.value)}
                  label="Weight"
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: "#E8E8E8" },
                  }}
                  name="weight"
                  value={weight}
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#E8E8E8" },
                    label: { color: "#E8E8E8" },
                    marginBottom: "2rem",
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <TextField
                  onChange={(event) => setAge(event.target.value)}
                  label="Age"
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: "#E8E8E8" },
                  }}
                  name="age"
                  value={age}
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#E8E8E8" },
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={9}>
                <TextField
                  onChange={(event) => setLocation(event.target.value)}
                  label="Location"
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: "#E8E8E8" },
                  }}
                  name="age"
                  value={location}
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#E8E8E8" },
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ marginBottom: "2rem" }}>
              <Grid item xs={12}>
                <TextField
                  onChange={(event) => setBio(event.target.value)}
                  label="Bio"
                  multiline
                  minRows={2}
                  maxRows={4}
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: "#E8E8E8" },
                  }}
                  InputProps={{ style: { color: "#E8E8E8" } }}
                  name="age"
                  value={bio}
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#E8E8E8" },
                    width: { md: "25rem", lg: "40rem" },
                  }}
                ></TextField>
              </Grid>
            </Grid>
          </Box>
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
