import { Box, Container } from "@material-ui/core";
import React, { useReducer, useState,  } from "react";

export default function AddWorkout (){

    return(
        <Container >
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            </Box>
        </Container>
    )
}

// function Edit()) {
//   const [exercise, updateExercise] = useReducer(
//     (prev, next) => {
//       return { ...prev, ...next };
//     },
//     { name: "", notes: "", is_pr: false }
//   );

//   return (
//     <>
//       <input
//         value={event.title}
//         onChange={(e) => updateExercise({ title: e.target.value })}
//       />
//       {/* ... */}
//     </>
//   );
// }