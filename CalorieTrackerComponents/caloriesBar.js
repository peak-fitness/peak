import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@mui/material/Container";

const CaloriesBar = ({ calories, protein }) => {
  const [goalCalories] = useState(2000);

  const caloriesLeft = goalCalories - calories;

  useEffect(() => {}, [calories, protein]);

  return (
    <Container
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 120,
      }}
      style={{ backgroundColor: "#0F2B0E" }}
    >
      <div>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={10}>
            <Typography variant="h6">
              {calories} Calories Consumed Today
            </Typography>
            <Typography variant="body1">
              Total Protein Consumed: {protein}
            </Typography>

            <Typography variant="body1">
              Goal Calories: {goalCalories}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                height: "90px",
                width: "90px",
                borderRadius: "50%",
                backgroundColor: "green",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" style={{ color: "white" }}>
                {caloriesLeft}
              </Typography>

              <Typography variant="subtitle2"> Calories Left</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default CaloriesBar;
