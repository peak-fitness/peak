import Navbar from "@/comps/Navbar";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useReducer, useRef, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import styles from "@/styles/AddWorkout.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
  text: {
    primary: "#ffffff",
    secondary: "#aaa",
  },
  background: { default: "#161616" },
});

export default function AddWorkout() {
  const [open, setOpen] = useState(false);
  const [setsInfo, setSetsInfo] = useState([]);
  const [invalidExercise, setInvalidExercise] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [id, setId] = useState(0);
  const [edit, setEdit] = useState(false);
  const [current, setCurrent] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [update, setUpdate] = useState(false);

  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (session) getUser();
    importData();
  }, [router.query]);

  useEffect(() => {
    setDate(dayjs(router.query.date));
  }, [router.query]);

  const importedDate = router.query.date;

  const [workout, updateWorkout] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { routine: "", exercises: [], notes: "", duration: 0, id: 0 }
  );

  const [exercise, updateExercise] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { name: "", notes: "", is_pr: false, muscle_group: "", sets: [] }
  );

  const [set, updateSet] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { id: 1, reps: 0, weight: 0 }
  );

  const importData = () => {
    const encodedWorkout = router.query.data;
    if (encodedWorkout) {
      const decodedWorkout = JSON.parse(decodeURIComponent(encodedWorkout));
      updateWorkout({
        routine: decodedWorkout.routine,
        notes: decodedWorkout.notes,
        duration: decodedWorkout.duration,
        exercises: decodedWorkout.exercises,
        id: decodedWorkout.id,
      });
      setUpdate(true);
    }
  };

  const handleExerciseSubmit = () => {
    if (!exercise.name) return setInvalidName(true);
    else setInvalidName(false);
    if (!exercise.sets.length) return setInvalidExercise(true);
    workout.exercises.push(exercise);
    handleClose();
  };

  const handleEditSubmit = () => {
    workout.exercises[currentIndex] = current;
    handleClose();
  };

  const getUser = async () => {
    const { data, error } = await supabase
      .from("user")
      .select("id")
      .match({ auth_id: session.user.id });
    setId(data[0].id);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    setInvalidExercise(false);
    setInvalidName(false);
    setCurrent({});
    updateSet({ id: 1, reps: 1, weight: 0 });
    updateExercise({
      name: "",
      notes: "",
      is_pr: false,
      muscle_group: "",
      sets: [],
    });
    setSetsInfo([]);
  };

  const handleChange = (e) => {
    if (e.target.name === "set") {
      e.target.value < 1 ? (e.target.value = "") : e.target.value;
      updateSet({ id: Number(e.target.value) });
    } else if (e.target.name === "reps") {
      e.target.value < 1 ? (e.target.value = "") : e.target.value;
      updateSet({ reps: Number(e.target.value) });
    } else if (e.target.name === "weight") {
      e.target.value < 0 ? (e.target.value = "") : e.target.value;
      updateSet({ weight: Number(e.target.value) });
    }
  };

  const addSet = (e) => {
    e.preventDefault();
    if (set.reps === 0) return;
    setInvalidExercise(false);
    exercise.sets.push(set);
    exercise.sets.sort((a, b) => a.id - b.id);
    setsInfo.push(set);
    updateSet({ id: set.id, reps: 1, weight: 0 });
  };

  const addSetInEdit = (e) => {
    e.preventDefault();
    setInvalidExercise(false);
    current.sets.push(set);
    updateSet({ id: 1, reps: 1, weight: 0 });
  };

  const handleSubmit = async () => {
    if (update) {
      const dateString = `${date.$y}-0${date.$M + 1}-${
        date.$D >= 10 ? "" : "0"
      }${date.$D}`;
      for (const exercise of workout.exercises) {
        for (const set of exercise.sets) {
          await supabase
            .from("sets")
            .update({
              reps: set.reps,
              weight: set.weight,
            })
            .match({ id: set.id });
        }

        await supabase
          .from("exercises")
          .update({
            name: exercise.name,
            notes: exercise.notes,
            muscle_group: exercise.muscle_group,
            is_pr: exercise.is_pr,
          })
          .match({ id: exercise.id });
      }

      const { data, error } = await supabase
        .from("workout")
        .update({
          routine: workout.routine,
          notes: workout.notes,
          duration: workout.duration,
        })
        .match({ id: workout.id });
    } else {
      const dateString = `${date.$y}-0${date.$M + 1}-${
        date.$D >= 10 ? "" : "0"
      }${date.$D}`;
      const { data, error } = await supabase
        .from("workout")
        .insert({
          routine: workout.routine,
          notes: workout.notes,
          duration: workout.duration,
          date: dateString,
          user_id: id,
        })
        .select();

      if (workout.exercises.length) {
        for (const exercise of workout.exercises) {
          let response = await supabase
            .from("exercises")
            .insert({
              workout_id: data[0].id,
              name: exercise.name,
              notes: exercise.notes,
              is_pr: exercise.is_pr,
              muscle_group: exercise.muscle_group,
            })
            .select();

          if (exercise.sets.length) {
            for (const set of exercise.sets) {
              let setResponse = await supabase.from("sets").insert({
                exercises_id: response.data[0].id,
                reps: set.reps,
                weight: set.weight,
              });
            }
          }
        }
      }
    }
    router.push("/workouts/myWorkouts");
  };

  const getExercise = (index) => {
    setCurrent(workout.exercises[index]);
    setCurrentIndex(index);
  };

  function Redirect({ to }) {
    useEffect(() => {
      router.push(to);
    }, [to]);
  }

  return session ? (
    <>
      <ThemeProvider theme={darkTheme}>
        <Head>
          <title>Workouts</title>
        </Head>
        <Navbar />

        <Grid
          container
          direction="unset"
          justifyContent="flex-start"
          alignItems="stretch"
          style={{
            minHeight: "90vh",
            backgroundColor: "#121212",
            overflow: "auto",
            maxHeight: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container
            style={{
              backgroundColor: "#262626",
              marginTop: "20px",
              marginRight: "30px",
              marginLeft: "30px",
              marginBottom: "20px",
              borderRadius: "15px",
              minHeight: "80vh",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Montserrat, sans serif",
                  fontSize: "35px",
                  paddingTop: "1rem",
                  fontWeight: 700,
                }}
              >
                {update ? "Edit Workout" : "Add Workout"}
              </Typography>
            </Box>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Container
                style={{
                  backgroundColor: "#202020",
                  marginTop: "20px",
                  marginBottom: "10px",
                  borderRadius: "15px",
                  paddingBottom: "15px",
                }}
              >
                <Box
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <Grid
                    container
                    spacing={6}
                    className={styles.workoutContainer}
                  >
                    <Grid
                      item
                      xs={3}
                      sm={3}
                      md={3}
                      lg={3}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <TextField
                        className={styles.form}
                        id="routine"
                        label="Routine (Push, Pull, etc.)"
                        InputLabelProps={{
                          shrink: true,
                          color: "darkTheme.text.primary",
                        }}
                        value={workout.routine}
                        onChange={(e) =>
                          updateWorkout({ routine: e.target.value })
                        }
                        style={{ width: "200px" }}
                      />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className={styles.form}
                          label="Date"
                          inputFormat="MM/DD/YYYY"
                          InputLabelProps={{
                            shrink: true,
                            color: "darkTheme.text.primary",
                          }}
                          value={update ? importedDate : date}
                          disabled={update ? true : false}
                          onChange={(newDate) => {
                            setDate(newDate);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          style={{ width: "200px" }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={6}
                    className={styles.workoutContainer}
                  >
                    <Grid
                      item
                      xs={3}
                      sm={3}
                      md={3}
                      lg={3}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <TextField
                        className={styles.form}
                        id="notes"
                        InputLabelProps={{
                          shrink: true,
                          color: "darkTheme.text.primary",
                        }}
                        label="Notes (Optional)"
                        value={workout.notes}
                        onChange={(e) =>
                          updateWorkout({ notes: e.target.value })
                        }
                        style={{ width: "200px" }}
                      />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <TextField
                        className={styles.form}
                        id="duration"
                        InputLabelProps={{
                          shrink: true,
                          color: "darkTheme.text.primary",
                        }}
                        label="Duration (Mins)"
                        value={workout.duration || ""}
                        onChange={(e) => {
                          updateWorkout({ duration: Number(e.target.value) });
                        }}
                        style={{ width: "200px" }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Container
                style={{
                  backgroundColor: "#202020",
                  marginTop: "5px",
                  marginBottom: "20px",
                  borderRadius: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{ fontSize: "30px" }}
                  align="center"
                  className={styles.exercisesText}
                >
                  Exercises
                </Typography>
                {!update && (
                  <Typography
                    variant="caption"
                    align="center"
                    style={{ marginBottom: "10px" }}
                  >
                    (Please fill out the above fields before adding an exercise)
                  </Typography>
                )}
                <Grid container spacing={6} className={styles.workoutContainer}>
                  <Grid item lg={4} className={styles.add}>
                    {!update && (
                      <Button
                        variant="outlined"
                        onClick={() => {
                          if (workout.routine && date && workout.duration) {
                            setOpen(true);
                          } else {
                            alert("Please fill out all required fields.");
                          }
                        }}
                      >
                        Add an Exercise
                      </Button>
                    )}
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      fullWidth={true}
                      className={styles.dialog}
                    >
                      <DialogTitle
                        style={{ textDecoration: "underline" }}
                        className={styles.dialog}
                      >
                        Exercise Information
                      </DialogTitle>
                      <DialogContent className={styles.dialog}>
                        <DialogContentText>
                          Please enter information about your exercise below
                        </DialogContentText>
                        {invalidName && (
                          <p
                            className="invalid-exercise"
                            style={{ color: "red" }}
                          >
                            Please enter a routine for your exercise
                          </p>
                        )}
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Exercise Name (Bench Press, Squats, etc.)"
                          fullWidth
                          variant="standard"
                          InputLabelProps={{
                            shrink: true,
                            color: "darkTheme.text.primary",
                          }}
                          value={edit ? current.name : null}
                          onChange={(e) => {
                            updateExercise({ name: e.target.value });
                            setCurrent({
                              ...current,
                              [e.target.id]: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="notes"
                          label="Notes"
                          fullWidth
                          variant="standard"
                          InputLabelProps={{
                            shrink: true,
                            color: "darkTheme.text.primary",
                          }}
                          value={edit ? current.notes : null}
                          onChange={(e) => {
                            updateExercise({ notes: e.target.value });
                            setCurrent({
                              ...current,
                              [e.target.id]: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="muscle_group"
                          label="Muscle Groups"
                          fullWidth
                          variant="standard"
                          InputLabelProps={{
                            shrink: true,
                            color: "darkTheme.text.primary",
                          }}
                          value={edit ? current.muscle_group : null}
                          onChange={(e) => {
                            updateExercise({ muscle_group: e.target.value });
                            setCurrent({
                              ...current,
                              [e.target.id]: e.target.value,
                            });
                          }}
                        />
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                style={{ color: "white" }}
                                id="is_pr"
                                onChange={(e) => {
                                  updateExercise({ is_pr: e.target.checked });
                                  setCurrent({
                                    ...current,
                                    [e.target.id]: e.target.checked,
                                  });
                                }}
                                defaultChecked={edit ? current.is_pr : false}
                              />
                            }
                            label="Personal Record?"
                          />
                        </FormGroup>
                        {invalidExercise && (
                          <p className="invalid-exercise">
                            Please enter set information
                          </p>
                        )}
                        {!update && (
                          <Container
                            className={styles.setsContainer}
                            style={{ marginTop: "10px" }}
                          >
                            <FormControl>
                              <InputLabel
                                htmlFor="set-number"
                                style={{ color: "darkTheme.text.primary" }}
                                shrink={true}
                              >
                                Set #
                              </InputLabel>
                              <Input
                                id="set-number"
                                type="number"
                                name="set"
                                value={set.id || ""}
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl>
                              <InputLabel
                                htmlFor="rep-count"
                                style={{ color: "darkTheme.text.primary" }}
                                shrink={true}
                              >
                                # of Reps
                              </InputLabel>
                              <Input
                                id="rep-count"
                                type="number"
                                name="reps"
                                value={set.reps || ""}
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl>
                              <InputLabel
                                htmlFor="weight"
                                style={{ color: "darkTheme.text.primary" }}
                                shrink={true}
                              >
                                Weight (lbs)
                              </InputLabel>
                              <Input
                                id="weight"
                                type="number"
                                name="weight"
                                value={set.weight || ""}
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl>
                              <IconButton
                                onClick={edit ? addSetInEdit : addSet}
                                className={styles.setsItems}
                              >
                                <AddCircleIcon
                                  style={{ fontSize: "30px", color: "#03dac5" }}
                                />
                              </IconButton>
                            </FormControl>
                          </Container>
                        )}
                        {edit
                          ? current.sets && (
                              <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Set #</TableCell>
                                      <TableCell>Reps</TableCell>
                                      <TableCell>Weight (lbs)</TableCell>
                                      <TableCell
                                        style={{ backgroundColor: "#161616" }}
                                      ></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {current.sets
                                      .sort((a, b) => a.id - b.id)
                                      .map((set, index) => {
                                        return (
                                          <>
                                            <TableRow key={index}>
                                              <TableCell align="center">
                                                {edit && (
                                                  <TextField
                                                    className={styles.editSets}
                                                    type="number"
                                                    value={
                                                      update
                                                        ? index + 1
                                                        : set.id
                                                    }
                                                    disabled={
                                                      update ? true : false
                                                    }
                                                    onChange={(e) => {
                                                      setCurrent(
                                                        (prevState) => ({
                                                          ...prevState,
                                                          sets: prevState.sets.map(
                                                            (elem) => {
                                                              if (
                                                                elem.id ===
                                                                set.id
                                                              ) {
                                                                return {
                                                                  ...elem,
                                                                  ...{
                                                                    id: Number(
                                                                      e.target
                                                                        .value
                                                                    ),
                                                                  },
                                                                };
                                                              }
                                                              return elem;
                                                            }
                                                          ),
                                                        })
                                                      );
                                                    }}
                                                  />
                                                )}
                                              </TableCell>
                                              <TableCell align="center">
                                                {edit && (
                                                  <TextField
                                                    className={styles.editSets}
                                                    type="number"
                                                    value={set.reps || ""}
                                                    onChange={(e) => {
                                                      setCurrent(
                                                        (prevState) => ({
                                                          ...prevState,
                                                          sets: prevState.sets.map(
                                                            (elem) => {
                                                              if (
                                                                elem.id ===
                                                                set.id
                                                              ) {
                                                                return {
                                                                  ...elem,
                                                                  ...{
                                                                    reps: Number(
                                                                      e.target
                                                                        .value
                                                                    ),
                                                                  },
                                                                };
                                                              }
                                                              return elem;
                                                            }
                                                          ),
                                                        })
                                                      );
                                                    }}
                                                  />
                                                )}
                                              </TableCell>
                                              <TableCell align="center">
                                                {edit && (
                                                  <TextField
                                                    className={styles.editSets}
                                                    type="number"
                                                    value={set.weight || ""}
                                                    onChange={(e) => {
                                                      setCurrent(
                                                        (prevState) => ({
                                                          ...prevState,
                                                          sets: prevState.sets.map(
                                                            (elem) => {
                                                              if (
                                                                elem.id ===
                                                                set.id
                                                              ) {
                                                                return {
                                                                  ...elem,
                                                                  ...{
                                                                    weight:
                                                                      Number(
                                                                        e.target
                                                                          .value
                                                                      ),
                                                                  },
                                                                };
                                                              }
                                                              return elem;
                                                            }
                                                          ),
                                                        })
                                                      );
                                                    }}
                                                  />
                                                )}
                                              </TableCell>
                                              {edit && !update && (
                                                <TableCell>
                                                  <IconButton
                                                    onClick={() => {
                                                      current.sets.splice(
                                                        index,
                                                        1
                                                      );
                                                      setRefresh(!refresh);
                                                    }}
                                                  >
                                                    <DeleteIcon
                                                      style={{
                                                        fontSize: "22px",
                                                        color: "#03dac5",
                                                      }}
                                                    />
                                                  </IconButton>
                                                </TableCell>
                                              )}
                                            </TableRow>
                                          </>
                                        );
                                      })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            )
                          : setsInfo.length >= 1 && (
                              <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Set #</TableCell>
                                      <TableCell>Reps</TableCell>
                                      <TableCell>Weight (lbs)</TableCell>
                                      <TableCell></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {setsInfo
                                      .sort((a, b) => a.id - b.id)
                                      .map((set, index) => {
                                        return (
                                          <>
                                            <TableRow key={index}>
                                              <TableCell align="center">
                                                {set.id}
                                              </TableCell>
                                              <TableCell align="center">
                                                {set.reps}
                                              </TableCell>
                                              <TableCell align="center">
                                                {set.weight}
                                              </TableCell>
                                              <TableCell
                                                style={{
                                                  backgroundColor: "#161616",
                                                }}
                                              >
                                                <IconButton
                                                  onClick={() => {
                                                    exercise.sets.splice(
                                                      index,
                                                      1
                                                    );
                                                    setsInfo.splice(index, 1);
                                                    setRefresh(!refresh);
                                                  }}
                                                >
                                                  <DeleteIcon
                                                    style={{
                                                      fontSize: "22px",
                                                      color: "#03dac5",
                                                    }}
                                                  />
                                                </IconButton>
                                              </TableCell>
                                            </TableRow>
                                          </>
                                        );
                                      })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            )}
                      </DialogContent>
                      <DialogActions className={styles.dialog}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                          onClick={
                            edit ? handleEditSubmit : handleExerciseSubmit
                          }
                        >
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
                <Box
                  style={{ margin: "15px", height: "150px", overflow: "auto" }}
                >
                  {workout.exercises.length >= 1 && (
                    <TableContainer
                      style={{
                        backgroundColor: "#202020",
                        width: "800px",
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell
                              style={{
                                fontSize: "16px",
                                color: "white",
                              }}
                            >
                              Title
                            </TableCell>
                            <TableCell
                              style={{
                                fontSize: "16px",
                                color: "white",
                              }}
                            >
                              Sets
                            </TableCell>
                            <TableCell
                              style={{
                                fontSize: "16px",
                                color: "white",
                              }}
                            >
                              Notes
                            </TableCell>
                            <TableCell
                              style={{
                                fontSize: "16px",
                                color: "white",
                              }}
                            >
                              PR
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {workout.exercises.map((exercise, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <IconButton
                                  onClick={() => {
                                    setEdit(true);
                                    setOpen(true);
                                    getExercise(index);
                                  }}
                                >
                                  <EditIcon style={{ color: "#77C3EC" }} />
                                </IconButton>
                              </TableCell>

                              <TableCell
                                style={{
                                  fontSize: "16px",
                                  color: "white",
                                }}
                              >
                                {exercise.name}
                              </TableCell>
                              <TableCell
                                style={{
                                  fontSize: "16px",
                                  color: "white",
                                }}
                              >
                                {exercise.sets.length}
                              </TableCell>
                              <TableCell
                                style={{
                                  fontSize: "16px",
                                  color: "white",
                                }}
                              >
                                {exercise.notes ? exercise.notes : "N/A"}
                              </TableCell>
                              <TableCell
                                style={{
                                  fontSize: "16px",
                                  color: "white",
                                }}
                              >
                                {exercise.is_pr ? "Yes" : "No"}
                              </TableCell>
                              <TableCell>
                                {!update && (
                                  <IconButton
                                    onClick={() => {
                                      workout.exercises.splice(index, 1);
                                      setCurrent({});
                                    }}
                                  >
                                    <DeleteIcon style={{ color: "#FF5349" }} />
                                  </IconButton>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Box>

                <Button
                  className={styles.saveButton}
                  type="submit"
                  onClick={handleSubmit}
                  variant="contained"
                  style={{
                    width: "12%",
                    height: "40px",
                    borderRadius: "10px",
                    fontSize: "18px",

                    marginBottom: "15px",
                    marginRight: "15px",
                    marginLeft: "15px",
                  }}
                >
                  Save
                </Button>
              </Container>
            </Grid>
          </Container>
        </Grid>
      </ThemeProvider>
    </>
  ) : (
    <Redirect to="/" />
  );
}
