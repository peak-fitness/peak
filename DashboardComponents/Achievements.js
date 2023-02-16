import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import Container from "@mui/material/Container";
import Title from "./Title";
import { styled, ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@material-ui/core/styles";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@mui/material";
import Link from "next/link";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: { main: "#03DAC5" },
  },
});

export default function Achievements() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const [achievements, setAchievements] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchCurrentUserId();
    fetchUserAchievements();
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

  const fetchUserAchievements = async () => {
    if (currentUserId) {
      const { data, error } = await supabase
        .from("userAchievements")
        .select(
          `*, achievements(id, name, requirement), user(first_name, last_name, height, current_weight, target_weight, target_calories, age, gender)`
        )
        .eq("user_id", currentUserId)
        .eq("achieved", true);
      setAchievements(data);
    }
  };

  const checkUser = async () => {
    const res = await supabase
      .from("user")
      .select()
      .eq("auth_id", session.user.id);
    if (!res.data) {
      router.push("/auth/username");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifycontent: "center",
          position: "relative", // add position relative to container
        }}
      >
        <Title>Achievements</Title>
        <Grid
          container
          spacing={0.5}
          style={{
            marginTop: "1rem",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {achievements.length !== 0 ? (
            <Grid container spacing={2}>
              {achievements.slice(0, 4).map((achievement, index) => (
                <Grid item key={index} xs={6}>
                  {achievement.achieved ? (
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        marginRight: "1px",
                      }}
                    >
                      <EmojiEventsRoundedIcon
                        style={{
                          color: "#F6C941",
                          fontSize: "3rem",
                          alignItems: "center",
                        }}
                      />
                      <Typography
                        variant="subtitle2"
                        style={{
                          textAlign: "center",
                          whiteSpace: "nowrap", // add whiteSpace nowrap
                          overflow: "hidden", // hide overflowing text
                          textOverflow: "ellipsis", // add ellipses

                          // maxWidth: "80px", // set the maximum width of the achievement name
                        }}
                      >
                        {achievement.achievements.name}
                      </Typography>
                    </Box>
                  ) : null}
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: "40px 20px 20px 20px",
              }}
            >
              <EmojiEventsRoundedIcon
                style={{
                  color: "silver",
                  fontSize: "3rem",
                }}
              />
              <Typography
                variant="body2"
                align="center"
                style={{ marginLeft: "10px" }}
              >
                No achievements reached yet! 😔
              </Typography>
            </Box>
          )}
        </Grid>
        <Link
          style={{
            color: "#03DAC5",
            textDecoration: "underline",
            position: "absolute", // add position absolute to link
            bottom: 0, // position at the bottom
            paddingBottom: "10px", // add some padding
          }}
          href="/achievements"
        >
          View all achievements
        </Link>
      </Container>
    </ThemeProvider>
  );
}
