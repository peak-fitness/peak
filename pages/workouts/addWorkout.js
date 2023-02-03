import Navbar from "@/comps/Navbar";
import { Box, Button, Checkbox, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Input, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useReducer, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import styles from '@/styles/AddWorkout.module.css'
import { useRouter } from "next/router";


export default function AddWorkout (){

    const [open, setOpen] = useState(false);
    const [setsInfo, setSetsInfo] = useState([]);
    const [invalidExercise, setInvalidExercise] = useState(false);
    const [date, setDate] = useState(dayjs());
    const [id, setId] = useState(0);
    const session = useSession();
    const supabase = useSupabaseClient();
    const router = useRouter();

    useEffect(()=>{
        convertDate();
        if (session) user();
    })

    // need TO FIGURE OUT DATE CONVERSION

    const [workout, updateWorkout] = useReducer(
        (prev, next) => {
          return { ...prev, ...next };
        },
        { routine: "", exercises: [], date: "2023-02-08", notes: "", routine: "", duration: 0 }
    );

    // need to add muscle group 

    const [exercise, updateExercise] = useReducer(
        (prev, next) => {
          return { ...prev, ...next };
        },
        { name: "", notes: "", is_pr: false, sets: [] }
    );
    console.log(workout);
    

    const [set, updateSet] = useReducer(
        (prev, next) => {
            return { ...prev, ...next };
        },
        {id: 1, reps: 1, weight: 0}
    );

    const handleExerciseSubmit = async() => {
        if (!exercise.sets.length) return setInvalidExercise(true);
        workout.exercises.push(exercise);
        handleClose();
    }

    const user = async () => {
        const {data, error} = await supabase.from('user').select('id').match({auth_id: session.user.id})
        setId(data[0].id);
    }

    const handleClose = () => {
      setOpen(false);
      setInvalidExercise(false);
      updateSet({id: 1, reps: 1, weight: 0})
      updateExercise({ name: "", notes: "", is_pr: false, sets: [] });
      setSetsInfo([]);
    };

    const handleChange = (e) => {
        if (e.target.name === 'set') updateSet({ id: e.target.value})
        else if (e.target.name === 'reps') {
            e.target.value < 1 ? e.target.value = 1 : e.target.value;
            updateSet({reps: Number(e.target.value)})
        }
        else if (e.target.name === 'weight') {
            e.target.value < 1 ? e.target.value = 0 : e.target.value;
            updateSet({weight: Number(e.target.value)})
        }
    }

    const addSet = (e) => {
        e.preventDefault();
        if (set.reps === 0) return;
        setInvalidExercise(false);
        setsInfo.push(set);
        exercise.sets.push(set);
        updateSet({id: set.id + 1, reps: 1, weight: 0});
    }

    const convertDate = () => {
        const dateString = `${date.$y}-0${date.$M + 1}-${date.$D >= 10 ? '' : '0'}${date.$D}`
    }

    const handleSubmit = async () => {
        const {data, error} = await supabase.from('workout')
        .insert({
            routine: workout.routine,
            notes: workout.notes, 
            duration: workout.duration,
            date: workout.date,
            user_id: id
        })
        .select();

        if (workout.exercises.length){
            for (const exercise of workout.exercises){
                let response = await supabase.from('exercises')
                .insert({
                    workout_id: data[0].id,
                    name: exercise.name,
                    notes: exercise.notes,
                    is_pr: exercise.is_pr
                })
                .select();

                 if (exercise.sets.length){
                    for (const set of exercise.sets) {
                        let setResponse = await supabase.from('sets')
                        .insert({
                            exercises_id: response.data[0].id,
                            reps: set.reps,
                            weight: set.weight
                        })
                    }
                 }
            }
        }

        router.push('/workouts/myWorkouts');
    }


    return(
        <>
        <Navbar/>
        <Container 
        sx={{justifyContent: 'center'}}
        className={styles.outer}>
        <CssBaseline/>
            {/* <Paper elevation={3}
                style={{ backgroundColor: "#202020" }}
                > */}
            <Box>
                <Typography variant='h3'
                align='center'
                sx={{
                    display: 'flex', 
                    fontFamily: 'Montserrat',
                    justifyContent: 'center'
                }}>Add a Workout</Typography>
            </Box>  
            <Box component="form" onSubmit={handleSubmit} 
            sx={{ 
                mt: 3
            }}>
                <Grid container spacing={6}>
                    <Grid item lg={2}>
                        <TextField 
                        sx={{
                            backgroundColor: "#242424",
                            input: { color: "#959595" },
                            label: { color: "#959595" },
                          }}
                          fullWidth
                          id='routine'
                          label='Workout Title'
                          onChange={(e)=> updateWorkout({routine: e.target.value})}
                        />
                    </Grid>
                    <Grid item lg={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            label='Date'
                            inputFormat="MM/DD/YYYY"
                            value={date}
                            onChange={(newDate)=>{
                                setDate(newDate)
                                updateWorkout({date: convertDate()})
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item lg={2}>
                        <TextField 
                        sx={{
                            backgroundColor: "#242424",
                            input: { color: "#959595" },
                            label: { color: "#959595" },
                          }}
                          fullWidth
                          id='notes'
                          label='Notes'
                          onChange={(e)=> updateWorkout({notes: e.target.value})}
                        />
                    </Grid>
                    <Grid item lg={2}>
                        <TextField 
                        sx={{
                            backgroundColor: "#242424",
                            input: { color: "#959595" },
                            label: { color: "#959595" },
                          }}
                          fullWidth
                          id='duration'
                          label='Duration (mins)'
                          onChange={(e)=> updateWorkout({duration: Number(e.target.value)})}
                        />
                    </Grid>
                    <Grid item lg={4}>
                    <Button 
                            variant="outlined" 
                            onClick={()=>setOpen(true)}
                            sx={{
                                borderRadius: "50px",
                                color: "#03DAC5",
                                // "&.MuiButton-text": { color: "#808080" },
                                // border: "2px black solid"
                              }}
                            >
                            Add an Exercise
                            </Button>
                            <Dialog open={open} 
                            onClose={(handleClose)} 
                            fullWidth={true}>
                              <DialogTitle style={{textDecoration: 'underline'}}>Exercise Information</DialogTitle>
                              <DialogContent>
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
                                  onChange={(e)=> updateExercise({name: e.target.value})}
                                />
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="notes"
                                  label="Notes"
                                  fullWidth
                                  variant="standard"
                                  onChange={(e)=> updateExercise({notes: e.target.value})}
                                />
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox onChange={(e)=> updateExercise({is_pr: e.target.checked})}/>} 
                                    label='Personal Best?'
                                    />
                                </FormGroup>
                                {invalidExercise && <p className="invalid-exercise">Please enter set information</p>}
                                <FormControl>
                                        <InputLabel htmlFor="set-number">Set #</InputLabel>
                                        <Input 
                                        id='set-number'
                                        type='number'
                                        name='set'
                                        value={set.id}
                                        disabled={true}
                                        />
                                </FormControl>
                                <FormControl>
                                        <InputLabel htmlFor="rep-count"># of Reps</InputLabel>
                                        <Input
                                        id='rep-count'
                                        type='number'
                                        name='reps'
                                        value={set.reps}
                                        onChange={handleChange}
                                        />
                                </FormControl>
                                <FormControl>
                                        <InputLabel htmlFor='weight'>Weight (lbs)</InputLabel>
                                        <Input
                                        id='weight'
                                        type='number'
                                        name='weight'
                                        value={set.weight}
                                        onChange={handleChange}
                                        />
                                </FormControl>
                                    {/* <InputLabel id='set-count'># of Sets</InputLabel>
                                    <Select
                                        labelId="set-count"
                                        id='sets'
                                        value={setCount}
                                        label='# of Sets'
                                        onChange={(e)=>setSetCount(e.target.value)}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                        </Select> */}
                                        {/* redo this logic, use Jahed's calorie tracker to add a set bar to post and then keep going  */}
                                {/* </FormControl> */}
                                <IconButton onClick={addSet} style={{marginLeft: '10px'}}>
                                    <AddCircleIcon style={{ fontSize: "30px", color: "green" }}/>
                                </IconButton>
                                {setsInfo.length >= 1 && 
                                <TableContainer component={Paper}>
                                <Table aria-label='simple table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Set #</TableCell>
                                            <TableCell>Reps</TableCell>
                                            <TableCell>Weight (lbs)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {setsInfo.map((set, index)=>{
                                    return (
                                        <>
                                        <TableRow key={index}>
                                        <TableCell align='center'>{set.id}</TableCell>
                                        <TableCell align='center'>{set.reps}</TableCell>
                                        <TableCell align='center'>{set.weight}</TableCell>
                                        </TableRow>
                                        </>
                                        )
                                    })}
                                    </TableBody>
                                </Table>
                                </TableContainer>}
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleExerciseSubmit}>Submit</Button>
                              </DialogActions>
                            </Dialog>
                    </Grid>
                </Grid>
                <Box>
                {workout.exercises.length >= 1 && workout.exercises.map((exercise)=>{
                    return (
                        <>
                        <TextField
                        value={exercise.name}
                        InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                        value={exercise.sets.length}
                        InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                        value={exercise.notes}
                        InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                        value={exercise.is_pr ? 'Yes' : 'No'}
                        InputProps={{
                            readOnly: true,
                          }}
                        />
                        </>
                    )
                })}
            </Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                  mb: 2,
                  padding: "1rem 1rem 1rem 1rem",
                  color: "#161616",
                  background:
                    "linear-gradient(90deg, #03dac5, #56ca82, #89b33e, #b59500, #da6b03)",
                }}
              >
                Save
            </Button>
            </Box>
            {/* </Paper> */}
        </Container>
        </>
    )

    // <>
    //       <input
    //         value={event.title}
    //         onChange={(e) => updateExercises({ title: e.target.value })}
    //       />
    //       {/* ... */}
    //     </>
}

//use one useReducer for each table in whic youre going to add to


// implement modal using below and the W3 schools link 

//   return (
//     <>
//       <input
//         value={event.title}
//         onChange={(e) => updateExercises({ title: e.target.value })}
//       />
//       {/* ... */}
//     </>
//   );
// }