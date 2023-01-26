import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";

function preventDefault(event) {
  event.preventDefault();
}

export default function CalendarView() {
  const [date, setDate] = useState(null);

  return (
    <React.Fragment>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container>
            <Grid item xs={6} md={3}>
              <CalendarPicker
                date={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </Grid>
            <Grid item xs={6} md={3}></Grid>
            <Grid item xs={6} md={6}></Grid>
          </Grid>
        </LocalizationProvider>
      </div>
    </React.Fragment>
  );
}
