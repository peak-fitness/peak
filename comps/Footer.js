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
import { useSession } from "@supabase/auth-helpers-react";

const Footer = () => {
  const session = useSession();

  const responsive = {
    flex: {
      xs: "100%",
      sm: "100%",
      md: "80%",
      lg: "100%",
    },
    display: "flex",

    flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "0px 25px 0px",
    letterSpacing: ".1rem",
    fontFamily: "Montserrat",
    fontSize: { xs: "12px", sm: "16px" },
  };

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
          sx={responsive}
        >
          <Box>
            {session ? (
              <Typography variant="h4" noWrap>
                <Link
                  href="/dashboard"
                  style={{
                    color: "#E8E8E8",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Peak
                </Link>
              </Typography>
            ) : (
              <Typography
                variant="h4"
                noWrap
                sx={{
                  display: {
                    xs: "flex",
                    sm: "flex",
                    md: "flex",
                    lg: "flex",
                  },
                  boxSizing: "border-box",
                  padding: "0px 25px 0px",
                  letterSpacing: ".1rem",
                  fontFamily: "Montserrat",
                }}
              >
                <Link
                  href="/"
                  style={{
                    color: "#E8E8E8",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Peak
                </Link>
              </Typography>
            )}
          </Box>
          <Box sx={responsive}>
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
                <InstagramIcon sx={{ color: "#E4405F" }} />
              </Link>
            </IconButton>
            <IconButton aria-label="facebook">
              <Link
                color="inherit"
                //   href="https://github.com/capstone-peak"
                target="_blank"
              >
                <FacebookIcon sx={{ color: "#1877F2" }} />
              </Link>
            </IconButton>
            <IconButton aria-label="twitter">
              <Link
                color="inherit"
                //   href="https://github.com/capstone-peak"
                target="_blank"
              >
                <TwitterIcon sx={{ color: "#1DA1F2" }} />
              </Link>
            </IconButton>
            <IconButton aria-label="github">
              <Link
                color="inherit"
                href="https://github.com/capstone-peak/peak"
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
