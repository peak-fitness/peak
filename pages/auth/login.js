import Head from "next/head";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
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

import ResetPasswordModal from "@/LoginComponents/ResetPassword";

export default function Login() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const router = useRouter();
  const session = useSession();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const checkUser = async () => {
      const res = await supabase
        .from("user")
        .select()
        .eq("auth_id", data.user.id);
      if (!res.data[0].first_name || res.data[0].first_name === null) {
        router.push("/auth/signup/info");
      } else {
        router.push("/dashboard");
      }
    };

    if (error) {
      setFailedLogin(true);
      setEmail("");
      setPassword("");
    } else {
      checkUser(session);
    }
  };

  const handleOAuth = async (evt) => {
    evt.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: evt.target.name,
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
        <title>Sign In</title>
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
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
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
                sx={{ p: { color: "#959595" }, textAlign: "center" }}
              >
                {`Don't have an account?`}{" "}
                <Link
                  href="/auth/signup"
                  style={{
                    color: "#ffffff",
                  }}
                >
                  Register here
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
            Welcome back to Peak
          </Typography>
          <Typography
            component="p"
            variant="p"
            sx={{ color: "#959595", textAlign: "center" }}
          >
            Welcome back. We hope you continue to use Peak to achieve your goals
            for this year!
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
              <Grid container spacing={1}>
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
                    value={email}
                    autoComplete="email"
                    onChange={(evt) => {
                      setEmail(evt.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <p
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        margin: "0 0 .3rem 0",
                      }}
                      onClick={() => setResetOpen(true)}
                    >
                      Forgot Password?
                    </p>
                  </Box>
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
                    value={password}
                    autoComplete="password"
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
                Sign into Your Account <East />
              </Button>

              {failedLogin && (
                <p>Incorrect Email or Password. Please try again</p>
              )}
            </Box>
          </Box>{" "}
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
              Sign in with Google
            </Button>
            <Button
              onClick={handleOAuth}
              fullWidth
              name="facebook"
              variant="contained"
              sx={responsiveOAuth2}
            >
              <Facebook sx={{ marginRight: "3rem" }} />
              Sign in with Facebook
            </Button>
          </Box>
          {resetOpen ? <ResetPasswordModal setResetOpen={setResetOpen} /> : ""}
        </Container>
      </Container>
    </>
  );
}
