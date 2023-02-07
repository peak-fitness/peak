import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { Grid, Avatar, Typography } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import Navbar from "../comps/Navbar";
import { Box, Button } from "@mui/material";

const DashboardItems = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("user")
        .select(`username, first_name, last_name, height, current_weight`)
        .eq("auth_id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data && session) {
        setUsername(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setWeight(data.current_weight);
        setHeight(data.height);
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  return session ? (
    <>
      <Container
        style={{
          paddingTop: "8px",
          paddingBottom: "8px",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
      >
        <div>
          <React.Fragment>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <ListItemButton
                onClick={() => (window.location.href = "/profile")}
              >
                <ListItemIcon>
                  <Avatar src="/pfp.png" />
                </ListItemIcon>
                <div>
                  <Typography variant="body2">
                    {firstName || `First Name`} {lastName || `Last Name`}
                  </Typography>
                  <div style={{ width: "100%" }}>
                    <Divider color="5A5A5A" orientation="horizontal" flexItem />
                  </div>

                  <Typography variant="caption">
                    {height ? `Height: ${height} in` : `Height: `}
                  </Typography>
                  <br />
                  <Typography variant="caption">
                    {weight ? `Weight: ${weight} lbs` : `Weight: `}
                  </Typography>
                </div>
              </ListItemButton>

              <ListItemButton
                onClick={() => (window.location.href = "/dashboard")}
              >
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

              <ListItemButton
                onClick={() => (window.location.href = "/social")}
              >
                <ListItemIcon>
                  <Groups2RoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Social" />
              </ListItemButton>

              <ListItemButton
                onClick={() => (window.location.href = "/calorie-tracker")}
              >
                <ListItemIcon>
                  <ShowChartRoundedIcon />
                </ListItemIcon>

                <ListItemText primary="Calorie Tracker" />
              </ListItemButton>

              <ListItemButton
                onClick={() => (window.location.href = "/achievements")}
              >
                <ListItemIcon>
                  <EmojiEventsRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Achievements" />
              </ListItemButton>
            </Grid>
          </React.Fragment>
        </div>
      </Container>
    </>
  ) : (
    <>
      <Container
        style={{
          paddingTop: "8px",
          paddingBottom: "8px",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
      >
        <div>
          <React.Fragment>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <ListItemButton
                onClick={() => (window.location.href = "/profile")}
              >
                <ListItemIcon>
                  <Avatar src="/pfp.png" />
                </ListItemIcon>
                <div>
                  <Typography variant="body2">
                    {firstName || `Spongebob`} {lastName || `SquarePants`}
                  </Typography>
                  <div style={{ width: "100%" }}>
                    <Divider color="5A5A5A" orientation="horizontal" flexItem />
                  </div>

                  <Typography variant="caption">
                    {height ? `Height: ${height} in` : `Height: 7 in`}
                  </Typography>
                  <br />
                  <Typography variant="caption">
                    {weight ? `Weight: ${weight} lbs` : `Weight: 1 lbs`}
                  </Typography>
                </div>
              </ListItemButton>

              <ListItemButton
                onClick={() => (window.location.href = "/dashboard")}
              >
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

              <ListItemButton
                onClick={() => (window.location.href = "/groups")}
              >
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

              <ListItemButton
                onClick={() => (window.location.href = "/achievements")}
              >
                <ListItemIcon>
                  <EmojiEventsRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Achievements" />
              </ListItemButton>
            </Grid>
          </React.Fragment>
        </div>
      </Container>
    </>
  );
};

export default DashboardItems;
