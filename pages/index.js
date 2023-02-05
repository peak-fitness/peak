import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Navbar from "../comps/Navbar";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalculateIcon from "@mui/icons-material/Calculate";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  const checkUser = async () => {
    const res = await supabase
      .from("user")
      .select()
      .eq("auth_id", session.user.id);
    if (!res.data[0]) {
      router.push("/auth/username");
    } else {
      router.push("/dashboard");
    }
  };

  if (session) {
    checkUser(session);
  } else {
    return (
      <div>
        <Head>
          <title>Peak | Home</title>
        </Head>
        <Navbar />
        <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 8,
              pb: 5,
              pl: 3,
              pr: 3,
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <Grid container rowSpacing={1}>
                <Grid item xs={3} sm={12} md={12} lg={12}>
                  <Typography variant="h3" fontWeight="520" margin="0 0 0 0 ">
                    Accountability, Fitness, and Hitting PRs.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant="h6" fontWeight="300">
                    Welcome to Peak, where we're passionate about helping you
                    reach your fitness goals and lead a healthy lifestyle.
                    <br />
                    <br />
                    Our platform offers an attendance tracker, workout journal,
                    calorie tracker, accountability groups, and challenge
                    system, making it easy to stay on track and motivated. Keep
                    track of your gym visits, visualize your progress, input
                    custom meals, connect with friends, and celebrate your
                    achievements.
                    <br />
                    <br />
                    Join us today and start your fitness journey!
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
            </Grid>
            <Grid item lg={5} md={5} sm={12}>
              <Grid container rowSpacing={3}>
                <Grid
                  item
                  xs
                  sm
                  md={6}
                  lg={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "12em",
                      height: "12em",
                      backgroundColor: "#242424",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingRight: "0.5em",
                      borderRadius: "15px",
                    }}
                  >
                    <CardContent align="center" justifycontent="center">
                      <Typography color="#E8E8E8">
                        Accountability Groups
                      </Typography>
                      <GroupIcon
                        style={{
                          height: "60px",
                          width: "60px",
                          color: "#C724B1",
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  xs
                  sm
                  md={6}
                  lg={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",

                      width: "12em",
                      height: "12em",
                      backgroundColor: "#242424",
                      justifyContent: "center",
                      borderRadius: "15px",
                    }}
                  >
                    <CardContent align="center" justifycontent="center">
                      <Typography color="#E8E8E8">Calories Tracker</Typography>
                      <CalculateIcon
                        style={{
                          height: "60px",
                          width: "60px",
                          color: "#44D62C",
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  xs
                  sm
                  md={6}
                  lg={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",

                      width: "12em",
                      height: "12em",
                      backgroundColor: "#242424",
                      justifyContent: "center",
                      borderRadius: "15px",
                    }}
                  >
                    <CardContent align="center" justifycontent="center">
                      <Typography color="#E8E8E8">
                        Attendance Tracker
                      </Typography>
                      <CalendarMonthIcon
                        style={{
                          height: "60px",
                          width: "60px",
                          color: "#D22730",
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  xs
                  sm
                  md={6}
                  lg={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",

                      width: "12em",
                      height: "12em",
                      backgroundColor: "#242424",
                      justifyContent: "center",
                      borderRadius: "15px",
                    }}
                  >
                    <CardContent align="center" justifycontent="center">
                      <Typography color="#E8E8E8">Achievements</Typography>
                      <EmojiEventsIcon
                        style={{
                          height: "60px",
                          width: "60px",
                          color: "#FFAD00",
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
