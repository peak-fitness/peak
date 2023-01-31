import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";

import Navbar from "../comps/Navbar";

import { useRouter } from "next/router";

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
              <Grid item xs={4}>
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
              <Grid item xs={6}>
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
              <Grid item xs={3}>
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
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={3}>
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
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={3}>
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
                    width: "40rem",
                  }}
                ></TextField>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </>
    )
  );
}
