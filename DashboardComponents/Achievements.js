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
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(0),
  },
  trophy: {
    color: "#F6C941",
    fontSize: "3rem",
    alignItems: "center",
  },
  trophyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
}));

const theme = createTheme({
  palette: {
    type: "dark",
    primary: { main: "#03DAC5" },
  },
});

export default function Achievements() {
  const classes = useStyles();

  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const [achievements, setAchievements] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchCurrentUserId();
    fetchAllAchievements();
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

  const fetchAllAchievements = async () => {
    const { data, error } = await supabase
      .from("userAchievements")
      .select(
        `*, achievements(id, name, requirement), user(first_name, last_name, height, current_weight, target_weight, target_calories, age, gender)`
      )
      .order("achieved", { ascending: false })
      .eq("user_id", currentUserId);
    setAchievements(data);
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
        className={classes.container}
        align="center"
        justifycontent="center"
      >
        <Title>Achievements</Title>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {achievements && achievements.achieved ? (
            achievements.map((achievement, index) => (
              <Grid item key={index}>
                {achievement.achieved ? (
                  <Box className={classes.trophyContainer}>
                    <EmojiEventsRoundedIcon
                      className={classes.trophy}
                      sx={{
                        color: "#F6C941",
                        fontSize: "3rem",
                      }}
                    />
                  </Box>
                ) : null}
              </Grid>
            ))
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
            paddingTop: "35px",
            textDecoration: "underline",
          }}
          href="/achievements"
        >
          View all achievements
        </Link>
      </Container>
    </ThemeProvider>
  );
}
