import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { styled, ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@material-ui/core/styles";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";

function preventDefault(event) {
  event.preventDefault();
}

const theme = createTheme({
  palette: {
    type: "dark",
    primary: { main: "#03DAC5" },
    text: "white",
  },
  background: { default: "#161616" },
});

const rows = [];

function createData(id, date, notes, routine, duration) {
  return { id, date, notes, routine, duration };
}

export default function RecentWorkouts() {
  const supabaseClient = useSupabaseClient();
  const [rows, setRows] = useState([]);
  const user = useUser();

  useEffect(() => {
    supabaseClient
      .from("workout")
      .select("*")
      .then((res) => {
        setRows(
          res.data
            .map((row) =>
              createData(row.id, row.date, row.notes, row.routine, row.duration)
            )
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      })
      .catch((err) => console.error(err));
  }, [supabaseClient]);

  return (
    <>
      <React.Fragment>
        <Title>Recent Workouts</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Date</Typography>
              </TableCell>
              <TableCell>
                <Typography>Routine</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Duration (Min)</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0, 4).map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Typography style={{ fontSize: 15 }}>{row.date}</Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontSize: 15 }}>
                    {row.routine.toUpperCase()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    style={{ fontSize: 15 }}
                  >{`${row.duration}`}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link
          color="primary"
          onClick={() => (window.location.href = "/workouts/myWorkouts")}
          sx={{ pt: 1 }}
        >
          See more workouts
        </Link>
      </React.Fragment>
    </>
  );
}
