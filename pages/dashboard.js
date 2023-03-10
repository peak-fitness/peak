import Head from "next/head";
import * as React from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import WidgetsIcon from "@mui/icons-material/Widgets";
import Chart from "../DashboardComponents/Chart";
import CalendarView from "../DashboardComponents/CalendarView";
import RecentWorkouts from "../DashboardComponents/WorkoutSessions";
import Achievements from "../DashboardComponents/Achievements";
import Navbar from "../comps/Navbar";
import { createTheme } from "@material-ui/core/styles";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardItems from "../DashboardComponents/dashboardItems";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#03dac5",
    },
    secondary: {
      main: "#E8E8E8",
    },
    contrast: {
      main: "#03DAC5",
    },
  },
});

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    zIndex: 1,
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: "#161616",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    border: "solid #161616 1px",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
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
          <title>Dashboard</title>
        </Head>
        <ThemeProvider theme={darkTheme}>
          <div>
            <Navbar />

            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                px: [0],
                height: "100vh",
              }}
            >
              <Grid>
                <Box sx={{ display: "flex" }}>
                  <Drawer variant="permanent" open={open}>
                    <Toolbar
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        px: [2],
                      }}
                    >
                      <IconButton onClick={toggleDrawer}>
                        <WidgetsIcon />
                      </IconButton>
                    </Toolbar>
                    <Divider />
                    <DashboardItems />
                  </Drawer>

                  <Grid
                    style={{
                      backgroundColor: "#262626",
                      marginTop: "2rem",
                      marginRight: "1.5rem",
                      marginLeft: "1rem",
                      marginBottom: "1rem",
                      borderRadius: "15px",
                    }}
                  >
                    {/* <Toolbar /> */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        paddingTop: "0px",
                        marginTop: "16px",
                        paddingLeft: "1.5rem",
                      }}
                    >
                      <Typography
                        variant="h5"
                        style={{
                          color: "#FFFFFF",
                          fontFamily: "Montserrat, sans serif",
                          fontSize: "35px",
                          fontWeight: 700,
                        }}
                      >
                        Dashboard
                      </Typography>
                    </div>

                    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
                      <Grid container spacing={2}>
                        {/* Chart */}
                        <Grid
                          item
                          xs={12}
                          md={8}
                          lg={9}
                          sm={12}
                          style={{ borderRadius: "13px" }}
                        >
                          <Paper
                            sx={{
                              pt: 0.5,
                              pb: 2,
                              pl: 2,
                              pr: 2,
                              display: "flex",
                              flexDirection: "column",
                              height: 250,
                            }}
                            style={{
                              backgroundColor: "#202020",
                              borderRadius: "13px",
                            }}
                          >
                            <Chart />
                          </Paper>
                        </Grid>
                        {/* Calendar*/}
                        <Grid
                          item
                          xs={12}
                          md={4}
                          lg={3}
                          sm={7}
                          style={{ borderRadius: "13px" }}
                        >
                          <Paper
                            sx={{
                              pt: 0,
                              pb: 0,
                              pl: 0,
                              pr: 0,
                              display: "flex",
                              flexDirection: "column",
                              height: 250,
                            }}
                            style={{
                              backgroundColor: "#202020",
                              borderRadius: "13px",
                            }}
                          >
                            <CalendarView />
                          </Paper>
                        </Grid>
                        {/* Recent Workouts */}
                        <Grid
                          item
                          xs={12}
                          md={8}
                          lg={9}
                          sm={12}
                          style={{ borderRadius: "13px" }}
                        >
                          <Paper
                            sx={{
                              pt: 1,
                              pb: 2,
                              pl: 2,
                              pr: 2,
                              display: "flex",
                              flexDirection: "column",
                            }}
                            style={{
                              backgroundColor: "#202020",
                              borderRadius: "13px",
                            }}
                          >
                            <RecentWorkouts />
                          </Paper>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          md={4}
                          lg={3}
                          sm={7}
                          style={{ borderRadius: "13px" }}
                        >
                          <Paper
                            sx={{
                              pt: 1,
                              pb: 2,
                              pl: 0,
                              pr: 1,
                              height: 250,
                              display: "flex",
                              flexDirection: "row",
                            }}
                            style={{
                              backgroundColor: "#202020",
                              borderRadius: "13px",
                            }}
                          >
                            <Achievements />
                          </Paper>
                        </Grid>
                      </Grid>
                    </Container>
                  </Grid>
                </Box>
              </Grid>
            </Container>
          </div>
        </ThemeProvider>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default function Dashboard() {
  return <DashboardContent />;
}
