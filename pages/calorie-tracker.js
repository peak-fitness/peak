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
                    Calorie Tracker
                  </Typography>
                </div>

                <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}></Container>
              </Box>
            </Box>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
