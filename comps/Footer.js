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

const Footer = () => {
  return (
    <Box
      style={{
        position: "static",
        bottom: 0,
        width: "100%",
      }}
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
      <Container display="flex" align="center" maxWidth={false}>
        <Toolbar
          disableGutters
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <Box>
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
                boxSizing: "border-box",
                padding: "0px 25px 0px",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "#E8E8E8",
                textDecoration: "none",
                margin: "0 15px 0 0",
                fontFamily: "Montserrat",
              }}
            >
              {"Peak"}
            </Typography>
          </Box>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              margin: "0 0 0 48px",
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
              display: "flex",
              margin: "0 30px 0 15px",
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
      <Container
        maxWidth="m"
        style={{
          width: "80%",
          borderTop: "1px solid #434343",
        }}
      >
        <Typography variant="body2" color="#434343" align="center">
          {"Copyright @ 2023 Peak. All rights reserved. "}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
