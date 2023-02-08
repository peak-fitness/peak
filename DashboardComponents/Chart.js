import * as React from "react";
import { useTheme } from "@mui/material/styles";
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

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("Jan", 0),
  createData("Feb", 15),
  createData("Mar", 20),
  createData("Apr", 21),
  createData("May", 21),
  createData("Jul", 18),
  createData("Aug", 20),
  createData("Sep", 19),
  createData("Oct", 23),
  createData("Nov", 25),
  createData("Dec", 15),
];

const theme = createTheme({
  palette: {
    type: "dark",
    primary: { main: "#03DAC5" },
    text: "white",
  },
  background: { default: "#161616" },
});

export default function Chart() {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Title>Workout Progress</Title>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis
              dataKey="time"
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
                # of Workouts
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
