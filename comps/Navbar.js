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
import { useEffect, useState, useRef } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { createTheme } from "@material-ui/core/styles";
import { styled, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";

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
  const currentRoute = router.pathname;
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [pfp, setPfp] = useState(null);

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

  const handleAccount = () => {
    setOpen(false);
    router.push("/account");
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

  const getPfp = async () => {
    if (!session) {
      return;
    }
    const { data, error } = await supabase
      .from("user")
      .select("avatar_url")
      .eq("auth_id", session.user.id)
      .single();
    setPfp(data.avatar_url);
  };

  useEffect(() => {
    getPfp();
  }, [session]);

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
                display: { xs: "none", md: "flex" },
              }}
              style={{
                textDecoration: "none",
                letterSpacing: ".3rem",
                fontWeight: 550,
                mr: 2,
                color: "white",
              }}
              onClick={() => handleLinkClick("/dashboard")}
            >
              Peak
            </Typography>
            <Box
              marginLeft="10px"
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              <Link href="/dashboard">
                <Image src="/logo.png" alt="" width={50} height={50} />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                sx={{ color: "white", ml: -1 }}
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
                <MenuItem
                  href="/dashboard"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  DASHBOARD
                </MenuItem>
                <MenuItem
                  href="/workouts/myWorkouts"
                  onClick={() =>
                    (window.location.href = "/workouts/myWorkouts")
                  }
                >
                  WORKOUTS
                </MenuItem>
                <MenuItem
                  href="/social"
                  onClick={() => (window.location.href = "/social")}
                >
                  SOCIAL
                </MenuItem>
                <MenuItem
                  href="/calorie-tracker"
                  onClick={() => (window.location.href = "/calorie-tracker")}
                >
                  CALORIE TRACKER
                </MenuItem>
                <MenuItem
                  href="/achievements"
                  onClick={() => (window.location.href = "/achievements")}
                >
                  ACHIEVEMENTS
                </MenuItem>
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
              }}
              style={{
                textDecoration: "none",
                letterSpacing: ".3rem",
                fontWeight: 550,
                mr: 2,
                color: "white",
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
                href="/social"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "20px",
                  color: activeLink === "/social" ? "#03dac5" : "#E8E8E8",
                }}
                onClick={() => handleLinkClick("/social")}
                className={router.pathname === "/social" ? styles.active : ""}
              >
                SOCIAL
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
                <Avatar
                  src={`https://cfbogjupbnvkonljmcuq.supabase.co/storage/v1/object/public/profile-pics/${pfp}`}
                />
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
                          <MenuItem onClick={handleAccount}>Account</MenuItem>
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
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
              }}
              style={{
                mr: 2,
                textDecoration: "none",
                letterSpacing: ".3rem",
                fontWeight: 550,
                color: "white",
              }}
              onClick={() => handleLinkClick("/")}
            >
              Peak
            </Typography>
            <Box
              marginLeft="10px"
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              <Link href="/">
                <Image src="/logo.png" alt="" width={50} height={50} />
              </Link>
            </Box>
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
                <MenuItem
                  href="/learn"
                  onClick={() => (window.location.href = "/learn")}
                >
                  LEARN MORE
                </MenuItem>
                <MenuItem
                  href="/about"
                  onClick={() => (window.location.href = "/about")}
                >
                  ABOUT US
                </MenuItem>
                <MenuItem
                  href="/contact"
                  onClick={() => (window.location.href = "/contact")}
                >
                  CONTACT US
                </MenuItem>
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
              }}
              style={{
                textDecoration: "none",
                letterSpacing: ".3rem",
                fontWeight: 700,
                color: "white",
                mr: 2,
              }}
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
                className={
                  router.pathname === "/auth/login" ? styles.active : ""
                }
              >
                SIGN IN
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
