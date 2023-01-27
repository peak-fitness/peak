import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";

export default function CreateUsername() {
  const supabase = useSupabaseClient();
  const [username, setUsername] = useState("");
  const [failed, setFailed] = useState(false);
  const router = useRouter();
  const session = useSession();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const id = session.user.id;
    const email = session.user.email;

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
      setFailed(false);
      const res = await supabase
        .from("user")
        .insert({
          auth_id: id,
          email: email,
          username: username,
        })
        .select("*");
      if (res.data) {
        router.push("/auth/signup/info");
      }
    } else {
      setFailed(true);
    }
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
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        sx={{
          minHeight: "100vh",
          marginTop: "10rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        maxWidth="md"
      >
        <Typography variant="h5">
          Please enter a username to continue
        </Typography>
        <Box
          sx={{
            marginTop: "2.5rem",
            display: "flex",
            alignItems: "center",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Username"
            sx={{
              backgroundColor: "#242424",
              input: { color: "#959595" },
              label: { color: "#959595" },
            }}
            onChange={(evt) => {
              setUsername(evt.target.value);
            }}
          />
          <Button
            sx={{
              marginLeft: "2rem",
              padding: ".5rem 2rem .5rem 2rem",
              marginRight: "1rem",
            }}
            variant="contained"
            type="submit"
          >
            Save
          </Button>
          {failed && (
            <Typography sx={{ textAlign: "center" }} variant="p">
              Username is already in use
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
}
