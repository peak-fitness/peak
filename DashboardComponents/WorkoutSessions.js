import * as React from "react";
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
import Link from "next/link";

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
  const session = useSession();

  const fetchData = async () => {
    const result = await supabaseClient
      .from("user")
      .select(`auth_id, workout (*)`)
      .eq("auth_id", session.user.id)
      .single();

    if (result.data) {
      setRows(
        result.data.workout
          .map((row) =>
            createData(row.id, row.date, row.notes, row.routine, row.duration)
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [supabaseClient]);

  return (
    <>
      <React.Fragment>
        <Title>Recent Workouts</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography variant="body1">Date</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1">Routine</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">Duration (Min)</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {rows.length === 0 ? null : (
            <TableBody>
              {rows.slice(0, 4).map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">
                    <Typography variant="body2">{row.date}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body2">
                      {row.routine.toUpperCase()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">{`${row.duration}`}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>

        {rows.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            No workouts yet! 😕
          </div>
        ) : null}

        <Link
          href="/workouts/myWorkouts"
          style={{
            color: "#03DAC5",
            paddingTop: "10px",
            textDecoration: "underline",
          }}
        >
          See all workouts
        </Link>
      </React.Fragment>
    </>
  );
}
