import Head from "next/head";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
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
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
  text: {
    primary: "#ffffff",
    secondary: "#aaa",
  },
  background: { default: "#161616" },
});

export default function AchievementsPage() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const [achievements, setAchievements] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchCurrentUserId();
    fetchAchievements();
  }, [currentUserId]);

  const fetchCurrentUserId = async () => {
    if (session) {
      const { data, error } = await supabase
        .from("user")
        .select("id")
        .eq("auth_id", session.user.id)
        .single();
      setCurrentUserId(data.id);
    }
  };

  const fetchAchievements = async () => {
    const { data, error } = await supabase
      .from("userAchievements")
      .select(
        `*, achievements(id, name, requirement), user(first_name, last_name, height, current_weight, target_weight, target_calories, age, gender)`
      )
      .eq("user_id", currentUserId);
    setAchievements(data);
  };

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
        <ThemeProvider theme={darkTheme}>
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
                {achievements
                  ? achievements.map((achievement, index) => (
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
                              {achievement.achieved ? (
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
                                  {achievement.achievements.name}
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  sx={{ color: "#FFFFFF" }}
                                >
                                  {achievement.achievements.requirement}
                                </Typography>
                              </Box>
                            </Box>
                            {/* <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "#A4A4A4" }}
                          >
                            {trophy.completeDate}
                          </Typography>
                        </Box> */}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  : null}
              </Grid>
            </Container>
          </Container>
        </ThemeProvider>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
}
