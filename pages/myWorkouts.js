import Navbar from "@/comps/Navbar";
import { createTheme, Badge, Box, Button, Container, Grid, TextField, ThemeProvider, List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";
import { LocalizationProvider, PickersDay, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { useEffect } from "react";

export default function MyWorkouts(){
    const [date, setDate] = useState(null);
    const [highlightedDays, setHighlightedDays] = useState([5, 18, 22]); // dummyo data for now
    const [workouts, setWorkouts] = useState([]);
    const supabase = useSupabaseClient();

    function generate(element) {
        return [0, 1, 2].map((value) =>
          React.cloneElement(element, {
            key: value,
          }),
        );
      }

    const theme = createTheme({
        // palette: {
        //   primary: { main: "#03DAC5" },
        //   text: "white",
        // },
        // background: { default: "#161616" },
      });  

    useEffect(()=>{
        fetchWorkouts();
    }, [date]);
    console.log(workouts);

    const fetchWorkouts = async () =>{
        // need to set default date
        const dateString = `${date.$y}-0${date.$M + 1}-${date.$D >= 10 ? '' : '0'}${date.$D}`
        const {data, error} = await supabase.from('workout').select(`
            routine, notes, duration, date, user_id,
            exercise (
                *,
                set (*)
            )`
        ).eq('date', dateString)
        setWorkouts(data);
    }

    return(
        <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Navbar />
            <Container>
                <Grid container>
                    <Grid item lg={9} sx={{
                        display: 'flex',
                        justifyContent:'flex-start', 
                    }}>
                    <StaticDatePicker 
                        sx={{
                        backgroundColor: '#161616', 
                        '.MuiTypography-root': {color: 'white'},
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
                    <Grid item lg={3} sx={{color: 'white'}}> 
                            {workouts && workouts.map((workout)=>{
                                return (
                                    <>
                                    <h2 key={workout.id}>Workout: {workout.routine}</h2>
                                    {/* // eslint-disable-next-line react/jsx-key */}
                                    <List>
                                    {generate(
                                      <ListItem
                                        secondaryaction={
                                          <IconButton edge="end" aria-label="delete">
                                            {/* <DeleteIcon /> */}
                                          </IconButton>
                                        }
                                      >
                                        <ListItemAvatar>
                                          <Avatar>
                                            {/* <FolderIcon /> */}
                                          </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                          primary="Single-line item"
                                          secondary={'secondaryText'}
                                        />
                                      </ListItem>,
                                    )}
                                  </List>
                                  </>
                                )
                            })}
                    </Grid>
                </Grid>
            </Container>
        </LocalizationProvider>
        </ThemeProvider>
    )
}