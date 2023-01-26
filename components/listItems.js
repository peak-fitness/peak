import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccountCircleRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FitnessCenterRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Workouts" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Groups2RoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Groups" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShowChartRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Statistics" />
    </ListItemButton>
  </React.Fragment>
);
