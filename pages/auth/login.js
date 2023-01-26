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
} from "@mui/material";

export default function Login() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  const router = useRouter();
  const session = useSession();
  if (session) router.push("/");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setFailedLogin(true);
  };

  const handleOAuth = async (evt) => {
    evt.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) setFailedLogin(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "8rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
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

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            sx={{ mt: 3, mb: 2 }}
          >
            Sign into Your Account
          </Button>
          <Button onClick={handleOAuth} fullWidth variant="contained">
            Sign in with Google
          </Button>
          {failedLogin && <p>Incorrect Email or Password. Please try again</p>}
          <Grid container justifyContent="flex-end">
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
