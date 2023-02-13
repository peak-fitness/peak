import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@mui/material/Container";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
const CaloriesBar = ({ date, saved, meals, added, deleted, edited }) => {
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
        .from("user")
        .select(
          `
          auth_id, meals (
            *
          )
          `
        )
        .eq("auth_id", session.user.id)
        .eq("meals.date", dateString)
        .single();
      if (data.meals.length) {
        let calorieCalc = 0;
        if (data.meals[0].meal.breakfast) {
          data.meals[0].meal.breakfast.map((food) => {
            calorieCalc += food.calories;
          });
        }
        if (data.meals[0].meal.lunch) {
          data.meals[0].meal.lunch.map((food) => {
            calorieCalc += food.calories;
          });
        }
        if (data.meals[0].meal.dinner) {
          data.meals[0].meal.dinner.map((food) => {
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
        .from("user")
        .select(
          `
          auth_id, meals (
            *
          )
          `
        )
        .eq("auth_id", session.user.id)
        .eq("meals.date", dateString)
        .single();
      if (data.meals.length) {
        let proteinCalc = 0;
        if (data.meals[0].meal.breakfast) {
          data.meals[0].meal.breakfast.map((food) => {
            proteinCalc += food.protein;
          });
        }
        if (data.meals[0].meal.lunch) {
          data.meals[0].meal.lunch.map((food) => {
            proteinCalc += food.protein;
          });
        }
        if (data.meals[0].meal.dinner) {
          data.meals[0].meal.dinner.map((food) => {
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
      style={{ backgroundColor: "#0F2B0E" }}
    >
      <div>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={10}>
            <Typography
              variant="h6"
              style={{ fontFamily: "Montserrat", fontWeight: "600" }}
            >
              {totalCaloriesConsumed} Calories Consumed Today
            </Typography>
            <Typography variant="body1" style={{ fontFamily: "Montserrat" }}>
              Total Protein Consumed: {totalProteinConsumed}
            </Typography>

            <Typography variant="body1" style={{ fontFamily: "Montserrat" }}>
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
                      fontFamily: "Montserrat",
                    }}
                  >
                    {Math.abs(caloriesLeft)}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    style={{ fontWeight: "750", fontFamily: "Montserrat" }}
                  >
                    {" "}
                    Calories Over
                  </Typography>
                </>
              ) : caloriesLeft === 0 ? (
                <>
                  <Typography
                    variant="subtitle2"
                    style={{
                      textAlign: "center",
                      fontWeight: "750",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Calories Goal Reached!
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    variant="h6"
                    style={{
                      color: "white",
                      fontWeight: "750",
                      fontFamily: "Montserrat",
                    }}
                  >
                    {caloriesLeft}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    style={{ fontWeight: "750", fontFamily: "Montserrat" }}
                  >
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
