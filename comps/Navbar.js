import { Block } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { borderRadius } from "@mui/system";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Navbar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#161616" }}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          {/* <img src="" width="200" /> */}
          {session ? (
            <Typography
              variant="h4"
              noWrap
              sx={{
                display: { xs: "flex", md: "flex", lg: "flex" },
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
          ) : (
            <Typography
              variant="h4"
              noWrap
              sx={{
                display: { xs: "flex", md: "flex", lg: "flex" },
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
          )}

          <Box sx={{ flexGrow: 2, display: { xs: "flex", md: "flex" } }}>
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
  );
};

export default Navbar;
