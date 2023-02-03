import { Block } from "@mui/icons-material";
import styles from "@/styles/Navbar.module.css";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Avatar,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener,
} from "@mui/material";
import { borderRadius } from "@mui/system";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

const Navbar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const currentRoute = router.pathname;
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleProfile = () => {
    setOpen(false);
    router.push("/profile");
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return session ? (
    <AppBar position="sticky" sx={{ backgroundColor: "#161616" }}>
      <Container maxWidth="xxl">
        {/* <img src="" width="200" /> */}
        <Toolbar disableGutters>
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
          <Box
            sx={{
              flexGrow: 2,
              display: { xs: "flex", sm: "flex", md: "flex", lg: "flex" },
            }}
          >
            <Link
              href="/dashboard"
              className={router.pathname === "/dashboard" ? styles.active : ""}
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
              href="/workouts/myWorkouts"
              className={
                router.pathname === "/workouts/myWorkouts" ? styles.active : ""
              }
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              MY WORKOUTS
            </Link>
            <Link
              href="/social"
              className={router.pathname === "/social" ? styles.active : ""}
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              SOCIAL
            </Link>
            <Link
              href="/calorie-tracker"
              className={
                router.pathname === "/calorie-tracker" ? styles.active : ""
              }
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              CALORIE TRACKER
            </Link>
            <Link
              href="/achievements"
              className={
                router.pathname === "/achievements" ? styles.active : ""
              }
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
            justifyContent="flex-end"
            sx={{ display: { xs: "flex", md: "flex" } }}
          >
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              style={{
                margin: "20px",
              }}
            >
              <Avatar src="/pfp.png" />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={signout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  ) : (
    <AppBar position="sticky" sx={{ backgroundColor: "#161616" }}>
      <Container maxWidth="xxl">
        {/* <img src="" width="200" /> */}
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            sx={{
              display: { xs: "flex", sm: "flex", md: "flex", lg: "flex" },
            }}
          >
            <Link
              href="/"
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
          <Box
            sx={{
              flexGrow: 2,
              display: { xs: "flex", sm: "flex", md: "flex", lg: "flex" },
            }}
          >
            <Link
              href="/learn"
              className={router.pathname === "/learn" ? styles.active : ""}
              style={{
                margin: "20px",
                color: "#E8E8E8",
                backgroundColor: "transparent",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              LEARN MORE
            </Link>
            <Link
              href="/about"
              className={router.pathname === "/about" ? styles.active : ""}
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className={router.pathname === "/contact" ? styles.active : ""}
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              CONTACT
            </Link>
          </Box>

          <Box
            justifyContent="flex"
            sx={{ display: { xs: "flex", md: "flex" } }}
          >
            {" "}
            <Link
              href="/auth/signup"
              style={{
                margin: "20px",
                padding: "10px",
                color: "#E8E8E8",
                textDecoration: "none",
                fontWeight: 500,
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
                fontWeight: 500,
              }}
            >
              SIGN IN
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
