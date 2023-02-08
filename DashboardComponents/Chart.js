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

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    supabaseClient
      .from("workout")
      .select("*")
      .then((res) => {
        setUniqueYears(
          Array.from(
            new Set(
              res.data.map((row) => {
                const date = new Date(row.date);
                return date.getFullYear();
              })
            )
          )
        );
      })
      .catch((err) => console.error(err));
  }, [supabaseClient]);

  useEffect(() => {
    supabaseClient
      .from("workout")
      .select("*")
      .then((res) => {
        let data = {};
        res.data
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
        setRows(dataArray);
      })
      .catch((err) => console.error(err));
  }, [supabaseClient, selectedYear]);

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
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis
              dataKey="month"
              stroke={theme.palette.text}
              style={theme.typography.body2}
              strokeWidth={2}
            />
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
                  ...theme.typography.body1,
                }}
              >
                Time Spent (Hours)
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
