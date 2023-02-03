import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@mui/material/Container";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const CaloriesBar = ({ calories, protein, data }) => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [goalCalories, setGoalCalories] = useState(null);
  const caloriesLeft = goalCalories - calories;

  const fetchTargetCalories = async () => {
    if (session) {
      const { data, error } = await supabase
        .from("user")
        .select("target_calories")
        .eq("auth_id", session.user.id);
      setGoalCalories(data[0].target_calories);
    }
  };

  useEffect(() => {
    fetchTargetCalories();
  }, [calories, protein]);

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

export const getServerSideProps = async () => {
  // const supabase = useSupabaseClient();
  // const session = useSession();
  const { data, error } = await supabase.from("user").select("target_calories");
  console.log("ERROR", data);
  // .eq("auth_id", session.user.id);
  return {
    props: { data },
  };
};

export default CaloriesBar;
