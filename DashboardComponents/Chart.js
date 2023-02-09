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
        return date.getUTCFullYear() === selectedYear;
      })
      .forEach((row) => {
        const date = new Date(row.date);
        const week = weekOfYear(date);
        const year = date.getUTCFullYear();
        if (!data[week]) {
          data[week] = { start: null, end: null, duration: 0 };
        }
        data[week].duration += row.duration;
        if (!data[week].start || date < data[week].start) {
          data[week].start = date;
        }
        if (!data[week].end || date > data[week].end) {
          data[week].end = date;
        }
      });
    const dataArray = Object.entries(data).map(
      ([week, { start, end, duration }]) =>
        createData(
          `${start.toUTCString()} - ${end.toUTCString()}`,
          duration / 60
        )
    );
    setRows(
      dataArray.sort((a, b) => {
        return (
          new Date(`01/01/${selectedYear}`).getTime() +
          (weekOfYear(a.month) - 1) * 7 * 24 * 60 * 60 * 1000 -
          new Date(`01/01/${selectedYear}`).getTime() +
          (weekOfYear(b.month) - 1) * 7 * 24 * 60 * 60 * 1000
        );
      })
    );
  };

  function weekOfYear(date) {
    var target = new Date(date.valueOf());
    target.setUTCHours(0, 0, 0, 0);

    var dayNumber = (target.getUTCDay() + 5) % 7;

    target.setUTCDate(target.getUTCDate() - dayNumber + 3);
    var firstThursday = target.valueOf();

    target.setUTCMonth(0, 1);
    if (target.getUTCDay() !== 4) {
      target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7));
    }

    // Check if February ends on 28th
    if (
      !isLeapYear(target.getUTCFullYear()) &&
      target.getUTCMonth() === 2 &&
      target.getUTCDate() >= 29
    ) {
      target.setUTCDate(28);
    }

    return 1 + Math.ceil((firstThursday - target) / 604800000);
  }

  function isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

  console.log(rows, "HIII");

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title>Workout Progress</Title>
          <FormControl>
            <Select value={selectedYear} onChange={handleYearChange}>
              {uniqueYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <ResponsiveContainer>
          <LineChart
            data={rows}
            margin={{
              top: 20,
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
              tickFormatter={(week) => {
                const weekString = week.toString();
                const [start, end] = weekString.split("-");
                return `Week ${weekOfYear(new Date(start))}`;
              }}
            >
              <Label
                position="bottom"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.primary.main,
                  ...theme.typography.body2,
                }}
              >
                Week # (of Year)
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
        </ResponsiveContainer>
      </React.Fragment>
    </ThemeProvider>
  );
}
