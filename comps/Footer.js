// import * as React from "react";
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Link,
  Toolbar,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

// const Copyright = () => {
//   return (
//     <Typography variant="body2" color="#434343" align="center">
//       {"Copyright @ 2023 Peak. All rights reserved. "}
//     </Typography>
//   );
// };

const Footer = () => {
  return (
    <Box
      style={{ position: "fixed", bottom: 0, width: "100%" }}
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 0.5,
        px: 0.5,
        mt: "auto",
        backgroundColor: "#161616",
      }}
    >
      <CssBaseline />
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 1,
              display: {
                xs: "flex",
                md: "flex",
              },
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#E8E8E8",
              textDecoration: "none",
              margin: "0 15px 0 15px",

              //   margin: "0 15px 0 15px",
              border: "solid",
              fontFamily: "Montserrat",
              //   padding: "0 20px 0 0",
            }}
          >
            {"Peak"}
          </Typography>
          <Box
            sx={{
              justifyContent: "center",
              flexGrow: 2,
              border: "solid",
              display: {
                xs: "flex",
                md: "flex",
              },
            }}
          >
            <Link
              href="/learnmore"
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
              ABOUT US
            </Link>
            <Link
              href="/contact"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              CONTACT US
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "flex" },
              border: "solid",
              margin: "0 15px 0 15px",
              justifyContent: "center",
            }}
          >
            <IconButton aria-label="instagram">
              <Link
                color="inherit"
                //   href="https://github.com/capstone-peak"
                target="_blank"
              >
                <InstagramIcon sx={{ color: "#E8E8E8" }} />
              </Link>
            </IconButton>
            <IconButton aria-label="facebook">
              <Link
                color="inherit"
                //   href="https://github.com/capstone-peak"
                target="_blank"
              >
                <FacebookIcon sx={{ color: "#E8E8E8" }} />
              </Link>
            </IconButton>
            <IconButton aria-label="twitter">
              <Link
                color="inherit"
                //   href="https://github.com/capstone-peak"
                target="_blank"
              >
                <TwitterIcon sx={{ color: "#E8E8E8" }} />
              </Link>
            </IconButton>
            <IconButton aria-label="github">
              <Link
                color="inherit"
                href="https://github.com/capstone-peak"
                target="_blank"
              >
                <GitHubIcon sx={{ color: "#E8E8E8" }} />
              </Link>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Container maxWidth="m">
        <Typography variant="body2" color="#434343" align="center">
          {"Copyright @ 2023 Peak. All rights reserved. "}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
