import * as React from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import WidgetsIcon from "@mui/icons-material/Widgets";
import mainListItems from "../DashboardComponents/listItems";
import Navbar from "../comps/Navbar";
import { createTheme } from "@material-ui/core/styles";
import CaloriesBar from "../CalorieTrackerComponents/caloriesBar";
import MealContainer from "../CalorieTrackerComponents/meals";
import DashboardComponents from "../CalorieTrackerComponents/dashboardComponents";

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

const mdTheme = createTheme();

function CaloriesContent() {
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
              {/* <CssBaseline /> */}
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
                    style={{ color: "#FFFFFF", paddingTop: "10px" }}
                  >
                    CALORIES TRACKER
                  </Typography>
                </div>

                <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <Paper
                        sx={{ pb: 2, display: "flex", flexDirection: "column" }}
                        style={{ backgroundColor: "#202020" }}
                      >
                        <MealContainer />
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
}

export default function Calories() {
  return <CaloriesContent />;
}
