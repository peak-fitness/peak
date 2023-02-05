import Navbar from "@/comps/Navbar";
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
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
import React, { useEffect, useReducer, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import styles from "@/styles/AddWorkout.module.css";
import { useRouter } from "next/router";

export default function AddWorkout() {
  const [open, setOpen] = useState(false);
  const [setsInfo, setSetsInfo] = useState([]);
  const [invalidExercise, setInvalidExercise] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [id, setId] = useState(0);
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (session) getUser();
  });

  const [workout, updateWorkout] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { routine: "", exercises: [], notes: "", routine: "", duration: 0 }
  );

  // need to add muscle group

  const [exercise, updateExercise] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { name: "", notes: "", is_pr: false, sets: [] }
  );

  const [set, updateSet] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { id: 1, reps: 1, weight: 0 }
  );

  const handleExerciseSubmit = async () => {
    if (!exercise.sets.length) return setInvalidExercise(true);
    workout.exercises.push(exercise);
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
    setInvalidExercise(false);
    updateSet({ id: 1, reps: 1, weight: 0 });
    updateExercise({ name: "", notes: "", is_pr: false, sets: [] });
    setSetsInfo([]);
  };

  const handleChange = (e) => {
    if (e.target.name === "set") updateSet({ id: e.target.value });
    else if (e.target.name === "reps") {
      e.target.value < 1 ? (e.target.value = 1) : e.target.value;
      updateSet({ reps: Number(e.target.value) });
    } else if (e.target.name === "weight") {
      e.target.value < 1 ? (e.target.value = 0) : e.target.value;
      updateSet({ weight: Number(e.target.value) });
    }
  };

  const addSet = (e) => {
    e.preventDefault();
    if (set.reps === 0) return;
    setInvalidExercise(false);
    setsInfo.push(set);
    exercise.sets.push(set);
    updateSet({ id: set.id + 1, reps: 1, weight: 0 });
  };

  const handleSubmit = async () => {
    const dateString = `${date.$y}-0${date.$M + 1}-${date.$D >= 10 ? "" : "0"}${
      date.$D
    }`;
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
    router.push("/workouts/myWorkouts");
  };

  return (
    <>
      <Navbar />
      <Container sx={{ justifyContent: "center" }} className={styles.outer}>
        <CssBaseline />
        {/* <Paper elevation={3}
                style={{ backgroundColor: "#202020" }}
                > */}
        <Box>
          <Typography
            variant="h3"
            align="center"
            sx={{
              display: "flex",
              fontFamily: "Montserrat",
              justifyContent: "center",
            }}
          >
            Add a Workout
          </Typography>
        </Box>
        <Box
          //   onSubmit={handleSubmit}
          sx={{
            mt: 3,
          }}
        >
          <Grid container spacing={6} className={styles.workoutContainer}>
            <Grid item lg={3}>
              <TextField
                className={styles.form}
                fullWidth
                id="routine"
                label="Workout Title"
                onChange={(e) => updateWorkout({ routine: e.target.value })}
              />
            </Grid>
            <Grid item lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={styles.form}
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={date}
                  onChange={(newDate) => {
                    setDate(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container spacing={6} className={styles.workoutContainer}>
            <Grid item lg={3}>
              <TextField
                className={styles.form}
                fullWidth
                id="notes"
                label="Notes"
                onChange={(e) => updateWorkout({ notes: e.target.value })}
              />
            </Grid>
            <Grid item lg={3}>
              <TextField
                className={styles.form}
                fullWidth
                id="duration"
                label="Duration (mins)"
                onChange={(e) =>
                  updateWorkout({ duration: Number(e.target.value) })
                }
              />
            </Grid>
            <Grid container spacing={6} className={styles.workoutContainer}>
              <Typography
                variant="h5"
                align="center"
                className={styles.exercisesText}
              >
                Exercises
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={6} className={styles.workoutContainer}>
            <Grid item lg={4} className={styles.add}>
              <Button variant="outlined" onClick={() => setOpen(true)}>
                Add an Exercise
              </Button>
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
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Exercise Name"
                    fullWidth
                    variant="standard"
                    onChange={(e) => updateExercise({ name: e.target.value })}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="notes"
                    label="Notes"
                    fullWidth
                    variant="standard"
                    onChange={(e) => updateExercise({ notes: e.target.value })}
                  />
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) =>
                            updateExercise({ is_pr: e.target.checked })
                          }
                        />
                      }
                      label="Personal Best?"
                    />
                  </FormGroup>
                  {invalidExercise && (
                    <p className="invalid-exercise">
                      Please enter set information
                    </p>
                  )}
                  <FormControl>
                    <InputLabel htmlFor="set-number">Set #</InputLabel>
                    <Input
                      id="set-number"
                      type="number"
                      name="set"
                      value={set.id}
                      disabled={true}
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="rep-count"># of Reps</InputLabel>
                    <Input
                      id="rep-count"
                      type="number"
                      name="reps"
                      value={set.reps}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="weight">Weight (lbs)</InputLabel>
                    <Input
                      id="weight"
                      type="number"
                      name="weight"
                      value={set.weight}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <IconButton onClick={addSet} style={{ marginLeft: "10px" }}>
                    <AddCircleIcon
                      style={{ fontSize: "30px", color: "green" }}
                    />
                  </IconButton>
                  {setsInfo.length >= 1 && (
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Set #</TableCell>
                            <TableCell>Reps</TableCell>
                            <TableCell>Weight (lbs)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {setsInfo.map((set, index) => {
                            return (
                              <>
                                <TableRow key={index}>
                                  <TableCell align="center">{set.id}</TableCell>
                                  <TableCell align="center">
                                    {set.reps}
                                  </TableCell>
                                  <TableCell align="center">
                                    {set.weight}
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
                  <Button onClick={handleExerciseSubmit}>Submit</Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <Box>
            {workout.exercises.length >= 1 && (
              <Grid container spacing={4}>
                <Grid item lg={3}>
                  <Typography className={styles.setsText}>Title</Typography>
                </Grid>
                <Grid item lg={3}>
                  <Typography className={styles.setsText}>Sets</Typography>
                </Grid>
                <Grid item lg={3}>
                  <Typography className={styles.setsText}>Notes</Typography>
                </Grid>
                <Grid item lg={3}>
                  <Typography className={styles.setsText}>PR?</Typography>
                </Grid>
              </Grid>
            )}
            {workout.exercises.length >= 1 &&
              workout.exercises.map((exercise) => {
                return (
                  <>
                    <Grid container spacing={4}>
                      <Grid item lg={3}>
                        <TextField
                          className={styles.sets}
                          value={exercise.name}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item lg={3}>
                        <TextField
                          className={styles.sets}
                          value={exercise.sets.length}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item lg={3}>
                        <TextField
                          className={styles.sets}
                          value={exercise.notes ? exercise.notes : "No notes"}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item lg={3}>
                        <TextField
                          className={styles.sets}
                          value={exercise.is_pr ? "Yes" : "No"}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                );
              })}
          </Box>
          <Button
            className={styles.saveButton}
            type="submit"
            onClick={handleSubmit}
            fullWidth
            variant="contained"
          >
            Save
          </Button>
        </Box>
        {/* </Paper> */}
      </Container>
    </>
  );
}
