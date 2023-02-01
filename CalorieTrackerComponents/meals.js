import * as React from "react";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import MealForm from "./MealForm";
import EditMealForm from "./EditMealForm";
import CaloriesBar from "./caloriesBar";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CaloriesNav from "./caloriesNav";

export default function MealContainer() {
  const [value, setValue] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

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

  const removeMeal = (mealIndex, mealType) => {
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

  return (
    <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div>
        <CaloriesNav />
        <CaloriesBar calories={totalCalories} protein={totalProtein} />
        <div align="center" justifycontent="center">
          <Tabs
            variant="fullWidth"
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
        </div>
      </div>
    </Container>
  );
}
