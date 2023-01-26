import Navbar from "@/comps/Navbar";
import { Badge, Box, Button, Container, Grid, TextField } from "@material-ui/core";
import { LocalizationProvider, PickersDay, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";

export default function MyWorkouts(){
    const [date, setDate] = useState(null);
    const [highlightedDays, setHighlightedDays] = useState([5, 18, 22]);
    const supabase = useSupabaseClient();
    

    const handle = async () =>{
        console.log(date); // convert date to what you need to match 
        const {data, error} = await supabase.from('user').select(`
        username,
        workout (
            routine, notes, duration, date,
            exercise (
                *,
                set (*)
            )
        )`
        ).match({id: 1})
        console.log(data);
    }

    handle();

    return(
        // <CalendarView/>
        // <div>
        // <LocalizationProvider dateAdapter={AdapterDayjs}>
        //     <CalendarPicker />
        // </LocalizationProvider>
        // </div>
        // <Grid container spacing={2}>
        // <Grid item xs={12}>
        // <LocalizationProvider dateAdapter={AdapterDayjs}>
        //     <Navbar/>
        //     <Container>
        //         <Box sx={{
        //             margin: 'auto'
        //         }}>
        //         <StaticDatePicker
        //             displayStaticWrapperAs="desktop"
        //             value={date}
        //             onChange={(newDate) => {
        //             setDate(newDate);
        //             }}
        //             renderInput={(params) => <TextField {...params} />}
        //             dayOfWeekFormatter={(day) => `${day}.`}
        //             showToolbar
        //             renderDay={(day, _value, DayComponentProps) => {
        //                 const isSelected =
        //                 !DayComponentProps.outsideCurrentMonth &&
        //                 highlightedDays.indexOf(day.date()) >= 0;
            
        //                 return (
        //                 <Badge
        //                     key={day.toString()}
        //                     overlap="circular"
        //                     color='primary'
        //                     variant={isSelected ? 'dot' : null}
        //                     // badgeContent={isSelected ? '✅' : undefined}
        //                 >
        //                     <PickersDay {...DayComponentProps} />
        //                 </Badge>
        //                 );
        //             }}
        //         />
        //         </Box>
        //         <Box sx={{margin: 'auto'}}>
        //             <Button>HELLO</Button>
        //         </Box>
        //     </Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container sx={{
                backgroundColor: '#161616'
                }}>
                <Grid container>
                    <Grid item lg={11} sx={{
                        display: 'flex',
                        justifyContent:'flex-start'
                    }}>
                    <StaticDatePicker
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
                                b color='primary'
                                variant={isSelected ? 'dot' : null}
                            >
                                <PickersDay {...DayComponentProps} />
                            </Badge>
                            );
                        }}
                    />
                    </Grid>
                    <Grid item lg={1}> 
                        <Button>HELLO</Button>
                    </Grid>
                </Grid>
            </Container>
        </LocalizationProvider>
    )
}