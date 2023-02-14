import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { styled, ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@material-ui/core/styles";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: { main: "#03DAC5" },
    text: "white",
  },
  background: { default: "#161616" },
});

function createData(month, amount) {
  return { month, amount };
}

const rows = [];

export default function Chart() {
  const supabaseClient = useSupabaseClient();
  const [rows, setRows] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [uniqueYears, setUniqueYears] = useState([]);
  const user = useUser();
  const session = useSession();

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    fetchUniqueYears();
  }, [supabaseClient, session.user.id]);

  const fetchUniqueYears = async () => {
    let years = [];
    const { data, error } = await supabaseClient
      .from("user")
      .select(`auth_id, workout (date)`)
      .eq("auth_id", session.user.id)
      .single();
    for (const elem of data.workout) {
      const workoutDate = new Date(elem.date);
      const formattedDate = workoutDate.getFullYear();
      years.push(formattedDate);
    }
    setUniqueYears(Array.from(new Set(years)));
  };

  const fetchData = async () => {
    const res = await supabaseClient
      .from("user")
      .select(`auth_id, workout (*)`)
      .eq("auth_id", session.user.id)
      .single();

    let data = {};
    res.data.workout
      .filter((row) => {
        if (!selectedYear) {
          return true;
        }
        const date = new Date(row.date);
        return date.getFullYear() === selectedYear;
      })
      .forEach((row) => {
        const date = new Date(row.date);
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        if (!data[month]) {
          data[month] = 0;
        }
        data[month] += row.duration;
      });
    const dataArray = Object.entries(data).map(([month, totalDuration]) =>
      createData(month, totalDuration / 60)
    );
    setRows(
      dataArray.sort((a, b) => {
        return (
          new Date(`01 ${a.month} ${selectedYear}`).getTime() -
          new Date(`01 ${b.month} ${selectedYear}`).getTime()
        );
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title>Workout Progress</Title>
          {rows.length === 0 ? null : (
            <FormControl
              style={{ fontSize: "0.875rem", height: "32px", marginTop: "5px" }}
            >
              <Select
                value={selectedYear}
                onChange={handleYearChange}
                style={{ fontSize: "0.875rem", height: "32px" }}
              >
                {uniqueYears.map((year) => (
                  <MenuItem
                    key={year}
                    value={year}
                    style={{ fontSize: "0.875rem" }}
                  >
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
        <ResponsiveContainer>
          {rows.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: "50px" }}>
              Add workouts to view your progress! 🏋️‍♀️ 💪 🏃‍♀️
            </div>
          ) : (
            <LineChart
              data={rows}
              margin={{
                top: 15,
                right: 10,
                bottom: 20,
                left: 10,
              }}
            >
              <XAxis
                dataKey="month"
                stroke={theme.palette.text}
                style={theme.typography.body2}
                strokeWidth={2}
              >
                <Label
                  position="bottom"
                  style={{
                    textAnchor: "middle",
                    fill: theme.palette.primary.main,
                    ...theme.typography.body2,
                  }}
                >
                  Months
                </Label>
              </XAxis>
              <YAxis
                stroke={theme.palette.text}
                style={theme.typography.body2}
                strokeWidth={2}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: "middle",
                    fill: theme.palette.primary.main,
                    ...theme.typography.body2,
                  }}
                >
                  Time Spent (Hr)
                </Label>
              </YAxis>
              <Line
                isAnimationActive={true}
                type="monotone"
                dataKey="amount"
                stroke={theme.palette.primary.main}
                dot={true}
                strokeWidth={2}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
        {rows.length === 0 ? (
          <Link
            style={{
              color: "#03DAC5",
              textDecoration: "underline",
            }}
            href="/workouts/myWorkouts"
          >
            Add more workouts
          </Link>
        ) : (
          <Link
            style={{
              color: "#03DAC5",
              textDecoration: "underline",
            }}
            href="/workouts/addWorkout"
          >
            Add more workouts
          </Link>
        )}
      </React.Fragment>
    </ThemeProvider>
  );
}
