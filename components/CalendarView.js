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
import { styled } from "@mui/material/styles";

function preventDefault(event) {
  event.preventDefault();
}

const CustomizedCalendar = styled(CalendarPicker)`
  max-width: 215px;
  max-height: 200px;

  & .MuiPickersCalendarHeader-labelContainer {
    margin-right: 0px;
  }

  & .MuiPickersCalendarHeader-root {
    padding-left: 0px;
    padding-right: 0px;
  }

  & .PrivatePickersYear-yearButton {
    font-size: 12px;
  }

  & .MuiPickersCalendarHeader-labelContainer {
    font-size: 13.5px;
  }
`;

export default function CalendarView() {
  const [date, setDate] = useState(null);

  return (
    <React.Fragment>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CustomizedCalendar
            date={date}
            onChange={(newDate) => setDate(newDate)}
          />
        </LocalizationProvider>
      </div>
    </React.Fragment>
  );
}
