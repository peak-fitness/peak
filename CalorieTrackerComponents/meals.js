import * as React from "react";
import { useEffect, useState } from "react";
import {
  Container,
  Tab,
  Tabs,
  Button,
  IconButton,
  Typography,
  FormControl,
} from "@mui/material";
import MealForm from "./MealForm";
import EditMealForm from "./EditMealForm";
import CaloriesBar from "./caloriesBar";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Badge, Input, TextField, withStyles } from "@material-ui/core";
import {
  LocalizationProvider,
  PickersDay,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider, styled } from "@mui/material/styles";
import styles from "@/styles/CalorieTracker.module.css";
import { useSessionContext } from "@supabase/auth-helpers-react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: { main: "#03DAC5" },
    background: "#202020",
  },
});
const CustomBadge = withStyles(() => ({
  badge: { backgroundColor: "#03DAC5" },
}))(Badge);

const CustomizedCalendar = styled(StaticDatePicker)`
  .css-1x6pt0w-MuiButtonBase-root-MuiPickersDay-root {
    background-color: #262626;
  }
`;

export default function MealContainer() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [showCalendar, setShowCalendar] = useState(false);
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [edited, setEdited] = useState(false);
  const [checkDate, setCheckDate] = useState(false);
  const [value, setValue] = useState(0);
  const [userId, setUserId] = useState(null);
  const [date, setDate] = useState(dayjs());
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [fetchMeals, setFetchMeals] = useState(null);
  const [noTarget, setNoTarget] = useState(false);
  const [targetCalories, setTargetCalories] = useState(null);
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [refresh, setRefresh] = useState(false);
  let { isLoading, error } = useSessionContext();

  useEffect(() => {
    fetchCurrentUserId();
    fetchUserMeals();
    fetchHighlightedDays();
  }, [date, saved, refresh]);

  useEffect(() => {
    handleEditClick();
  }, [date, value]);

  const fetchCurrentUserId = async () => {
    if (session) {
      const { data, error } = await supabase
        .from("user")
        .select("id, target_calories")
        .eq("auth_id", session.user.id)
        .single();
      if (!data.target_calories) setNoTarget(true);
      setUserId(data.id);
      setRefresh(true);
    }
  };

  const fetchHighlightedDays = async () => {
    let days = [];
    const { data, error } = await supabase
      .from("meals")
      .select("date, meal", "user_id")
      .eq("user_id", userId);
    if (data) {
      for (const elem of data) {
        if (
          elem.meal.breakfast.length !== 0 ||
          elem.meal.lunch.length !== 0 ||
          elem.meal.dinner.length !== 0
        ) {
          const mealDate = dayjs(elem.date);
          const formattedDate = mealDate.format("YYYY-MM-DD");
          days.push(formattedDate);
        }
      }
      setHighlightedDays(days);
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
        .eq("date", dateString)
        .single();
      if (data !== null) {
        setFetchMeals(data.meal);
        setMeals(data.meal);
      } else {
        setFetchMeals(null);
        setMeals({
          breakfast: [],
          lunch: [],
          dinner: [],
        });
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSave = async () => {
    if (date) {
      setCheckDate(true);
      const { data, error } = await supabase
        .from("meals")
        .select("meal")
        .eq("user_id", userId)
        .eq("date", date)
        .single();
      if (data) {
        const { data, error } = await supabase
          .from("meals")
          .update({
            meal: meals,
          })
          .eq("date", date);
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
      setSaved(true);
      setAdded(false);
      setDeleted(false);
      setEdited(false);
    } else {
      setCheckDate(false);
    }
  };

  const addMeal = async (meal, mealType) => {
    setMeals({
      ...meals,
      [mealType]: [...meals[mealType], meal],
    });
    setAdded(true);
  };

  const removeMeal = async (mealIndex, mealType) => {
    const removedMeal = fetchMeals[mealType][mealIndex];
    setMeals({
      ...meals,
      [mealType]: meals[mealType].filter((meal, index) => index !== mealIndex),
    });
    setDeleted(true);
  };

  const editMeal = (index, mealType, updatedMeal) => {
    const oldMeal = fetchMeals[mealType][index];
    setMeals({
      ...meals,
      [mealType]: [
        ...meals[mealType].slice(0, index),
        updatedMeal,
        ...meals[mealType].slice(index + 1),
      ],
    });
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
    setEdited(true);
  };

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from("user")
      .update({ target_calories: targetCalories })
      .match({ auth_id: session.user.id });
    setNoTarget(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography style={{ fontFamily: "Montserrat" }}>
                Select a Date:{" "}
              </Typography>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                style={{
                  backgroundColor: "#202020",
                  border: "1px solid white",
                  margin: "10px",
                }}
              >
                <CalendarMonthOutlinedIcon style={{ fill: "white" }} />
              </button>
              <Typography style={{ fontFamily: "Montserrat" }}>
                {date ? date.format("MM/DD/YYYY") : ""}
              </Typography>
            </div>
            {showCalendar && (
              <CustomizedCalendar
                sx={{
                  backgroundColor: "#202020",
                  ".MuiTypography-root": { color: "#FFFFFF" },
                }}
                displayStaticWrapperAs="desktop"
                value={date}
                onChange={(newDate) => {
                  setDate(newDate);
                  setCheckDate(true);
                  setSaved(false);
                  setAdded(false);
                  setDeleted(false);
                  setEdited(false);
                }}
                renderInput={(params) => <TextField {...params} />}
                dayOfWeekFormatter={(day) => `${day}.`}
                showToolbar
                renderDay={(day, _value, DayComponentProps) => {
                  const isSelected =
                    !DayComponentProps.outsideCurrentMonth &&
                    highlightedDays.indexOf(day.format("YYYY-MM-DD")) >= 0;

                  return (
                    <CustomBadge
                      key={day.toString()}
                      overlap="circular"
                      color="primary"
                      variant={isSelected ? "dot" : null}
                    >
                      <PickersDay {...DayComponentProps} />
                    </CustomBadge>
                  );
                }}
              />
            )}
            {noTarget ? (
              <>
                <Typography
                  variant="h6"
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Montserrat, sans serif",
                  }}
                >
                  Please enter your daily calories goal to use the Calorie
                  Tracker
                </Typography>
                <div className={styles.target}>
                  <FormControl>
                    <Input
                      id="target-calories"
                      type="number"
                      name="target-calories"
                      style={{
                        color: "white",
                        fontFamily: "Montserrat, sans serif",
                      }}
                      value={targetCalories ? targetCalories : ""}
                      onChange={(e) => {
                        e.preventDefault();
                        setTargetCalories(Number(e.target.value));
                      }}
                    />
                    <button
                      className={styles.viewWorkoutBtn}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </FormControl>
                </div>
              </>
            ) : (
              <>
                <CaloriesBar
                  userId={userId}
                  date={date}
                  saved={saved}
                  meals={meals}
                  added={added}
                  deleted={deleted}
                  edited={edited}
                />
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
                      <MealForm
                        addMeal={(meal) => addMeal(meal, "breakfast")}
                      />
                      <br />
                      {!added && !deleted && !edited && !saved
                        ? fetchMeals &&
                          fetchMeals.breakfast.map((meal, index) => (
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
                              <p style={{ fontSize: "16px" }}>
                                {meal.calories} calories
                              </p>
                              <p style={{ fontSize: "16px" }}>
                                {meal.protein}g protein
                              </p>

                              <div>
                                <IconButton
                                  onClick={() =>
                                    handleEditClick(index, "breakfast")
                                  }
                                  style={{}}
                                >
                                  <EditIcon
                                    style={{
                                      fontSize: "30px",
                                      color: "#326da8",
                                    }}
                                  />
                                </IconButton>
                              </div>
                            </div>
                          ))
                        : meals &&
                          meals.breakfast.map((meal, index) => (
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
                              <p style={{ fontSize: "16px" }}>
                                {meal.calories} calories
                              </p>
                              <p style={{ fontSize: "16px" }}>
                                {meal.protein}g protein
                              </p>

                              <div>
                                <IconButton
                                  onClick={() =>
                                    handleEditClick(index, "breakfast")
                                  }
                                  style={{}}
                                >
                                  <EditIcon
                                    style={{
                                      fontSize: "30px",
                                      color: "#326da8",
                                    }}
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
                      {!added && !deleted && !edited && !saved
                        ? fetchMeals &&
                          fetchMeals.lunch.map((meal, index) => (
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
                              <p style={{ fontSize: "16px" }}>
                                {meal.calories} calories
                              </p>
                              <p style={{ fontSize: "16px" }}>
                                {meal.protein}g protein
                              </p>

                              <div>
                                <IconButton
                                  onClick={() =>
                                    handleEditClick(index, "lunch")
                                  }
                                  style={{}}
                                >
                                  <EditIcon
                                    style={{
                                      fontSize: "30px",
                                      color: "#326da8",
                                    }}
                                  />
                                </IconButton>
                              </div>
                            </div>
                          ))
                        : meals &&
                          meals.lunch.map((meal, index) => (
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
                              <p style={{ fontSize: "16px" }}>
                                {meal.calories} calories
                              </p>
                              <p style={{ fontSize: "16px" }}>
                                {meal.protein}g protein
                              </p>

                              <div>
                                <IconButton
                                  onClick={() =>
                                    handleEditClick(index, "lunch")
                                  }
                                  style={{}}
                                >
                                  <EditIcon
                                    style={{
                                      fontSize: "30px",
                                      color: "#326da8",
                                    }}
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
                      {!added && !deleted && !edited && !saved
                        ? fetchMeals &&
                          fetchMeals.dinner.map((meal, index) => (
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
                              <p style={{ fontSize: "16px" }}>
                                {meal.calories} calories
                              </p>
                              <p style={{ fontSize: "16px" }}>
                                {meal.protein}g protein
                              </p>

                              <div>
                                <IconButton
                                  onClick={() =>
                                    handleEditClick(index, "dinner")
                                  }
                                  style={{}}
                                >
                                  <EditIcon
                                    style={{
                                      fontSize: "30px",
                                      color: "#326da8",
                                    }}
                                  />
                                </IconButton>
                              </div>
                            </div>
                          ))
                        : meals &&
                          meals.dinner.map((meal, index) => (
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
                              <p style={{ fontSize: "16px" }}>
                                {meal.calories} calories
                              </p>
                              <p style={{ fontSize: "16px" }}>
                                {meal.protein}g protein
                              </p>

                              <div>
                                <IconButton
                                  onClick={() =>
                                    handleEditClick(index, "dinner")
                                  }
                                  style={{}}
                                >
                                  <EditIcon
                                    style={{
                                      fontSize: "30px",
                                      color: "#326da8",
                                    }}
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
                      display: "flex",
                      justifyContent: "space-between",
                      width: "20%",
                      mt: 3,
                      mb: 3,
                      color: "#161616",
                      background:
                        "linear-gradient(90deg, #03dac5, #56ca82, #89b33e, #b59500, #da6b03)",
                      fontFamily: "Montserrat",
                      justifyContent: "center",
                    }}
                    onClick={handleSave}
                  >
                    SAVE
                  </Button>
                  {!checkDate && <p>Please Select Date!</p>}
                </div>
              </>
            )}
          </div>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
