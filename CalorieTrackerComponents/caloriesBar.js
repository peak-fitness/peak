import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@mui/material/Container";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const CaloriesBar = ({
  userId,
  date,
  saved,
  meals,
  added,
  deleted,
  edited,
}) => {
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
  }, [date, saved, meals, added, deleted, edited]);

  const fetchTargetCalories = async () => {
    if (session) {
      const { data, error } = await supabase
        .from("user")
        .select("target_calories")
        .eq("auth_id", session.user.id)
        .single();
      setGoalCalories(data.target_calories);
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
        .eq("date", dateString)
        .single();
      if (data) {
        let calorieCalc = 0;
        if (data.meal.breakfast) {
          data.meal.breakfast.map((food) => {
            calorieCalc += food.calories;
          });
        }
        if (data.meal.lunch) {
          data.meal.lunch.map((food) => {
            calorieCalc += food.calories;
          });
        }
        if (data.meal.dinner) {
          data.meal.dinner.map((food) => {
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
        .eq("date", dateString)
        .single();
      if (data) {
        let proteinCalc = 0;
        if (data.meal.breakfast) {
          data.meal.breakfast.map((food) => {
            proteinCalc += food.protein;
          });
        }
        if (data.meal.lunch) {
          data.meal.lunch.map((food) => {
            proteinCalc += food.protein;
          });
        }
        if (data.meal.dinner) {
          data.meal.dinner.map((food) => {
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
        p: 1,
        display: "flex",
        flexDirection: "column",
        height: 120,
      }}
      style={{ backgroundColor: "#0F2B0E", borderRadius: "10px" }}
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
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                backgroundColor: caloriesLeft < 0 ? "#a83c32" : "green",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {caloriesLeft < 0 ? (
                <>
                  <Typography
                    variant="h6"
                    style={{
                      color: "white",
                      fontWeight: "750",
                    }}
                  >
                    {Math.abs(caloriesLeft)}
                  </Typography>

                  <Typography variant="subtitle2" style={{ fontWeight: "750" }}>
                    {" "}
                    Calories Over
                  </Typography>
                </>
              ) : caloriesLeft === 0 ? (
                <>
                  <Typography
                    variant="subtitle2"
                    style={{ textAlign: "center", fontWeight: "750" }}
                  >
                    Calories Goal Reached!
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    variant="h6"
                    style={{ color: "white", fontWeight: "750" }}
                  >
                    {caloriesLeft}
                  </Typography>

                  <Typography variant="subtitle2" style={{ fontWeight: "750" }}>
                    {" "}
                    Calories Left
                  </Typography>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default CaloriesBar;
