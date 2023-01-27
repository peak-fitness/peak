import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import Container from "@mui/material/Container";
import Title from "./Title";
import { styled, ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  const trophies = [
    { title: "First Session", description: "Awarded for joining" },
    {
      title: "Participation",
      description: "Awarded for participating in 10 sessions",
    },
    {
      title: "Best Progress",
      description: "Awarded for showing the most progress in the week",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container
        className={classes.container}
        align="center"
        justifycontent="center"
      >
        <Title>Trophies</Title>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {trophies.map((trophy, index) => (
            <Grid item key={index}>
              <Box className={classes.trophyContainer}>
                <EmojiEventsRoundedIcon
                  className={classes.trophy}
                  sx={{
                    color: "#F6C941",
                    fontSize: "3rem",
                  }}
                />
                <Typography variant="body2" align="center">
                  {trophy.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
