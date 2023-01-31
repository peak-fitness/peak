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

export default function Login() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
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

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
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
              sx={{ mt: 3, width: "20rem", marginBottom: "4.5rem" }}
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
          <Box
            sx={{
              borderLeft: "1px solid #959595",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "7rem",
              paddingTop: "4rem",
              gap: "1.5rem",
            }}
          >
            <Button
              onClick={handleOAuth}
              fullWidth
              name="google"
              variant="contained"
              sx={{
                marginLeft: "7rem",
                background:
                  "linear-gradient(#161616, #161616) padding-box, linear-gradient(to right,#03dac5, #56ca82, #89b33e, #b59500, #da6b03) border-box",
                border: "2px solid transparent",
                padding: "1rem 7rem 1rem 0rem",
              }}
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
              sx={{
                marginLeft: "7rem",
                background:
                  "linear-gradient(#161616, #161616) padding-box, linear-gradient(to right,#da6b03, #b59500, #89b33e, #56ca82, #03dac5) border-box",
                border: "2px solid transparent",
                padding: "1rem 7rem 1rem 0rem",
              }}
            >
              <Facebook sx={{ marginRight: "3rem" }} />
              Sign in with Facebook
            </Button>
          </Box>
        </Container>
      </Container>
    </>
  );
}
