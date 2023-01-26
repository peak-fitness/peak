import Head from "next/head";
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
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Peak | Home</title>
      </Head>
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
              <Link href="/auth/signup">
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
              </Link>
            </Grid>
            <Grid item>
              <Link href="/learn">
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
              </Link>
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
