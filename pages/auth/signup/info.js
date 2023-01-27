import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const handleSubmit = async (evt) => {
  evt.preventDefault();
  console.log("HI");
};

export default function SignupInfo() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");

  const handleChangeGender = (event) => {
    setGender(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#161616" }}>
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
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
          </Toolbar>
        </Container>
      </AppBar>

      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            alignContent: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            You&apos;re almost there!
          </Typography>
          <Typography
            component="p"
            variant="p"
            sx={{
              color: "#959595",
              textAlign: "center",
              borderBottom: "1px solid #252525",
              padding: "2rem",
            }}
          >
            We need a little bit more information about you so we can create a
            more personalized experience for you. You can always skip and fill
            this out on your profile!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <TextField
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#959595" },
                    label: { color: "#959595" },
                  }}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(evt) => {
                    setFirstName(evt.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#959595" },
                    label: { color: "#959595" },
                  }}
                  required
                  fullWidth
                  id="lasttName"
                  label="Last Name"
                  onChange={(evt) => {
                    setLastName(evt.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  id="date"
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#959595" },
                    label: { color: "#959595" },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(evt) => {
                    setDate(evt.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#959595" },
                    label: { color: "#959595" },
                  }}
                  required
                  fullWidth
                  id="currentWeight"
                  label="Current Weight (lbs)"
                  onChange={(evt) => {
                    setCurrentWeight(evt.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#959595" },
                    label: { color: "#959595" },
                  }}
                  required
                  fullWidth
                  id="targetWeight"
                  label="Target Weight (lbs)"
                  onChange={(evt) => {
                    setTargetWeight(evt.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  sx={{
                    backgroundColor: "#242424",
                    input: { color: "#959595" },
                    label: { color: "#959595" },
                  }}
                  required
                  fullWidth
                  id="height"
                  label="Height (in)"
                  onChange={(evt) => {
                    setHeight(evt.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="gender" sx={{ color: "#959595" }}>
                    Gender
                  </InputLabel>
                  <Select
                    labelId="gender"
                    value={gender}
                    label="Gender"
                    onChange={handleChangeGender}
                    sx={{
                      backgroundColor: "#242424",
                      color: "#959595",
                    }}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                    <MenuItem value={"PreferNotToSay"}>
                      Prefer Not to Say
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Link
              href="/dashboard"
              style={{
                color: "#161616",
              }}
            >
              <Button
                type="submit"
                color="contrast"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onSubmit={handleSubmit}
              >
                Save
              </Button>
            </Link>
            <Typography textAlign="center" color="#808080">
              I&apos;ll do it later,{" "}
              <Link
                href="/dashboard"
                style={{
                  color: "#ffffff",
                }}
              >
                Skip now
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
