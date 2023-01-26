import { Block } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography, Container } from "@mui/material";
import { borderRadius } from "@mui/system";
import Link from "next/link";

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "primary" }}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          {/* <img src="" width="200" /> */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 1,
              display: { xs: "flex", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#E8E8E8",
              textDecoration: "none",
              margin: "15px",
              fontFamily: "Montserrat",
            }}
          >
            {"Peak"}
          </Typography>

          <Box sx={{ flexGrow: 2, display: { xs: "flex", md: "flex" } }}>
            <Link
              href="/hello"
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
