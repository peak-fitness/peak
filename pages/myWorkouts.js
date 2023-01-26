import Navbar from "@/comps/Navbar";
import { Badge, Box, Button, Container, Grid, TextField } from "@material-ui/core";
import { LocalizationProvider, PickersDay, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";

export default function MyWorkouts(){
    const [date, setDate] = useState(null);
    const [highlightedDays, setHighlightedDays] = useState([5, 18, 22]);

    return(
        // <CalendarView/>
        // <div>
        // <LocalizationProvider dateAdapter={AdapterDayjs}>
        //     <CalendarPicker />
        // </LocalizationProvider>
        // </div>
        // <Grid container spacing={2}>
        // <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Navbar/>
            <Container>
                <Box sx={{
                    margin: 'auto'
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
                            color='primary'
                            variant={isSelected ? 'dot' : null}
                            // badgeContent={isSelected ? '✅' : undefined}
                        >
                            <PickersDay {...DayComponentProps} />
                        </Badge>
                        );
                    }}
                />
                </Box>
                <Box sx={{margin: 'auto'}}>
                    <Button>HELLO</Button>
                </Box>
            </Container>
            {/* <Container sx={{
                backgroundColor: '#161616'
                }}>
                <Grid container justifyContent="flex-end">
                    <Grid item xs={12} sx={{
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
                                badgeContent={isSelected ? '✅' : undefined}
                            >
                                <PickersDay {...DayComponentProps} />
                            </Badge>
                            );
                        }}
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <Button>HELLO</Button>
                    </Grid>
                </Grid>
            </Container> */}
        </LocalizationProvider>
    )
}