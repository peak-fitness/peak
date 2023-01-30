import styles from "@/styles/Groups.module.css";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

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
          <p className={styles.groupHeader}>GROUPS</p>
        </div>
      </div>
    </>
  );
}
