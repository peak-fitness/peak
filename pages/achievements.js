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
    checkUser(session);
    return (
      <>
        <Head>
          <title>Achievements</title>
        </Head>
        <Navbar />
        <Container
          sx={{
            display: "flex",
            flexFlow: "column",
            minWidth: "97.5%",
            height: "100vh",
          }}
        >
          <Container
            sx={{
              minWidth: "100%",
              display: "flex",
              flexFlow: "column",
              height: "80%",
              margin: "2rem 0",
              padding: "2rem",
              backgroundColor: "#262626",
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
              ACHIEVEMENTS
            </Typography>
            <Grid
              container
              rowSpacing={3}
              flexDirection="row"
              sx={{
                display: "flex",
                justifyContent: "center",
                overflowX: "hidden",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "15px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#161616",
                  borderRadius: "10px",
                },
                alignItems: "center",
                backgroundColor: "#202020",
                padding: "1rem",
                borderRadius: "10px",
                height: "600px",
              }}
            >
              {trophies.map((trophy, index) => (
                <Grid item key={index} sm={12} md={12} lg={6} xl={6}>
                  <Card
                    sx={{
                      width: "95%",
                      height: "10vh",
                      ml: "1.2rem",
                      mb: "1.2rem",
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
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#A4A4A4" }}
                        >
                          {trophy.completeDate}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Container>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
}
