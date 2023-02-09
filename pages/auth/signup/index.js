import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";

import { ArrowRightAlt, Google, Facebook, East } from "@mui/icons-material";
import Head from "next/head";

export default function Signup() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const session = useSession();
  if (session) router.push("/");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const usernames = await supabase.from("user").select("username");

    const emails = await supabase.from("user").select("email");

    const checkUsernames = (usernameArr) => {
      for (const name of usernameArr) {
        if (name.username === username) {
          return false;
        }
      }
      return true;
    };

    const checkEmails = (emailArr) => {
      for (const user of emailArr) {
        if (user.email === email) {
          return false;
        }
      }
      return true;
    };
    checkEmails(emails.data);

    const usernameAvailable = checkUsernames(usernames.data);
    const emailAvailable = checkEmails(emails.data);

    if (usernameAvailable && emailAvailable) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        setError(true);
        setSubmitted(false);
      } else {
        const res = await supabase
          .from("user")
          .insert({
            auth_id: data.user.id,
            email: data.user.email,
            username: username,
          })
          .select("*");
        const userId = await supabase
          .from("user")
          .select("id")
          .eq("auth_id", data.user.id);
        const achievements = await supabase.from("achievements").select();
        achievements.data.map(async (achievement) => {
          const { error } = await supabase
            .from("userAchievements")
            .insert({ user_id: userId.data[0].id, a_id: achievement.id })
            .select("*");
        });
        setSubmitted(true);
        setUsernameTaken(false);
        setEmailTaken(false);
        setError(false);
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } else {
      if (!usernameAvailable) {
        setUsernameTaken(true);
        setUsername("");
      } else if (!emailAvailable) {
        setEmailTaken(true);
        setEmail("");
      }
    }
  };

  const handleOAuth = async (evt) => {
    evt.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: evt.target.name,
    });
    const userId = await supabase
      .from("user")
      .select("id")
      .eq("auth_id", data.user.id);
    const achievements = await supabase.from("achievements").select();
    achievements.data.map(async (achievement) => {
      const { error } = await supabase
        .from("userAchievements")
        .insert({ user_id: userId.data[0].id, a_id: achievement.id })
        .select("*");
    });

    if (error) setFailedLogin(true);
  };

  const responsiveContainer = {
    flex: { xs: "100%", sm: "100%", md: "80%", lg: "100%" },
    width: "20rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: { xs: "2rem", sm: "2rem", md: "5rem" },
    maxHeight: { xs: "10rem", sm: "10rem" },
  };

  const responsiveInputContainer = {
    flex: { xs: "100%", sm: "100%", md: "80%", lg: "100%" },
    display: "flex",

    marginTop: { xs: "0rem", sm: "0rem", md: "2rem" },

    flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
    justifyContent: { md: "center", lg: "center" },
    alignItems: {
      xs: "center",
      sm: "center",
      md: "flex-start",
      lg: "flex-start",
    },
  };

  const responsiveInputs = {
    flex: { xs: "100%", sm: "100%", md: "80%", lg: "100%" },
    borderLeft: { sm: "none", md: "1px solid #959595" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "20rem",
    marginLeft: { lg: "6.5rem", md: "6.5rem", sm: "0rem" },
    paddingTop: { xs: "0rem", sm: "0rem", md: "2rem" },
    paddingBottom: { xs: "4rem", sm: "4rem", md: "4rem" },
    gap: "1.5rem",
    maxHeight: "13rem",
  };

  const responsiveOAuth1 = {
    flex: { xs: "100%", sm: "100%", md: "80%", lg: "100%" },
    marginLeft: { lg: "7rem", md: "7rem", sm: "0rem" },
    background:
      "linear-gradient(#161616, #161616) padding-box, linear-gradient(to right,#03dac5, #56ca82, #89b33e, #b59500, #da6b03) border-box",
    border: "2px solid transparent",
    padding: {
      lg: "1rem 7rem 1rem 0rem",
      sm: "1rem 1rem 1rem 0rem",
      md: "1rem 7rem 1rem 0rem",
      xs: ".4rem .4rem .4rem 0rem",
    },
  };

  const responsiveOAuth2 = {
    flex: { xs: "100%", sm: "100%", md: "80%", lg: "100%" },
    marginLeft: {
      lg: "7rem",
      md: "7rem",
      sm: "0rem",
    },
    background:
      "linear-gradient(#161616, #161616) padding-box, linear-gradient(to right,#da6b03, #b59500, #89b33e, #56ca82, #03dac5) border-box",
    border: "2px solid transparent",
    padding: {
      lg: "1rem 7rem 1rem 0rem",
      md: "1rem 7rem 1rem 0rem",
      sm: "1rem 1rem 1rem 0rem",
      xs: ".4rem .4rem .4rem 0rem",
    },
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <AppBar position="sticky" sx={{ backgroundColor: "#161616" }}>
        <Container
          maxWidth="xl"
          sx={{
            mt: 1,
            mb: 1,
          }}
        >
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "white",
              }}
              style={{
                textDecoration: "none",
                letterSpacing: ".3rem",
              }}
            >
              Peak
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "0px 0 0px 0px",
                padding: "10px 0 10px 10px",
              }}
            >
              <Typography
                component="p"
                variant="p"
                sx={{
                  p: { color: "#959595" },
                  textAlign: "center",
                }}
              >
                {`Already have an account?`}{" "}
                <Link
                  href="/auth/login"
                  style={{
                    color: "#ffffff",
                  }}
                >
                  {" "}
                  Sign in
                </Link>
              </Typography>
              <ArrowRightAlt />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box sx={responsiveContainer}>
          <Typography component="h1" variant="h5">
            Create Your Account
          </Typography>

          <Typography
            component="p"
            variant="p"
            sx={{ color: "#959595", textAlign: "center" }}
          >
            Join millions of users utilizing Peak to keep track of your personal
            fitness goals!
          </Typography>
        </Box>

        <Container component="main" maxWidth="md" sx={responsiveInputContainer}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 3, width: "20rem" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    sx={{
                      backgroundColor: "#242424",
                      input: { color: "#959595" },
                      label: { color: "#959595" },
                    }}
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(evt) => {
                      setUsername(evt.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{
                      backgroundColor: "#242424",
                      input: { color: "#959595" },
                      label: { color: "#959595" },
                    }}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(evt) => {
                      setEmail(evt.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{
                      backgroundColor: "#242424",
                      input: { color: "#959595" },
                      label: { color: "#959595" },
                    }}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(evt) => {
                      setPassword(evt.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                  mb: 2,
                  padding: "1rem 1rem 1rem 1rem",
                  color: "#161616",
                  background:
                    "linear-gradient(90deg, #03dac5, #56ca82, #89b33e, #b59500, #da6b03)",
                }}
              >
                Create Your Account <East />
              </Button>
              {submitted && (
                <p>Please check your email for a verification link!</p>
              )}
              {usernameTaken && <p>Username already in use!</p>}
              {emailTaken && <p>Email already in use!</p>}
              {error && <p>Password must be at least 6 characters long</p>}
            </Box>
          </Box>
          <Box sx={responsiveInputs}>
            <Button
              onClick={handleOAuth}
              fullWidth
              name="google"
              variant="contained"
              sx={responsiveOAuth1}
            >
              <Google
                sx={{
                  marginRight: "4.2rem",
                }}
              />{" "}
              Sign up with Google
            </Button>
            <Button
              onClick={handleOAuth}
              fullWidth
              name="facebook"
              variant="contained"
              sx={responsiveOAuth2}
            >
              <Facebook sx={{ marginRight: "3rem" }} />
              Sign up with Facebook
            </Button>
          </Box>
        </Container>
      </Container>
    </>
  );
}
