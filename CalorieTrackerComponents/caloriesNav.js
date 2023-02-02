import * as React from "react";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

function preventDefault(event) {
  event.preventDefault();
}

export default function CalendarView() {
  const [currentDay, setCurrentDay] = useState(new Date());

  const formattedDate = currentDay.toLocaleDateString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const sameDay = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const today = new Date();
  const day = sameDay(today, currentDay) ? `Today` : formattedDate;

  const prevDay = () => {
    setCurrentDay(
      (prevDay) => new Date(prevDay.setDate(prevDay.getDate() - 1))
    );
  };

  const nextDay = () => {
    setCurrentDay(
      (prevDay) => new Date(prevDay.setDate(prevDay.getDate() + 1))
    );
  };

  return (
    <Container
      style={{
        backgroundColor: "#161616",
      }}
    >
      <div>
        <Grid
          container
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item>
            <Button
              size="small"
              style={{
                color: "#B7B7B7",
                paddingTop: ".5em",
                lineHeight: "1.5em",
              }}
              onClick={prevDay}
            >
              Prev
            </Button>
          </Grid>
          <Grid item>
            <Typography style={{ color: "#FFFFFF" }} variant="h6">
              {day}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="small"
              style={{
                color: "#B7B7B7",
                paddingTop: ".5em",
                lineHeight: "1.5em",
              }}
              onClick={nextDay}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
