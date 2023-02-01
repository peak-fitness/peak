import Head from "next/head";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../comps/Navbar";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { fontWeight } from "@mui/system";

export default function AchievementsPage() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  const trophies = [
    {
      title: "100 Streak",
      description: "Go to the gym 100 times",
      completeDate: "1/31/2023",
    },
    { title: "PRs", description: "Hit a PR", completeDate: "1/31/2023" },
    {
      title: "50 Streak",
      description: "Go to the gym 50 times",
      completeDate: "11/30/2022",
    },
    {
      title: "10 Streak",
      description: "Go to the gym 10 times",
      completeDate: "10/25/2022",
    },
    {
      title: "Ready to roll",
      description: "Fill out your personal information",
    },
    { title: "How do I look?", description: "Hit your target weight" },
    {
      title: "Are you going to eat that?",
      description: "Hit your calorie target 30 times",
    },
    {
      title: "Have to flex somewhere...",
      description: "Join 3 accountability groups",
    },
  ];

  const checkUser = async () => {
    const res = await supabase
      .from("user")
      .select()
      .eq("auth_id", session.user.id);
    if (!res.data[0]) {
      router.push("/auth/username");
    }
  };

  function Redirect({ to }) {
    useEffect(() => {
      router.push(to);
    }, [to]);
  }

  if (session) {
    console.log(session);
    checkUser(session);
    return (
      <>
        <Head>
          <title>Achievements</title>
        </Head>
        <Navbar />
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexFlow: "column",
            margin: "2rem",
            padding: "2rem",
            backgroundColor: "#262626",
            minHeight: "100vh",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2rem",
            marginBottom: "2rem",
            border: "solid",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{
              margin: 0,
              fontSize: "38px",
              color: "#fafafa",
              fontWeight: 700,
              marginBottom: "2rem",
            }}
          >
            Achievements
          </Typography>
          {/* <Container maxWidth="xl" sx={{ border: "solid" }}> */}
          <Grid
            container
            spacing={4}
            backgroundColor="#202020"
            flexDirection="row"
            borderRadius="10px"
            alignSelf="center"
            justifyContent="space-evenly"
            alignItems="center"
            border="solid blue"
          >
            {trophies.map((trophy, index) => (
              <Grid item key={index} sm={12} md={8} lg={6} xl={6}>
                <Card
                  sx={{
                    width: "95%",
                    height: "100%",
                    backgroundColor: "#242424",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {trophy.completeDate ? (
                        <Box>
                          <EmojiEventsRoundedIcon
                            sx={{
                              color: "#F6C941",
                              fontSize: "4rem",
                              ml: "1rem",
                              mr: "2rem",
                            }}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <EmojiEventsRoundedIcon
                            sx={{
                              color: "silver",
                              fontSize: "4rem",
                              ml: "1rem",
                              mr: "2rem",
                            }}
                          />
                        </Box>
                      )}
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{ color: "#FFFFFF", fontWeight: 700 }}
                        >
                          {trophy.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#FFFFFF" }}
                        >
                          {trophy.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#A4A4A4" }}>
                        {trophy.completeDate}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* </Container> */}
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
}
