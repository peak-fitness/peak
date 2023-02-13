import Navbar from "@/comps/Navbar";
import {
  createTheme,
  Badge,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
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
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import Head from "next/head";
import Card from "@mui/material/Card";
import styles from "@/styles/myWorkout.module.css";

const theme = createTheme({
  palette: {
    primary: { main: "#03DAC5" },
    type: "dark",
  },
});

const CustomizedCalendar = styled(StaticDatePicker)`
  .MuiPickerStaticWrapper-content {
    background-color: #161616;
    min-width: 100vh;
    min-height: 70vh;
    border-radius: 10px;
  }

  .css-xelq0e-MuiPickerStaticWrapper-content {
    background-color: #202020;
    color: white;
  }

  .css-1hf040o-MuiTypography-root {
    color: white;
  }

  &.css-epd502 {
    overflow-x: hidden;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .MuiTypography-h4 {
    color: #03dac5;
  }

  .MuiBadge-root {
    color: #161616;
  }

  .MuiSvgIcon-root {
    color: white;
  }

  .MuiTypography-caption {
    color: white;
  }

  .css-3k7djm-MuiButtonBase-root-MuiPickersDay-root {
    background-color: #262626;
    color: white;
  }

  .css-3k7djm-MuiButtonBase-root-MuiPickersDay-root.Mui-selected {
    background-color: #03dac5 !important;
  }

  .MuiInputBase-input {
    font: inherit;
    color: white;
    background: #262626;
    display: flex;
    justify-content: center;
  }

  .css-z3au5x-MuiButtonBase-root-MuiIconButton-root-MuiPickersToolbar-penIconButton {
    padding: 0;
    flex: auto;
    display: flex;
    justify-content: flex-start;
    margin-left: 10px;
  }

  .css-1skh3ba-MuiPickerStaticWrapper-root
    .css-z3au5x-MuiButtonBase-root-MuiIconButton-root-MuiPickersToolbar-penIconButton {
    padding: 0;

    flex: auto;
    display: flex;
    justify-content: flex-start;
    margin: 10px;
  }

  .css-8je8zh-MuiTouchRipple-root {
    position: static;
  }

  .css-1ta9a58-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected) {
    background-color: #262626;
    color: #fff;
    border: solid #fff;
    border-width: thin;
  }

  .css-1ta9a58-MuiButtonBase-root-MuiPickersDay-root.Mui-selected {
    background-color: #03dac5 !important;
    border: none;
  }
`;

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

  useEffect(() => {
    setDate(dayjs(router.query.date));
  }, [router.query]);

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

  function Redirect({ to }) {
    useEffect(() => {
      router.push(to);
    }, [to]);
  }

  const handleAddRedirect = () => {
    router.push({
      pathname: "/workouts/addWorkout",
      query: { date: date.format() },
    });
  };

  return session ? (
    <div>
      <Head>
        <title>Workouts</title>
      </Head>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Navbar />
          <Grid
            container
            spacing={4}
            style={{ minHeight: "75vh", backgroundColor: "#161616" }}
          >
            <Grid
              item
              xs={12}
              lg={12}
              sm={12}
              md={12}
              style={{
                backgroundColor: "#262626",
                margin: "3rem",
                borderRadius: "15px",
              }}
            >
              <Typography
                variant="h5"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Montserrat, sans serif",
                  fontSize: "38px",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                My Workouts
              </Typography>
              <Grid container spacing={0} style={{ borderRadius: "15px" }}>
                <Grid
                  item
                  xs={8}
                  sm={8}
                  md={8}
                  lg={8}
                  style={{
                    borderRight: "1.5rem solid #262626",
                    borderRadius: "15px",
                  }}
                >
                  <CustomizedCalendar
                    className="calendar-container"
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
                          color={isPr ? "white" : "primary"}
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
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  style={{
                    backgroundColor: "#202020",
                    overflow: "auto",
                    maxHeight: "70vh",
                    borderRadius: "15px",
                  }}
                >
                  {workout ? (
                    <div>
                      <div
                        style={{
                          paddingTop: "15px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "22px",
                          }}
                        >
                          Routine: {workout.routine}
                        </Typography>

                        <EditIcon
                          style={{
                            fontSize: "22px",
                            color: "#03dac5",
                            marginLeft: "5px",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={handleRedirect}
                        />

                        <DeleteIcon
                          style={{
                            fontSize: "22px",
                            color: "#03dac5",
                            marginLeft: "0px",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={handleDelete}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "70vh",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <Typography variant="h6">
                          No workouts for this day! Would you like to add a
                          workout?
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
                          Add a Workout
                        </Link>
                      </div>
                    </div>
                  )}
                  {exercises &&
                    exercises.map((exercise) => {
                      return (
                        <Card
                          style={{
                            backgroundColor: "#262626",
                            margin: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "Montserrat, sans-serif",
                          }}
                          key={exercise.id}
                        >
                          <div
                            style={{
                              margin: "10px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              style={{
                                color: "white",
                                fontSize: "18px",
                                fontFamily: "Montserrat, sans-serif",
                              }}
                            >
                              {exercise.name}
                            </Typography>

                            {exercise.sets.map((set, index) => (
                              <div
                                className="sets"
                                key={exercise.id}
                                style={{
                                  color: "#dedcdc",
                                  marginTop: "8px",
                                  marginBottom: "8px",
                                  fontSize: "15px",
                                }}
                              >
                                Set {index + 1}: {set.reps} Reps x {""}
                                {set.weight} lbs
                              </div>
                            ))}
                          </div>
                        </Card>
                      );
                    })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
