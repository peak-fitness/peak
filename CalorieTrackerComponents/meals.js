import * as React from "react";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Container, Tab, Tabs, Button } from "@mui/material";
import MealForm from "./MealForm";
import EditMealForm from "./EditMealForm";
import CaloriesBar from "./caloriesBar";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CaloriesNav from "./caloriesNav";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Badge, TextField } from "@material-ui/core";
import {
  LocalizationProvider,
  PickersDay,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function MealContainer() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [saved, setSaved] = useState(false);
  const [value, setValue] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [userId, setUserId] = useState(null);
  const [mealId, setMealId] = useState(null);
  const [todaysDate, setTodaysDate] = useState(null);
  const [date, setDate] = useState(null);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [fetchMeals, setFetchMeals] = useState(null);
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  useEffect(() => {
    fetchCurrentUserId();
    fetchUserMeals();
    // calculateTodaysDate();
  }, [totalCalories, totalProtein, date]);

  // const calculateTodaysDate = () => {
  //   let today = new Date();
  //   let dd = String(today.getDate()).padStart(2, "0");
  //   let mm = String(today.getMonth() + 1).padStart(2, "0");
  //   let yyyy = today.getFullYear();
  //   today = yyyy + "/" + mm + "/" + dd;
  //   setTodaysDate(today);
  // };

  const fetchCurrentUserId = async () => {
    if (session) {
      const { data, error } = await supabase
        .from("user")
        .select("id")
        .eq("auth_id", session.user.id);
      setUserId(data[0].id);
    }
  };

  const fetchUserMeals = async () => {
    if (date) {
      const dateString = `${date.$y}-0${date.$M + 1}-${
        date.$D >= 10 ? "" : "0"
      }${date.$D}`;
      const { data, error } = await supabase
        .from("meals")
        .select("meal")
        .eq("user_id", userId)
        .eq("date", dateString);
      setFetchMeals(data[0].meal);
    }
  };

  const fetchMealId = async () => {
    if (!mealId) {
      const { data, error } = await supabase
        .from("meals")
        .select("id")
        .eq("user_id", userId)
        .eq("date", date);
      setMealId(data[0].id);
    }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateTotals = (calories, protein) => {
    setTotalCalories(totalCalories + calories);
    setTotalProtein(totalProtein + protein);
  };

  const addMeal = (meal, mealType) => {
    setMeals({
      ...meals,
      [mealType]: [...meals[mealType], meal],
    });
    updateTotals(meal.calories, meal.protein);
  };

  const handleSave = async () => {
    if (mealId) {
      const { data, error } = await supabase
        .from("meals")
        .update({
          meal: meals,
        })
        .eq("id", mealId);
    } else {
      const { data, error } = await supabase
        .from("meals")
        .insert({
          user_id: userId,
          date: date,
          meal: meals,
        })
        .select("*");
    }
    fetchMealId();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const removeMeal = async (mealIndex, mealType) => {
    const removedMeal = meals[mealType][mealIndex];
    setMeals({
      ...meals,
      [mealType]: meals[mealType].filter((meal, index) => index !== mealIndex),
    });
    updateTotals(-removedMeal.calories, -removedMeal.protein);
  };

  const editMeal = (index, mealType, updatedMeal) => {
    const oldMeal = meals[mealType][index];
    const caloriesDiff = updatedMeal.calories - oldMeal.calories;
    const proteinDiff = updatedMeal.protein - oldMeal.protein;
    setMeals({
      ...meals,
      [mealType]: [
        ...meals[mealType].slice(0, index),
        updatedMeal,
        ...meals[mealType].slice(index + 1),
      ],
    });
    updateTotals(caloriesDiff, proteinDiff);
  };

  const [editMealIndex, setEditMealIndex] = useState(-1);
  const [editMealType, setEditMealType] = useState("");

  const handleEditClick = (index, mealType) => {
    setEditMealIndex(index);
    setEditMealType(mealType);
  };

  const handleEditSubmit = (updatedMeal) => {
    editMeal(editMealIndex, editMealType, updatedMeal);
    setEditMealIndex(-1);
    setEditMealType("");
  };

  // console.log("FETCH", fetchMeals);
  // console.log("MEALS", meals);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div>
          {/* date bar & total calories bar  */}
          {/* <CaloriesNav date={date} /> */}

          <StaticDatePicker
            sx={{
              backgroundColor: "#161616",
              ".MuiTypography-root": { color: "white" },
            }}
            displayStaticWrapperAs="desktop"
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
            dayOfWeekFormatter={(day) => `${day}.`}
            showToolbar
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected =
                !DayComponentProps.outsideCurrentMonth &&
                highlightedDays.indexOf(day.date()) >= 0;

              return (
                <Badge
                  key={day.toString()}
                  overlap="circular"
                  color="primary"
                  variant={isSelected ? "dot" : null}
                >
                  <PickersDay {...DayComponentProps} />
                </Badge>
              );
            }}
          />
          <CaloriesBar calories={totalCalories} protein={totalProtein} />
          <div align="center" justifycontent="center">
            <Tabs
              letiant="fullWidth"
              textColor="#03dac5"
              value={value}
              onChange={handleTabChange}
              centered
              TabIndicatorProps={{
                style: {
                  backgroundColor: "green",
                },
              }}
            >
              <Tab label="Breakfast" />
              <Tab label="Lunch" />
              <Tab label="Dinner" />
            </Tabs>
            <br />

            {/* Breakfast */}
            {value === 0 && (
              <div>
                <MealForm addMeal={(meal) => addMeal(meal, "breakfast")} />
                <br />

                {meals.breakfast.map((meal, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0px",
                      paddingLeft: 40,
                      paddingRight: 40,
                    }}
                  >
                    <IconButton
                      onClick={() => removeMeal(index, "breakfast")}
                      style={{ marginLeft: "10px" }}
                    >
                      <RemoveCircleIcon
                        style={{ fontSize: "30px", color: "#a83c32" }}
                      />
                    </IconButton>
                    <p style={{ fontSize: "16px" }}>{meal.name}</p>
                    <p style={{ fontSize: "16px" }}>{meal.calories} calories</p>
                    <p style={{ fontSize: "16px" }}>{meal.protein}g protein</p>

                    <div>
                      <IconButton
                        onClick={() => handleEditClick(index, "breakfast")}
                        style={{}}
                      >
                        <EditIcon
                          style={{ fontSize: "30px", color: "#326da8" }}
                        />
                      </IconButton>
                    </div>
                  </div>
                ))}
                {editMealIndex !== -1 && editMealType === "breakfast" && (
                  <EditMealForm
                    meal={meals.breakfast[editMealIndex]}
                    onEdit={handleEditSubmit}
                  />
                )}
              </div>
            )}

            {/* Lunch */}
            {value === 1 && (
              <div>
                <MealForm addMeal={(meal) => addMeal(meal, "lunch")} />
                <br />
                {meals.lunch.map((meal, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0px",
                      paddingLeft: 40,
                      paddingRight: 40,
                    }}
                  >
                    <IconButton
                      onClick={() => removeMeal(index, "lunch")}
                      style={{ marginLeft: "10px" }}
                    >
                      <RemoveCircleIcon
                        style={{ fontSize: "30px", color: "#a83c32" }}
                      />
                    </IconButton>
                    <p style={{ fontSize: "16px" }}>{meal.name}</p>
                    <p style={{ fontSize: "16px" }}>{meal.calories} calories</p>
                    <p style={{ fontSize: "16px" }}>{meal.protein}g protein</p>

                    <div>
                      <IconButton
                        onClick={() => handleEditClick(index, "lunch")}
                        style={{}}
                      >
                        <EditIcon
                          style={{ fontSize: "30px", color: "#326da8" }}
                        />
                      </IconButton>
                    </div>
                  </div>
                ))}
                {editMealIndex !== -1 && editMealType === "lunch" && (
                  <EditMealForm
                    meal={meals.lunch[editMealIndex]}
                    onEdit={handleEditSubmit}
                  />
                )}
              </div>
            )}

            {/* Dinner */}
            {value === 2 && (
              <div>
                <MealForm addMeal={(meal) => addMeal(meal, "dinner")} />
                <br />

                {meals.dinner.map((meal, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0px",
                      paddingLeft: 40,
                      paddingRight: 40,
                    }}
                  >
                    <IconButton
                      onClick={() => removeMeal(index, "dinner")}
                      style={{ marginLeft: "10px" }}
                    >
                      <RemoveCircleIcon
                        style={{ fontSize: "30px", color: "#a83c32" }}
                      />
                    </IconButton>
                    <p style={{ fontSize: "16px" }}>{meal.name}</p>
                    <p style={{ fontSize: "16px" }}>{meal.calories} calories</p>
                    <p style={{ fontSize: "16px" }}>{meal.protein}g protein</p>

                    <div>
                      <IconButton
                        onClick={() => handleEditClick(index, "dinner")}
                        style={{}}
                      >
                        <EditIcon
                          style={{ fontSize: "30px", color: "#326da8" }}
                        />
                      </IconButton>
                    </div>
                  </div>
                ))}
                {editMealIndex !== -1 && editMealType === "dinner" && (
                  <EditMealForm
                    meal={meals.dinner[editMealIndex]}
                    onEdit={handleEditSubmit}
                  />
                )}
              </div>
            )}
            <Button
              variant="contained"
              sx={{
                border: "solid 1px #03DAC5",
                backgroundColor: "#242424",
                borderRadius: "1rem",
                width: "2rem",
                padding: "0rem 2rem 0rem 2rem",
              }}
              onClick={handleSave}
            >
              SAVE
            </Button>
            {saved && <p>Save Success!</p>}
          </div>
        </div>
      </Container>
    </LocalizationProvider>
  );
}
