import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@mui/material/Container";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const CaloriesBar = ({ userId, date, saved }) => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [goalCalories, setGoalCalories] = useState(null);
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0);
  const [totalProteinConsumed, setTotalProteinConsumed] = useState(0);
  const caloriesLeft = goalCalories - totalCaloriesConsumed;

  useEffect(() => {
    fetchTargetCalories();
    fetchTotalCaloriesConsumed();
    fetchTotalProteinConsumed();
  }, [date, saved]);

  const fetchTargetCalories = async () => {
    if (session) {
      const { data, error } = await supabase
        .from("user")
        .select("target_calories")
        .eq("auth_id", session.user.id);
      setGoalCalories(data[0].target_calories);
    }
  };

  const fetchTotalCaloriesConsumed = async () => {
    if (date) {
      const dateString = `${date.$y}-0${date.$M + 1}-${
        date.$D >= 10 ? "" : "0"
      }${date.$D}`;
      const { data, error } = await supabase
        .from("meals")
        .select("meal")
        .eq("user_id", userId)
        .eq("date", dateString);
      if (data[0]) {
        let calorieCalc = 0;
        if (data[0].meal.breakfast) {
          data[0].meal.breakfast.map((food) => {
            calorieCalc += food.calories;
          });
        }
        if (data[0].meal.lunch) {
          data[0].meal.lunch.map((food) => {
            calorieCalc += food.calories;
          });
        }
        if (data[0].meal.dinner) {
          data[0].meal.dinner.map((food) => {
            calorieCalc += food.calories;
          });
        }
        setTotalCaloriesConsumed(Number(calorieCalc));
      } else {
        setTotalCaloriesConsumed(0);
      }
    }
  };

  const fetchTotalProteinConsumed = async () => {
    if (date) {
      const dateString = `${date.$y}-0${date.$M + 1}-${
        date.$D >= 10 ? "" : "0"
      }${date.$D}`;
      const { data, error } = await supabase
        .from("meals")
        .select("meal")
        .eq("user_id", userId)
        .eq("date", dateString);
      if (data[0]) {
        let proteinCalc = 0;
        if (data[0].meal.breakfast) {
          data[0].meal.breakfast.map((food) => {
            proteinCalc += food.protein;
          });
        }
        if (data[0].meal.lunch) {
          data[0].meal.lunch.map((food) => {
            proteinCalc += food.protein;
          });
        }
        if (data[0].meal.dinner) {
          data[0].meal.dinner.map((food) => {
            proteinCalc += food.protein;
          });
        }
        setTotalProteinConsumed(Number(proteinCalc));
      } else {
        setTotalProteinConsumed(0);
      }
    }
  };

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
              {totalCaloriesConsumed} Calories Consumed Today
            </Typography>
            <Typography variant="body1">
              Total Protein Consumed: {totalProteinConsumed}
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
