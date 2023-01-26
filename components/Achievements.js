import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import Container from "@mui/material/Container";
import Title from "./Title";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    padding: theme.spacing(0),
  },
  trophy: {
    color: "#F6C941",
    fontSize: "2rem",
  },
}));

const theme = createTheme({
  palette: {
    type: "dark",
    primary: { main: "#03DAC5" },
    text: "white",
  },
  background: { default: "#161616" },
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
      <Container className={classes.container}>
        <Title>Trophies</Title>
        <Grid container spacing={2}>
          {trophies.map((trophy, index) => (
            <Grid item key={index} align="center">
              <Box display="flex" flexDirection="column" alignItems="center">
                <EmojiEventsRoundedIcon className={classes.trophy} />
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
