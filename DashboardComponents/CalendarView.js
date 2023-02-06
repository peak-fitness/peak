import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Badge from "@mui/material/Badge";

function preventDefault(event) {
  event.preventDefault();
}

const CustomizedCalendar = styled(CalendarPicker)`
  max-width: 90%;
  max-height: "100vh" & .MuiPickersCalendarHeader-labelContainer {
    margin-right: 0px;
  }

  & .MuiPickersCalendarHeader-root {
    padding-left: 0px;
    padding-right: 0px;
    margin-top: 5px;
    margin-bottom: 0px;
    color: #03dac5;
  }

  & .MuiYearPicker-root {
    justify-content: center;
    max-height: 200px;
  }

  & .PrivatePickersYear-yearButton {
    font-size: 14px;
  }

  & .MuiPickersCalendarHeader-labelContainer {
    font-size: 13.5px;
  }

  & .MuiDayPicker-weekContainer {
    max-height: 25px;
  }

  & .MuiButtonBase-root {
    max-height: 25px;
  }
`;

export default function CalendarView() {
  const [date, setDate] = useState(null);

  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const [highlightedDays, setHighlightedDays] = useState([]);

  useEffect(() => {
    fetchHighlightedDays();
  }, [date]);

  const fetchHighlightedDays = async () => {
    let days = [];
    const { data, error } = await supabase.from("workout").select("date");
    for (const elem of data) {
      days.push(Number(elem.date.slice(8)));
    }
    setHighlightedDays(days);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        p: [0],
      }}
    >
      <Grid container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CustomizedCalendar
            date={date}
            onChange={(newDate) => setDate(newDate)}
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected =
                !DayComponentProps.outsideCurrentMonth &&
                highlightedDays.indexOf(day.date()) >= 0;

              return (
                <Badge
                  key={day.toString()}
                  overlap="circular"
                  color="primary"
                  variant={isSelected ? "dot" : null}
                  sx={{ width: "30px" }}
                >
                  <PickersDay {...DayComponentProps} />
                </Badge>
              );
            }}
          />
        </LocalizationProvider>
      </Grid>
    </Container>
  );
}
