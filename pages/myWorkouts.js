import Navbar from "@/comps/Navbar";
import { createTheme, Badge, Box, Button, Container, Grid, TextField, ThemeProvider } from "@material-ui/core";
import { LocalizationProvider, PickersDay, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";

export default function MyWorkouts(){
    const [date, setDate] = useState(null);
    const [highlightedDays, setHighlightedDays] = useState([5, 18, 22]);
    const supabase = useSupabaseClient();

    const theme = createTheme({
        // palette: {
        //   primary: { main: "#03DAC5" },
        //   text: "white",
        // },
        // background: { default: "#161616" },
      });
    

    const handle = async () =>{
        //console.log(date); // convert date to what you need to match
        // date.$y-(date.$M+1)-(date.$d)
        const dateString = `${date.$y}-0${date.$M + 1}-${date.$D >= 10 ? '' : '0'}${date.$D}`
        console.log(dateString);
        const {data, error} = await supabase.from('workout').select(`
            routine, notes, duration, date, user_id,
            exercise (
                *,
                set (*)
            )`
        ).eq('date', dateString)
        //match({id: 1})
        console.log(data);
        console.log(error);
    }

    handle();

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
                    <Grid item lg={3}> 
                            This is sample text
                    </Grid>
                </Grid>
            </Container>
        </LocalizationProvider>
        </ThemeProvider>
    )
}