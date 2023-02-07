import React, { useState } from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

const EditMealForm = ({ meal, onEdit }) => {
  const [name, setName] = useState(meal && meal.name);
  const [calories, setCalories] = useState(meal && parseInt(meal.calories));
  const [protein, setProtein] = useState(meal && parseInt(meal.protein));

  const handleSubmit = (event) => {
    event.preventDefault();
    onEdit({ name, calories, protein });
  };

  return (
    <Container>
      <FormControl>
        <InputLabel htmlFor="meal-name">Meal Name</InputLabel>
        <Input
          id="meal-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="calories">Calories</InputLabel>
        <Input
          id="calories"
          type="number"
          value={calories}
          onChange={(event) => setCalories(Number(event.target.value))}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="protein">Protein (g)</InputLabel>
        <Input
          id="protein"
          type="number"
          value={protein}
          onChange={(event) => setProtein(Number(event.target.value))}
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        size="medium"
        style={{
          borderRadius: 35,
          backgroundColor: "#6D6D6D",
          padding: "9px 18px",
          fontSize: "9px",
          marginTop: "20px",
          marginLeft: "10px",
        }}
        onClick={handleSubmit}
      >
        Edit
      </Button>
    </Container>
  );
};

export default EditMealForm;
