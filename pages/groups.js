import styles from "@/styles/Groups.module.css";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  Icon,
} from "@mui/material";

import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";

export default function Groups() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#161616" }}>
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            {/* <img src="" width="200" /> */}
            <Typography
              variant="h4"
              noWrap
              sx={{
                display: { xs: "flex", sm: "flex", md: "flex", lg: "flex" },
              }}
            >
              <Link
                href="/dashboard"
                style={{
                  color: "#E8E8E8",
                  textDecoration: "none",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  margin: "15px",
                }}
              >
                Peak
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 2, display: { xs: "flex", md: "flex" } }}>
              <Link
                href="/dashboard"
                style={{
                  margin: "20px",
                  color: "#E8E8E8",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                DASHBOARD
              </Link>
              <Link
                href="/workouts"
                style={{
                  margin: "20px",
                  color: "#E8E8E8",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                WORKOUTS
              </Link>
              <Link
                href="/groups"
                style={{
                  margin: "20px",
                  color: "#E8E8E8",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                GROUPS
              </Link>
              <Link
                href="/calorie-tracker"
                style={{
                  margin: "20px",
                  color: "#03DAC5",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                CALORIE TRACKER
              </Link>
              <Link
                href="/achievements"
                style={{
                  margin: "20px",
                  color: "#E8E8E8",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                ACHIEVEMENTS
              </Link>
            </Box>
            <Box
              justifyContent="flex"
              sx={{ display: { xs: "flex", md: "flex" } }}
            >
              {session ? (
                <Button
                  variant="contained"
                  onClick={signout}
                  style={{
                    margin: "20px",
                    padding: "10px",
                    color: "#E8E8E8",
                    textDecoration: "none",
                  }}
                >
                  SIGN OUT
                </Button>
              ) : (
                <>
                  {" "}
                  <Link
                    href="/auth/signup"
                    style={{
                      margin: "20px",
                      padding: "10px",
                      color: "#E8E8E8",
                      textDecoration: "none",
                    }}
                  >
                    SIGN UP
                  </Link>
                  <Link
                    href="/auth/login"
                    style={{
                      margin: "20px",
                      padding: "10px",
                      border: "solid",
                      borderRadius: "20px",
                      borderColor: "#03DAC5",
                      textAlign: "center",
                      display: "block",
                      color: "#E8E8E8",
                      textDecoration: "none",
                    }}
                  >
                    SIGN IN
                  </Link>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={styles.container}>
        <div className={styles.groupContainer}>
          <p className={styles.header}>GROUPS</p>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.filler}>Filler</div>
              <div className={styles.filler}>Filler</div>
              <div className={styles.filler}>Filler</div>
            </div>
            <div className={styles.groupsContainer}>
              <div className={styles.groups}>
                {/* map over all groups */}
                {/* CREATE GROUP */}
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AddCircleOutlinedIcon
                      sx={{ color: "#262626", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Create Group</p>
                  <p className={styles.members}></p>
                </a>
                {/* GROUP 1 */}
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#843732", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>The Boys</p>
                  <p className={styles.members}>8 members</p>
                </a>
                {/* GROUP 2 */}
                <a href="/groups/:id" className={styles.group}>
                  <div className={styles.notification}>
                    <IconButton aria-label="group-icon">
                      <CircleIcon
                        sx={{ color: "#03DAC5", height: "15px", width: "15px" }}
                      />
                    </IconButton>
                  </div>
                  <div className={styles.groupContent}>
                    <IconButton aria-label="group-icon">
                      <AccountCircleIcon
                        sx={{ color: "#348432", height: "80px", width: "80px" }}
                      />
                    </IconButton>
                    <p className={styles.groupName}>Fitness Club</p>
                    <p className={styles.members}>120 members</p>
                  </div>
                </a>
                {/* GROUP 3 */}
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
                {/* GROUP 3 */}
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}