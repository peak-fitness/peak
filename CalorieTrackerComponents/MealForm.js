import React, { useState } from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";

const MealForm = ({ addMeal }) => {
  const [meal, setMeal] = useState({
    name: "",
    calories: "",
    protein: "",
  });

  const handleChange = (e) => {
    setMeal({
      ...meal,
      [e.target.name]:
        e.target.name === "calories" || e.target.name === "protein"
          ? Number.isNaN(parseInt(e.target.value))
            ? ""
            : parseInt(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!meal.name || !meal.calories || !meal.protein) {
      return;
    }

    addMeal({ ...meal });
    setMeal({
      name: "",
      calories: "",
      protein: "",
    });
  };

  return (
    <Container>
      <div>
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#262626" }}>
          <FormControl>
            <InputLabel htmlFor="meal-name">Meal Name</InputLabel>
            <Input
              id="meal-name"
              type="text"
              name="name"
              value={meal.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="meal-calories">Calories</InputLabel>
            <Input
              id="meal-calories"
              type="number"
              name="calories"
              value={meal.calories}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="meal-protein">Protein</InputLabel>
            <Input
              id="meal-protein"
              type="number"
              name="protein"
              value={meal.protein}
              onChange={handleChange}
            />
          </FormControl>

          <IconButton onClick={handleSubmit} style={{ marginLeft: "10px" }}>
            <AddCircleIcon style={{ fontSize: "30px", color: "green" }} />
          </IconButton>
        </form>
      </div>
    </Container>
  );
};

export default MealForm;
