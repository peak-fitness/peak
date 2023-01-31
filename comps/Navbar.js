import { Block } from "@mui/icons-material";
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
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              DASHBOARD
            </Link>
            <Link
              href="/workouts/myWorkouts"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              MY WORKOUTS
            </Link>
            <Link
              href="/groups"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              MY GROUPS
            </Link>
            <Link
              href="/calorie-tracker"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
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
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              LEARN MORE
            </Link>
            <Link
              href="/about"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
