import React, { useState } from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MealForm = ({ addMeal, currentState, date, userId }) => {
  const [meal, setMeal] = useState({
    name: "",
    calories: 0,
    protein: 0,
  });
  const [error, setError] = useState(null);

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

    if (!date) {
      toast.dark("Please select a date.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      return;
    }

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

    addMeal(meal, currentState, date, userId);
    setMeal({
      name: "",
      calories: 0,
      protein: 0,
    });
    setError(null);
  };

  return (
    <Container>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#262626",
            borderRadius: "10px",
          }}
        >
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
              defaultValue="test"
              onChange={handleChange}
            />
          </FormControl>

          <IconButton
            type="submit"
            onSubmit={handleSubmit}
            style={{ marginLeft: "10px" }}
          >
            <AddCircleIcon style={{ fontSize: "30px", fill: "green" }} />
          </IconButton>
        </form>
      </div>
    </Container>
  );
};

export default MealForm;
