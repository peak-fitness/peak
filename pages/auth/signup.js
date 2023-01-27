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
      console.log(data);
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

        setSubmitted(true);
        setUsernameTaken(false);
        setEmailTaken(false);
        setError(false);
      }
    } else {
      if (!usernameAvailable) {
        setUsernameTaken(true);
      } else if (!emailAvailable) {
        setEmailTaken(true);
      }
    }
  };

  const handleOAuth = async (evt) => {
    evt.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: evt.target.name,
    });

    if (error) setFailedLogin(true);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#161616" }}>
        <Container maxWidth="xxl">
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
                mr: 1,
                display: { xs: "flex", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "#E8E8E8",
                textDecoration: "none",
                margin: "15px",
                fontFamily: "Montserrat",
              }}
            >
              {"Peak"}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            width: "20rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5rem",
          }}
        >
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

        <Container
          component="main"
          maxWidth="md"
          sx={{ display: "flex", marginTop: "2rem" }}
        >
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
          <Box
            sx={{
              marginLeft: "7rem",
              borderLeft: "1px solid #959595",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              paddingTop: "4rem",
            }}
          >
            <Button
              onClick={handleOAuth}
              fullWidth
              name="google"
              variant="contained"
              sx={{
                marginLeft: "7rem",
                padding: "1rem 7rem 1rem 0rem",
              }}
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
              sx={{
                marginLeft: "7rem",

                padding: "1rem 7rem 1rem 0rem",
              }}
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
