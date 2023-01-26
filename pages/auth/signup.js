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
} from "@mui/material";

export default function Signup() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const router = useRouter();

  const session = useSession();
  if (session) router.push("/");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const usernames = await supabase.from("user").select("username");

    const checkUsernames = (usernameArr) => {
      for (const name of usernameArr) {
        if (name.username === username) {
          return false;
        }
      }
      return true;
    };

    if (checkUsernames(usernames.data)) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      setSubmitted(true);

      const res = await supabase
        .from("user")
        .insert({
          auth_id: data.user.id,
          email: data.user.email,
          username: username,
        })
        .select("*");

      setUsernameTaken(false);
    } else {
      setUsernameTaken(true);
    }
  };

  // return (
  //   !session && (
  //     <Container
  //       maxWidth="xl"
  //       sx={{ display: "flex", justifyContent: "center", marginTop: "15vh" }}
  //     >
  //       <Box
  //         sx={{
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "center",
  //         }}
  //       >
  //         <FormControl variant="outlined" onSubmit={handleSubmit}>
  //           <Box>
  //             <InputLabel>Username</InputLabel>
  //             <Input
  //               type="username"
  //               onChange={(evt) => {
  //                 setUsername(evt.target.value);
  //               }}
  //             />
  //           </Box>
  //           <Box>
  //             <InputLabel>Email</InputLabel>
  //             <Input
  //               sx={{ backgroundColor: "white" }}
  //               type="email"
  //               onChange={(evt) => {
  //                 setEmail(evt.target.value);
  //               }}
  //             />
  //           </Box>
  //           <Box>
  //             <InputLabel>Password</InputLabel>
  //             <Input
  //               type="password"
  //               onChange={(evt) => {
  //                 setPassword(evt.target.value);
  //               }}
  //             />
  //           </Box>
  //           <button type="submit">Submit</button>
  //           <p>
  //             Already have an account? <Link href="/auth/login">Sign in</Link>
  //           </p>
  //         </FormControl>
  //         {submitted && <p>Please check your email for a verification link!</p>}
  //         {usernameTaken && <p>Username already in use!</p>}
  //       </Box>
  //     </Container>
  //   )
  // );

  return (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
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
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {submitted && <p>Please check your email for a verification link!</p>}
          {usernameTaken && <p>Username already in use!</p>}
          <Grid container justifyContent="flex-end">
            <Grid item xs={12}>
              <Typography
                component="p"
                variant="p"
                sx={{ p: { color: "#959595" }, textAlign: "center" }}
              >
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  style={{
                    color: "#ffffff",
                  }}
                >
                  Sign in
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>

    // </ThemeProvider>
  );
}
