import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

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

export default function SignupInfo() {
  const supabase = useSupabaseClient();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [targetCalories, setTargetCalories] = useState("");

  const router = useRouter();
  const session = useSession();

  const formatDate = (inputDate) => {
    let date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
      return (
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
      );
    }
  };

  const ageConversion = (date) => {
    let convertDate = formatDate(date);
    let dob = new Date(convertDate);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);
    return age;
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const id = session.user.id;
    const { data, error } = await supabase
      .from("user")
      .update({
        first_name: firstName,
        last_name: lastName,
        age: age,
        current_weight: currentWeight,
        target_weight: targetWeight,
        height: height,
        gender: gender,
        target_calories: targetCalories,
      })
      .eq("auth_id", session.user.id)
      .select("*");
    router.push("/dashboard");
  };

  function Redirect({ to }) {
    useEffect(() => {
      router.push(to);
    }, [to]);
  }

  if (session) {
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
              textAlign: "center",
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
                <Grid item xs={12} lg={6}>
                  <TextField
                    id="date"
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    required
                    sx={{
                      backgroundColor: "#242424",
                      input: { color: "#959595" },
                      label: { color: "#959595" },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(evt) => {
                      let currentAge = ageConversion(evt.target.value);
                      setAge(currentAge);
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
                    id="targetCalories"
                    label="Target Calories"
                    onChange={(evt) => {
                      setTargetCalories(Number(evt.target.value));
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
                      setCurrentWeight(Number(evt.target.value));
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
                      setTargetWeight(parseFloat(evt.target.value));
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
                      setHeight(parseFloat(evt.target.value));
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControl fullWidth required>
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
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  color: "#161616",
                  background:
                    "linear-gradient(90deg, #03dac5, #56ca82, #89b33e, #b59500, #da6b03)",
                  width: "35%",
                }}
                onSubmit={handleSubmit}
              >
                Save
              </Button>
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
  } else {
    return <Redirect to="/auth/signup" />;
  }
}
