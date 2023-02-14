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
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Modal } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

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

  .MuiInputBase-input {
    color: white;
  }

  .css-1300cgj h4.MuiTypography-root {
    color: #03dac5;
  }

  .css-1lelqnx {
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
  const [date, setDate] = useState(null);
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
      .from("user")
      .select(
        `
        auth_id, meals (
          date, meal
        )
      `
      )
      .eq("auth_id", session.user.id)
      .single();
    for (const elem of data.meals) {
      if (
        elem.meal.breakfast.length ||
        elem.meal.lunch.length ||
        elem.meal.dinner.length
      ) {
        const mealDate = dayjs(elem.date);
        const formattedDate = mealDate.format("YYYY-MM-DD");
        days.push(formattedDate);
      }
    }
    setHighlightedDays(days);
  };

  const fetchUserMeals = async () => {
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
          )`
        )
        .eq("auth_id", session.user.id)
        .eq("meals.date", dateString)
        .single();
      if (data.meals.length) {
        setFetchMeals(data.meals[0].meal);
        setMeals(data.meals[0].meal);
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
        .from("user")
        .select(
          `
          auth_id, meals (
            *
          )
        `
        )
        .eq("auth_id", session.user.id)
        .eq("meals.date", date)
        .single();
      if (data.meals.length) {
        await supabase
          .from("meals")
          .delete()
          .eq("date", date)
          .eq("user_id", userId);
      }
      await supabase
        .from("meals")
        .insert({
          user_id: userId,
          date: date,
          meal: meals,
        })
        .select("*");
      setSaved(true);
      setAdded(false);
      setDeleted(false);
      setEdited(false);
    } else {
      setCheckDate(false);
    }
  };

  const addMeal = (meal, type, date, userId) => {
    const newMeals = { ...meals };
    newMeals[type].push(meal);
    setMeals(newMeals);
    setAdded(true);

    handleSave(date, userId, newMeals);
  };

  const removeMeal = (mealIndex, mealType) => {
    const newMeals = { ...meals };
    const removedMeal = newMeals[mealType][mealIndex];
    newMeals[mealType].splice(mealIndex, 1);
    setMeals(newMeals);
    setDeleted(true);
    handleSave(date, userId, removedMeal);
  };

  const editMeal = async (index, mealType, updatedMeal, date, userId) => {
    const newMeals = { ...meals };
    newMeals[mealType][index] = updatedMeal;
    setMeals(newMeals);
    setEdited(true);
    await supabase
      .from("meals")
      .update({ meal: newMeals })
      .eq("user_id", userId)
      .eq("date", date);
  };

  const [editMealIndex, setEditMealIndex] = useState(-1);
  const [editMealType, setEditMealType] = useState("");

  const handleEditClick = (index, mealType) => {
    setEditMealIndex(index);
    setEditMealType(mealType);
  };

  const handleEditSubmit = (updatedMeal) => {
    editMeal(editMealIndex, editMealType, updatedMeal, date, userId);
    setEditMealIndex(-1);
    setEditMealType("");
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
              <Button
                onClick={() => setShowCalendar(true)}
                style={{
                  backgroundColor: "#202020",
                  border: "1px solid white",
                  margin: "10px",
                }}
              >
                <CalendarMonthOutlinedIcon style={{ fill: "white" }} />
              </Button>
              <Typography style={{ fontFamily: "Montserrat" }}>
                {date ? date.format("MM/DD/YYYY") : "MM/DD/YYYY"}
              </Typography>
            </div>
            <Modal open={showCalendar} onClose={() => setShowCalendar(false)}>
              <div
                style={{
                  backgroundColor: "#202020",
                  padding: "20px",
                  margin: "100px",
                }}
              >
                <CustomizedCalendar
                  sx={{
                    backgroundColor: "#202020",
                    ".MuiTypography-root": { color: "#FFFFFF" },
                    "h4.MuiTypography-root": { color: "#03dac5" },
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
              </div>
            </Modal>

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
                  date={date}
                  saved={saved}
                  meals={meals}
                  added={added}
                  deleted={deleted}
                  edited={edited}
                />
                <div
                  align="center"
                  justifycontent="center"
                  className={styles.tabs}
                >
                  <Tabs
                    letiant="fullWidth"
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
                        date={date}
                        userId={userId}
                      />
                      <br />
                      <TableContainer
                        style={{
                          backgroundColor: "#202020",
                          width: "70rem",
                        }}
                      >
                        {!added && !deleted && !edited && !saved ? (
                          <Table>
                            <TableBody>
                              {fetchMeals &&
                                fetchMeals.breakfast.map((meal, index) => (
                                  <TableRow key={index}>
                                    <TableCell style={{ borderBottom: "none" }}>
                                      <IconButton
                                        onClick={() =>
                                          removeMeal(index, "breakfast")
                                        }
                                        style={{ marginLeft: "10px" }}
                                      >
                                        <RemoveCircleIcon
                                          style={{
                                            fontSize: "30px",
                                            color: "#a83c32",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.name}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.calories} calories
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.protein}g protein
                                    </TableCell>
                                    <TableCell style={{ borderBottom: "none" }}>
                                      <IconButton
                                        onClick={() =>
                                          handleEditClick(index, "breakfast")
                                        }
                                      >
                                        <EditIcon
                                          style={{
                                            fontSize: "30px",
                                            color: "#326da8",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <Table>
                            <TableBody>
                              {meals &&
                                meals.breakfast.map((meal, index) => (
                                  <TableRow key={index}>
                                    <TableCell style={{ borderBottom: "none" }}>
                                      <IconButton
                                        onClick={() =>
                                          removeMeal(index, "breakfast")
                                        }
                                        style={{ marginLeft: "10px" }}
                                      >
                                        <RemoveCircleIcon
                                          style={{
                                            fontSize: "30px",
                                            color: "#a83c32",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>

                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.name}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.calories} calories
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.protein}g protein
                                    </TableCell>
                                    <TableCell style={{ borderBottom: "none" }}>
                                      <IconButton
                                        onClick={() =>
                                          handleEditClick(index, "breakfast")
                                        }
                                      >
                                        <EditIcon
                                          style={{
                                            fontSize: "30px",
                                            color: "#326da8",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        )}
                      </TableContainer>
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
                      <MealForm
                        addMeal={(meal) => addMeal(meal, "lunch")}
                        date={date}
                        userId={userId}
                      />
                      <br />
                      <TableContainer
                        style={{
                          backgroundColor: "#202020",
                          width: "70rem",
                        }}
                      >
                        {!added && !deleted && !edited && !saved ? (
                          <Table>
                            <TableBody>
                              {fetchMeals &&
                                fetchMeals.lunch.map((meal, index) => (
                                  <TableRow key={index}>
                                    <TableCell style={{ borderBottom: "none" }}>
                                      <IconButton
                                        onClick={() =>
                                          removeMeal(index, "lunch")
                                        }
                                        style={{ marginLeft: "10px" }}
                                      >
                                        <RemoveCircleIcon
                                          style={{
                                            fontSize: "30px",
                                            color: "#a83c32",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.name}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.calories} calories
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.protein}g protein
                                    </TableCell>
                                    <TableCell style={{ borderBottom: "none" }}>
                                      <IconButton
                                        onClick={() =>
                                          handleEditClick(index, "lunch")
                                        }
                                      >
                                        <EditIcon
                                          style={{
                                            fontSize: "30px",
                                            color: "#326da8",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <Table>
                            <TableBody>
                              {meals &&
                                meals.lunch.map((meal, index) => (
                                  <TableRow key={index}>
                                    <TableCell style={{ borderBottom: "none" }}>
                                      <IconButton
                                        onClick={() =>
                                          removeMeal(index, "lunch")
                                        }
                                        style={{ marginLeft: "10px" }}
                                      >
                                        <RemoveCircleIcon
                                          style={{
                                            fontSize: "30px",
                                            color: "#a83c32",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>

                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.name}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.calories} calories
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.protein}g protein
                                    </TableCell>
                                    <TableCell style={{ borderBottom: "none" }}>
                                      <IconButton
                                        onClick={() =>
                                          handleEditClick(index, "lunch")
                                        }
                                      >
                                        <EditIcon
                                          style={{
                                            fontSize: "30px",
                                            color: "#326da8",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        )}
                      </TableContainer>
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
                      <MealForm
                        addMeal={(meal) => addMeal(meal, "dinner")}
                        date={date}
                        userId={userId}
                      />
                      <br />
                      <TableContainer
                        style={{
                          backgroundColor: "#202020",
                          width: "70rem",
                        }}
                      >
                        {!added && !deleted && !edited && !saved ? (
                          <Table>
                            <TableBody>
                              {fetchMeals &&
                                fetchMeals.dinner.map((meal, index) => (
                                  <TableRow key={index}>
                                    <TableCell style={{ borderBottom: "none" }}>
                                      <IconButton
                                        onClick={() =>
                                          removeMeal(index, "dinner")
                                        }
                                        style={{ marginLeft: "10px" }}
                                      >
                                        <RemoveCircleIcon
                                          style={{
                                            fontSize: "30px",
                                            color: "#a83c32",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.name}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.calories} calories
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.protein}g protein
                                    </TableCell>
                                    <TableCell style={{ borderBottom: "none" }}>
                                      <IconButton
                                        onClick={() =>
                                          handleEditClick(index, "dinner")
                                        }
                                      >
                                        <EditIcon
                                          style={{
                                            fontSize: "30px",
                                            color: "#326da8",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <Table>
                            <TableBody>
                              {meals &&
                                meals.dinner.map((meal, index) => (
                                  <TableRow key={index}>
                                    <TableCell style={{ borderBottom: "none" }}>
                                      <IconButton
                                        onClick={() =>
                                          removeMeal(index, "dinner")
                                        }
                                        style={{ marginLeft: "10px" }}
                                      >
                                        <RemoveCircleIcon
                                          style={{
                                            fontSize: "30px",
                                            color: "#a83c32",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>

                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.name}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.calories} calories
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        color: "white",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {meal.protein}g protein
                                    </TableCell>
                                    <TableCell style={{ borderBottom: "none" }}>
                                      <IconButton
                                        onClick={() =>
                                          handleEditClick(index, "dinner")
                                        }
                                      >
                                        <EditIcon
                                          style={{
                                            fontSize: "30px",
                                            color: "#326da8",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        )}
                      </TableContainer>
                      {editMealIndex !== -1 && editMealType === "dinner" && (
                        <EditMealForm
                          meal={meals.dinner[editMealIndex]}
                          onEdit={handleEditSubmit}
                        />
                      )}
                    </div>
                  )}
                  {/* <Button
                    variant="contained"
                    sx={{
                      display: "flex",
                      width: "20%",
                      mt: 3,
                      mb: 3,
                      color: "#161616",
                      background:
                        "linear-gradient(90deg, #03dac5, #56ca82, #89b33e, #b59500, #da6b03)",
                      fontFamily: "Montserrat",
                      justifyContent: "center",
                      fontSize: "15px",
                    }}
                    onClick={handleSave}
                  >
                    SAVE
                  </Button> */}
                  {/* {!checkDate && (
                    <p style={{ color: "#FF3434" }}>*Please Select A Date!</p>
                  )} */}
                </div>
              </>
            )}
          </div>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
