// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "../comps/Navbar";
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalculateIcon from "@mui/icons-material/Calculate";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const checkUser = async (session) => {
    const res = await supabase
      .from("user")
      .select("auth_id")
      .eq("auth_id", session.user.id);
    if (!res.data[0]) {
      router.push("/auth/username");
    } else {
      router.push("/dashboard");
    }
  };
  if (session) {
    checkUser(session);
  }

  return (
    <div>
      <Navbar />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Container
          sx={{
            margin: "40px",

            padding: "10%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h3" fontWeight="550" margin="20px 0 0 0 ">
                Accountability, Fitness, and Hitting PRs.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" fontWeight="300">
                MVP Statement here maybe. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="contrast"
                sx={{
                  borderRadius: "20px",
                  color: "#161616",
                  textTransform: "unset",
                }}
              >
                Try it out
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="contrast"
                sx={{
                  borderRadius: "20px",
                  color: "#E8E8E8",
                  textTransform: "unset",
                  textDecoration: "underline",
                }}
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Container>

        <Container sx={{ margin: "40px", padding: "10%" }}>
          <Grid container spacing={1} direction="row" align="center">
            <Grid item sm={12} md={6} lg={6}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 15px 10px 130px",
                  width: "9vw",
                  height: "9vw",
                  backgroundColor: "#242424",
                  justifyContent: "center",
                  borderRadius: "15px",
                }}
              >
                <CardContent>
                  <Typography color="#E8E8E8">Accountability Groups</Typography>
                  <GroupIcon color="secondary" fontSize="large" />
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} md={6} lg={6}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 130px 0 15px",
                  width: "9vw",
                  height: "9vw",
                  backgroundColor: "#242424",
                  justifyContent: "center",
                  borderRadius: "15px",
                }}
              >
                <CardContent>
                  <Typography color="#E8E8E8">Calories Tracker</Typography>
                  <CalculateIcon color="secondary" fontSize="large" />
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} md={6} lg={6}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 15px 10px 130px",
                  width: "9vw",
                  height: "9vw",
                  backgroundColor: "#242424",
                  justifyContent: "center",
                  borderRadius: "15px",
                }}
              >
                <CardContent>
                  <Typography color="#E8E8E8">Attendance Tracker</Typography>
                  <CalendarMonthIcon color="secondary" fontSize="large" />
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} md={6} lg={6}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 130px 0 15px",
                  width: "9vw",
                  height: "9vw",
                  backgroundColor: "#242424",
                  justifyContent: "center",
                  borderRadius: "15px",
                }}
              >
                <CardContent>
                  <Typography color="#E8E8E8">Achievements</Typography>
                  <EmojiEventsIcon color="secondary" fontSize="large" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}
