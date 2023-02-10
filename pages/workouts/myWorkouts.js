import Navbar from "@/comps/Navbar";
import {
  createTheme,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  ThemeProvider,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  LocalizationProvider,
  PickersDay,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dayjs from "dayjs";

export default function MyWorkouts() {
  const [date, setDate] = useState(dayjs());
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [workout, setWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [prDays, setPrDays] = useState([]);
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    // if (!session) router.push('/')
    if (session) {
      fetchWorkouts();
      fetchHighlightedDays();
      fetchPrDays();
    }
  }, [date, refresh]);

  useEffect(() => {
    updateWorkoutAchievements();
  });

  const fetchWorkouts = async () => {
    if (date) {
      const dateString = `${date.$y}-0${date.$M + 1}-${
        date.$D >= 10 ? "" : "0"
      }${date.$D}`;
      const { data, error } = await supabase
        .from("user")
        .select(
          `
          auth_id, workout (
            routine, notes, duration, date, user_id, id,
              exercises (
                *,
                sets (*)
            )
          )`
        )
        .eq("auth_id", session.user.id)
        .eq("workout.date", dateString)
        .single();
      setWorkout(data.workout[0]);
      if (data.workout.length) setExercises(data.workout[0].exercises);
      else setExercises([]);
    }
  };

  const fetchHighlightedDays = async () => {
    let days = [];
    const { data, error } = await supabase
      .from("user")
      .select(
        `
    auth_id, workout (
      date
    )`
      )
      .eq("auth_id", session.user.id)
      .single();
    for (const elem of data.workout) {
      const workoutDate = dayjs(elem.date);
      const formattedDate = workoutDate.format("YYYY-MM-DD");
      days.push(formattedDate);
    }
    setHighlightedDays(days);
  };

  const fetchPrDays = async () => {
    let prs = [];
    const { data, error } = await supabase
      .from("user")
      .select(
        `
      auth_id, workout (
        id, date,
          exercises (
            workout_id, is_pr
        )
      )`
      )
      .eq("auth_id", session.user.id)
      .single();
    for (const currentWorkout of data.workout) {
      if (currentWorkout.exercises) {
        for (const exercise of currentWorkout.exercises) {
          if (exercise.is_pr === true) {
            const prDate = dayjs(currentWorkout.date);
            const formattedPrDate = prDate.format("YYYY-MM-DD");
            prs.push(formattedPrDate);
          }
        }
      }
    }
    setPrDays(prs);
  };

  const handleDelete = async () => {
    if (workout) {
      for (const exercise of exercises) {
        await supabase.from("sets").delete().eq("exercises_id", exercise.id);
      }
      await supabase.from("exercises").delete().eq("workout_id", workout.id);
      await supabase.from("workout").delete().match({ id: workout.id });
    }
    setRefresh(!refresh);
  };

  const handleRedirect = () => {
    const encodedWorkout = encodeURIComponent(JSON.stringify(workout));
    const encodedDate = encodeURIComponent(JSON.stringify(date));
    router.push({
      pathname: "/workouts/addWorkout",
      query: { data: encodedWorkout, date: workout.date },
    });
  };

  const updateWorkoutAchievements = async () => {
    if (session) {
      const { data, error } = await supabase
        .from("user")
        .select(
          `
        auth_id, workout (
          user_id
        )`
        )
        .eq("auth_id", session.user.id)
        .single();
      if (data.workout.length > 0) {
        if (data.workout.length >= 5) {
          const { error } = await supabase
            .from("userAchievements")
            .update({ achieved: true })
            .eq("user_id", data.workout[0].user_id)
            .eq("a_id", 4);
        } else {
          const { error } = await supabase
            .from("userAchievements")
            .update({ achieved: false })
            .eq("user_id", data.workout[0].user_id)
            .eq("a_id", 4);
        }
        if (data.workout.length >= 10) {
          const { error } = await supabase
            .from("userAchievements")
            .update({ achieved: true })
            .eq("user_id", data.workout[0].user_id)
            .eq("a_id", 5);
        } else {
          const { error } = await supabase
            .from("userAchievements")
            .update({ achieved: false })
            .eq("user_id", data.workout[0].user_id)
            .eq("a_id", 5);
        }
        if (data.workout.length >= 25) {
          const { error } = await supabase
            .from("userAchievements")
            .update({ achieved: true })
            .eq("user_id", data.workout[0].user_id)
            .eq("a_id", 6);
        } else {
          const { error } = await supabase
            .from("userAchievements")
            .update({ achieved: false })
            .eq("user_id", data.workout[0].user_id)
            .eq("a_id", 6);
        }
        if (data.workout.length >= 50) {
          const { error } = await supabase
            .from("userAchievements")
            .update({ achieved: true })
            .eq("user_id", data.workout[0].user_id)
            .eq("a_id", 7);
        } else {
          const { error } = await supabase
            .from("userAchievements")
            .update({ achieved: false })
            .eq("user_id", data.workout[0].user_id)
            .eq("a_id", 7);
        }
        if (data.workout.length >= 100) {
          const { error } = await supabase
            .from("userAchievements")
            .update({ achieved: true })
            .eq("user_id", data.workout[0].user_id)
            .eq("a_id", 8);
        } else {
          const { error } = await supabase
            .from("userAchievements")
            .update({ achieved: false })
            .eq("user_id", data.workout[0].user_id)
            .eq("a_id", 8);
        }
      }
    }
  };

  return (
    // <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar />
      <Container>
        <Grid container>
          <Grid
            item
            lg={9}
            sx={{
              display: "flex",
              justifyContent: "center",
              maxHeight: "100vh",
            }}
          >
            <StaticDatePicker
              sx={{
                backgroundColor: "#161616",
                ".MuiTypography-root": { color: "white" },
              }}
              displayStaticWrapperAs="desktop"
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
              dayOfWeekFormatter={(day) => `${day}.`}
              showToolbar
              renderDay={(day, _value, DayComponentProps) => {
                const isSelected =
                  !DayComponentProps.outsideCurrentMonth &&
                  highlightedDays.indexOf(day.format("YYYY-MM-DD")) >= 0;

                const isPr =
                  !DayComponentProps.outsideCurrentMonth &&
                  prDays.indexOf(day.format("YYYY-MM-DD")) >= 0;

                return (
                  <Badge
                    key={day.toString()}
                    overlap="circular"
                    color={isPr ? "" : "primary"}
                    badgeContent={isPr ? "🏅" : null}
                    variant={isPr ? null : isSelected ? "dot" : null}
                  >
                    <PickersDay {...DayComponentProps} />
                  </Badge>
                );
              }}
            />
          </Grid>
          <Grid
            item
            lg={3}
            sx={{
              justifyContent: "center",
              ".MuiGrid-root": { justifyContent: "center" },
            }}
          >
            {workout ? (
              <>
                <Typography variant="h6">
                  Workout: {workout.routine}
                  <IconButton>
                    <EditIcon
                      style={{ fontSize: "22px", color: "#03dac5" }}
                      onClick={handleRedirect}
                    />
                  </IconButton>
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon
                      style={{
                        fontSize: "22px",
                        color: "#03dac5",
                      }}
                    />
                  </IconButton>
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h6">
                  No workouts for this day! Would you like to add a workout?
                </Typography>
                <Link
                  href="/workouts/addWorkout"
                  style={{
                    margin: "10px",
                    padding: "5px",
                    border: "solid",
                    borderRadius: "20px",
                    borderColor: "#03DAC5",
                    textAlign: "center",
                    display: "block",
                    color: "#E8E8E8",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  Add a Workout
                </Link>
              </>
            )}
            {exercises &&
              exercises.map((exercise) => {
                return (
                  <>
                    <List key={exercise.id}>
                      <ListItem>
                        {/* <ListItemIcon>
                                <FitnessCenterIcon/>
                              </ListItemIcon> */}
                        <ListItemText
                          primary={exercise.name}
                          secondary={
                            <ul>
                              {exercise.sets.map((set) => {
                                return (
                                  <>
                                    <li className="sets">
                                      Set {exercise.sets.indexOf(set) + 1} -
                                      Reps: {set.reps}, Weight: {set.weight} lbs
                                    </li>
                                  </>
                                );
                              })}
                            </ul>
                          }
                        />
                      </ListItem>
                    </List>
                  </>
                );
              })}
          </Grid>
        </Grid>
      </Container>
    </LocalizationProvider>
    // </ThemeProvider>
  );
}
