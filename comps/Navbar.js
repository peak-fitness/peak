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
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { createTheme } from "@material-ui/core/styles";
import { styled, ThemeProvider } from "@mui/material/styles";

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

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const [activeLink, setActiveLink] = useState("");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return session ? (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky" sx={{ backgroundColor: "#161616" }}>
        <Container
          maxWidth="xl"
          sx={{
            mt: 1,
            mb: 1,
          }}
        >
          <Toolbar disableGutters>
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/dashboard"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",

                textDecoration: "none",
              }}
              style={{
                color: activeLink === "/dashboard" ? "#03dac5" : "white",
              }}
              onClick={() => handleLinkClick("/dashboard")}
            >
              Peak
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                sx={{ color: "white" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem href="/dashboard">DASHBOARD</MenuItem>
                <MenuItem href="/workouts/myWorkouts">WORKOUTS</MenuItem>
                <MenuItem href="/groups">GROUPS</MenuItem>
                <MenuItem href="/calorie-tracker">CALORIE TRACKER</MenuItem>
                <MenuItem href="/achievements">ACHIEVEMENTS</MenuItem>
              </Menu>
            </Box>

            <Typography
              href="/dashboard"
              variant="h4"
              noWrap
              component="a"
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Peak
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 4 }}
              justifyContent="flex-start"
            >
              <Link
                href="/dashboard"
                onClick={() => handleLinkClick("/dashboard")}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "20px",
                  color: activeLink === "/dashboard" ? "#03dac5" : "#E8E8E8",
                }}
                className={
                  router.pathname === "/dashboard" ? styles.active : ""
                }
              >
                DASHBOARD
              </Link>
              <Link
                href="/workouts/myWorkouts"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "20px",
                  color:
                    activeLink === "/workouts/myWorkouts"
                      ? "#03dac5"
                      : "#E8E8E8",
                }}
                onClick={() => handleLinkClick("/workouts/myWorkouts")}
                className={
                  router.pathname === "/workouts/myWorkouts"
                    ? styles.active
                    : ""
                }
              >
                WORKOUTS
              </Link>
              <Link
                href="/groups"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "20px",
                  color: activeLink === "/groups" ? "#03dac5" : "#E8E8E8",
                }}
                onClick={() => handleLinkClick("/groups")}
                className={router.pathname === "/groups" ? styles.active : ""}
              >
                GROUPS
              </Link>
              <Link
                href="/calorie-tracker"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "20px",
                  color:
                    activeLink === "/calorie-tracker" ? "#03dac5" : "#E8E8E8",
                }}
                onClick={() => handleLinkClick("/calorie-tracker")}
                className={
                  router.pathname === "/calorie-tracker" ? styles.active : ""
                }
              >
                CALORIE TRACKER
              </Link>
              <Link
                href="/achievements"
                style={{
                  color: "#E8E8E8",
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "20px",
                  color: activeLink === "/achievements" ? "#03dac5" : "#E8E8E8",
                }}
                onClick={() => handleLinkClick("/achievements")}
                className={
                  router.pathname === "/achievements" ? styles.active : ""
                }
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
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
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
    </ThemeProvider>
  ) : (
    <AppBar position="sticky" sx={{ backgroundColor: "#161616" }}>
      <Container
        maxWidth="xl"
        sx={{
          mt: 1,
          mb: 1,
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
            style={{
              color: activeLink === "/" ? "#03dac5" : "white",
            }}
            onClick={() => handleLinkClick("/")}
          >
            Peak
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              sx={{ color: "white" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem href="/learn">LEARN MORE</MenuItem>
              <MenuItem href="/about">ABOUT US</MenuItem>
              <MenuItem href="/contact">CONTACT US</MenuItem>
            </Menu>
          </Box>

          <Typography
            href="/"
            variant="h4"
            noWrap
            component="a"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".1rem",
              textDecoration: "none",
              marginLeft: "100px",
            }}
            style={{
              color: activeLink === "/" ? "#03dac5" : "white",
            }}
            onClick={() => handleLinkClick("/")}
            className={router.pathname === "/" ? styles.active : ""}
          >
            Peak
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 4 }}
            justifyContent="flex-start"
          >
            <Link
              href="/learn"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "20px",
                color: activeLink === "/learn" ? "#03dac5" : "#E8E8E8",
              }}
              onClick={() => handleLinkClick("/learn")}
              className={router.pathname === "/learn" ? styles.active : ""}
            >
              LEARN MORE
            </Link>
            <Link
              href="/about"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "20px",
                color: activeLink === "/about" ? "#03dac5" : "#E8E8E8",
              }}
              onClick={() => handleLinkClick("/about")}
              className={router.pathname === "/about" ? styles.active : ""}
            >
              ABOUT US
            </Link>
            <Link
              href="/contact"
              style={{
                color: "#E8E8E8",
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "20px",

                color: activeLink === "/contact" ? "#03dac5" : "#E8E8E8",
              }}
              onClick={() => handleLinkClick("/contact")}
              className={router.pathname === "/contact" ? styles.active : ""}
            >
              CONTACT US
            </Link>
          </Box>
          <Box
            justifyContent="flex-end"
            sx={{ display: { xs: "flex", md: "flex" } }}
          >
            <Link
              href="/auth/signup"
              style={{
                textDecoration: "none",
                fontWeight: 500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "10px",
                color: activeLink === "/auth/signup" ? "#03dac5" : "#E8E8E8",
              }}
              onClick={() => handleLinkClick("/auth/signup")}
              className={
                router.pathname === "/auth/signup" ? styles.active : ""
              }
            >
              SIGN UP
            </Link>
            <Link
              href="/auth/login"
              style={{
                padding: "10px",
                border: "solid",
                borderRadius: "20px",
                borderColor: "#03DAC5",
                textDecoration: "none",
                fontWeight: 500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "10px",
                color: activeLink === "/auth/login" ? "#03dac5" : "#E8E8E8",
              }}
              onClick={() => handleLinkClick("/auth/login")}
              className={router.pathname === "/auth/login" ? styles.active : ""}
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
