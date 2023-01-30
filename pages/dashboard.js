import * as React from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";

import {
  mainListItems,
  secondaryListItems,
} from "../DashboardComponents/listItems";
import Chart from "../DashboardComponents/Chart";
import CalendarView from "../DashboardComponents/CalendarView";
import RecentWorkouts from "../DashboardComponents/WorkoutSessions";
import Achievements from "../DashboardComponents/Achievements";
import Navbar from "../comps/Navbar";
import { createTheme } from "@material-ui/core/styles";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
    } else {
      router.push("/dashboard");
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
      <ThemeProvider theme={darkTheme}>
        <div>
          <Navbar />

          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              px: [0],
            }}
          >
            <Grid>
              <Box sx={{ display: "flex" }}>
                <CssBaseline />

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
                      <MenuIcon />
                    </IconButton>
                  </Toolbar>
                  <Divider />
                  <List component="nav">
                    {mainListItems}
                    {/* <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}
                  </List>
                </Drawer>

                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  {/* <Toolbar /> */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: "0px",
                      marginTop: "5px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      style={{ color: "#03dac5", paddingTop: "10px" }}
                    >
                      DASHBOARD
                    </Typography>
                  </div>

                  <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
                    <Grid container spacing={3}>
                      {/* Chart */}
                      <Grid item xs={12} md={7} lg={9}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 240,
                          }}
                          style={{ backgroundColor: "#202020" }}
                        >
                          <Chart />
                        </Paper>
                      </Grid>
                      {/* Calendar*/}
                      <Grid item xs={9} md={5} lg={3}>
                        <Paper
                          sx={{
                            pt: 2,
                            pb: 2,
                            pl: 0,
                            pr: 0,
                            display: "flex",
                            flexDirection: "column",
                            height: 240,
                          }}
                          style={{ backgroundColor: "#202020" }}
                        >
                          <CalendarView />
                        </Paper>
                      </Grid>
                      {/* Recent Orders */}
                      <Grid item xs={12} md={9} lg={9}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                          }}
                          style={{ backgroundColor: "#202020" }}
                        >
                          <RecentWorkouts />
                        </Paper>
                      </Grid>

                      <Grid item xs={7} md={3} lg={3}>
                        <Paper
                          sx={{ p: 1, display: "flex", flexDirection: "row" }}
                          style={{ backgroundColor: "#202020" }}
                        >
                          <Achievements />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Container>
                </Box>
              </Box>
            </Grid>
          </Container>
        </div>
      </ThemeProvider>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default function Dashboard() {
  return <DashboardContent />;
}
