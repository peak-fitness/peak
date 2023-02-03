import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { Grid, Avatar, Typography } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import { useRouter } from "next/router";

export const mainListItems = (
  <React.Fragment>
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <ListItemButton onClick={() => (window.location.href = "/profile")}>
        <ListItemIcon>
          <Avatar src="/pfp.png" />
        </ListItemIcon>
        <div>
          <Typography variant="h6">SpongeBob</Typography>
          <div style={{ width: "100%" }}>
            <Divider color="5A5A5A" orientation="horizontal" flexItem />
          </div>

          <Typography variant="caption">{`Height: 2'6"`}</Typography>
          <br />
          <Typography variant="caption">Weight: 1lbs</Typography>
        </div>
      </ListItemButton>

      <ListItemButton onClick={() => (window.location.href = "/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>

        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton
        onClick={() => (window.location.href = "/workouts/myWorkouts")}
      >
        <ListItemIcon>
          <FitnessCenterRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Workouts" />
      </ListItemButton>

      <ListItemButton onClick={() => (window.location.href = "/groups")}>
        <ListItemIcon>
          <Groups2RoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Groups" />
      </ListItemButton>

      <ListItemButton
        onClick={() => (window.location.href = "/calorie-tracker")}
      >
        <ListItemIcon>
          <ShowChartRoundedIcon />
        </ListItemIcon>

        <ListItemText primary="Calorie Tracker" />
      </ListItemButton>

      <ListItemButton onClick={() => (window.location.href = "/achievements")}>
        <ListItemIcon>
          <EmojiEventsRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Achievements" />
      </ListItemButton>
    </Grid>
  </React.Fragment>
);
