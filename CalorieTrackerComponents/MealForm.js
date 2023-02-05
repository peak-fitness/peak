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
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

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
    if (!meal.name || !meal.calories) {
      setError(
        "Please make sure you fill in the 'Meal Name' and 'Calories' fields."
      );
      return;
    }
    if (meal.calories < 0 || meal.protein < 0) {
      setError("Amount of calories and protein cannot be lower than 0.");
      return;
    }

    addMeal({ ...meal });
    setMeal({
      name: "",
      calories: "",
      protein: "",
    });
    setError(null);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <Container>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
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

          <IconButton
            type="submit"
            onSubmit={handleSubmit}
            style={{ marginLeft: "10px" }}
          >
            <AddCircleIcon style={{ fontSize: "30px", color: "green" }} />
          </IconButton>
          {added && <span>Added!</span>}
        </form>
      </div>
    </Container>
  );
};

export default MealForm;
