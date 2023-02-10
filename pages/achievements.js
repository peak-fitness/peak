import Head from "next/head";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Navbar from "../comps/Navbar";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { set } from "date-fns";
import { SecurityUpdate } from "@mui/icons-material";

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
  let { isLoading, session, error } = useSessionContext();
  const supabase = useSupabaseClient();
  const [achievements, setAchievements] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchCurrentUserId();
    fetchAllAchievements();
    getProfile();
  }, [currentUserId]);

  useEffect(() => {
    updateFriendsAchievement();
  }, [friends]);

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

  const fetchAllAchievements = async () => {
    if (currentUserId) {
      const { data, error } = await supabase
        .from("userAchievements")
        .select(
          `*, achievements(id, name, requirement), user(first_name, last_name, height, current_weight, target_weight, target_calories, age, gender)`
        )
        .order("achieved", { ascending: false })
        .eq("user_id", currentUserId);
      setAchievements(data);
    }
  };

  const getProfile = async () => {
    if (session !== null) {
      const user = await supabase
        .from("user")
        .select("*, friends!friends_addressee_id_fkey(*)")
        .eq("auth_id", session.user.id)
        .eq("friends.status_code", "Requested")
        .single();
      setUser(user.data);

      const friendspt1 = await supabase
        .from("friends")
        .select("id, addressee_id, addressee_username")
        .eq("requester_id", user.data.id)
        .eq("status_code", "Accepted");

      const friendspt2 = await supabase
        .from("friends")
        .select("id, requester_id, requester_username")
        .eq("addressee_id", user.data.id)
        .eq("status_code", "Accepted");
      setFriends([...friendspt1.data, ...friendspt2.data]);
    } else return;
  };

  const updateFriendsAchievement = async () => {
    if (Object.keys(user).length !== 0) {
      if (friends.length >= 3) {
        const { error } = await supabase
          .from("userAchievements")
          .update({ achieved: true })
          .eq("user_id", user.id)
          .eq("a_id", 3);
      } else {
        const { error } = await supabase
          .from("userAchievements")
          .update({ achieved: false })
          .eq("user_id", user.id)
          .eq("a_id", 3);
      }
    }
    fetchAllAchievements();
  };

  return session ? (
    <>
      <Head>
        <title>Achievements</title>
      </Head>
      {isLoading ? (
        ""
      ) : (
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
                                    sx={{ ml: "1rem" }}
                                    style={{
                                      color: "#F6C941",
                                      // ml: "3rem",
                                      // mr: "3rem",
                                      fontSize: "4rem",
                                    }}
                                  />
                                </Box>
                              ) : (
                                <Box>
                                  <EmojiEventsRoundedIcon
                                    sx={{ ml: "1rem" }}
                                    style={{
                                      color: "silver",
                                      // ml: "3rem",
                                      // mr: "3rem",
                                      fontSize: "4rem",
                                    }}
                                  />
                                </Box>
                              )}
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    color: "#FFFFFF",
                                    fontWeight: 700,
                                    ml: "2rem",
                                  }}
                                >
                                  {achievement.achievements.name}
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  sx={{ color: "#FFFFFF", ml: "2rem" }}
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
      )}
    </>
  ) : (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
      >
        <Box
          sx={{
            width: "80rem",
            height: "20rem",
            marginTop: "15vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#242424",
            borderRadius: "8px",
            boxShadow: "0px 10px 10px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#E8E8E8", textAlign: "center" }}
          >
            You need an account to access this page
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <Link
              href="auth/login"
              style={{
                padding: "10px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(#161616, #161616) padding-box, linear-gradient(to right,#da6b03, #b59500, #89b33e, #56ca82, #03dac5) border-box",
                  border: "2px solid transparent",
                  padding: "1rem 1rem 1rem 1rem",
                }}
              >
                Sign Into Your Account
              </Button>
            </Link>
            <Link
              href="auth/signup"
              style={{
                padding: "10px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(#161616, #161616) padding-box, linear-gradient(to right,#da6b03, #b59500, #89b33e, #56ca82, #03dac5) border-box",
                  border: "2px solid transparent",
                  padding: "1rem 1rem 1rem 1rem",
                }}
              >
                Create A New Account
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
