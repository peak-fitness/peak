import Navbar from "@/comps/Navbar";
import { createTheme, Badge, Box, Button, Container, Grid, TextField, ThemeProvider, List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, Typography, ListItemIcon } from "@material-ui/core";
import { LocalizationProvider, PickersDay, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function MyWorkouts(){
    const [date, setDate] = useState(null);
    const [highlightedDays, setHighlightedDays] = useState([]); // need to grab day of month and add to array
    const [workout, setWorkout] = useState(null);
    const [exercises, setExercises] = useState([]);
    const supabase = useSupabaseClient();
    const session = useSession();
    const router = useRouter();

    useEffect(()=>{
      // if (!session) router.push('/')
        fetchWorkouts();
        fetchHighlightedDays();
    }, [date]);

    const fetchWorkouts = async () =>{
      if (date) {
        const dateString = `${date.$y}-0${date.$M + 1}-${date.$D >= 10 ? '' : '0'}${date.$D}`;
        const {data, error} = await supabase.from('user').select(`
          auth_id, workout (
            routine, notes, duration, date, user_id,
              exercises (
                *,
                sets (*)
            )
          )`
        ).eq('auth_id', session.user.id)
        .eq('workout.date', dateString)
        .single();
        setWorkout(data.workout[0]);
        if (data.workout.length) setExercises(data.workout[0].exercises);
        else setExercises([]);
      }
    }

    const fetchHighlightedDays = async () => {
      let days = [];
      const {data, error} = await supabase.from('workout').select('date')
      // .eq('date'.slice(5,7), String(date.$M+1).padStart(2,0));
      for (const elem of data){
        days.push(Number(elem.date.slice(8)));
      }
      setHighlightedDays(days);
    }

    const handleMonthChange = async () => {
      setHighlightedDays([]);
    }
  
    return(
        // <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Navbar />
            <Container>
                <Grid container>
                    <Grid item lg={9} sx={{
                        display: 'flex',
                        justifyContent:'center', 
                        maxHeight: '100vh',
                    }}>
                    <StaticDatePicker 
                        sx={{
                        backgroundColor: '#161616', 
                        '.MuiTypography-root': {color: 'white'}
                        }}
                        displayStaticWrapperAs="desktop"
                        value={date}
                        onChange={(newDate) => {
                        setDate(newDate);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        dayOfWeekFormatter={(day) => `${day}.`}
                        showToolbar
                        // onMonthChange={handleMonthChange}
                        renderDay={(day, _value, DayComponentProps) => {
                            const isSelected =
                            !DayComponentProps.outsideCurrentMonth &&
                            highlightedDays.indexOf(day.date()) >= 0;
                
                            return (
                            <Badge
                                key={day.toString()}
                                overlap="circular"
                                color='primary'
                                variant={isSelected ? 'dot' : null}
                            >
                                <PickersDay {...DayComponentProps} />
                            </Badge>
                            );
                        }}
                    />
                    </Grid>
                    <Grid item lg={3} sx={{
                      justifyContent: 'center',
                      '.MuiGrid-root': {justifyContent: 'center'}
                      }}> 
                     {workout ? <Typography variant='h6'>Workout: {workout.routine}</Typography> : <><Typography variant='h6'>No workouts for this day! Would you like to add a workout?</Typography><Link
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
                  textDecoration: "none"
                }}
              > Add a Workout
              </Link></>}
                    {exercises && exercises.map((exercise)=>{
                      return (
                          <>
                          <List key={exercise.id}>
                            <ListItem
                              secondaryaction={
                                <IconButton edge="end" aria-label="delete">
                                  {/* <DeleteIcon /> */}
                                </IconButton>
                              }
                            >
                              {/* <ListItemIcon>
                                <FitnessCenterIcon/>
                              </ListItemIcon> */}
                              <ListItemText
                                primary={exercise.name}
                                secondary={<ul>{
                                  exercise.sets.map((set)=>{
                                    return (
                                      <>
                                      <li className='sets'>Set {exercise.sets.indexOf(set) + 1} - Reps: {set.reps}, Weight: {set.weight} lbs</li>
                                      </>
                                    )
                                  })
                                }
                                </ul>}
                              />
                            </ListItem>
                        </List>
                        </>
                      )
                    })}
                    </Grid>
                </Grid>
            </Container>
        </LocalizationProvider>
        // </ThemeProvider>
    )
}