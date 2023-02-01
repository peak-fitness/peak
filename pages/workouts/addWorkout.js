import Navbar from "@/comps/Navbar";
import { Box, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Grid, TextField } from "@material-ui/core";
import React, { useReducer, useState } from "react";
import styles from '../../styles/AddWorkout.module.css';


export default function AddWorkout (){

    const [open, setOpen] = useState(false);
    const [setCount, setSetCount] = useState(0);
    
    // need a reducer for each individual exercise? need to research more
    const [exercises, updateExercises] = useReducer(
        (prev, next) => {
          return { ...prev, ...next };
        },
        { name: "", notes: "", is_pr: false }
    );

    console.log(exercises.is_pr);

    const [set, updateSet] = useReducer(
        (prev, next) => {
            return { ...prev, ...next };
        },
        { reps: 0, weight: 0}
    );

    const handleSubmit = async() => {
        console.log('temp');
    }

    const handleClose = () => {
      setOpen(false);
    };

    return(
        <>
        <Navbar/>
        <Container >
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid conainer spacing={3}>
                    <Grid item lg={6}>
                        <TextField 
                        sx={{
                            backgroundColor: "#242424",
                            input: { color: "#959595" },
                            label: { color: "#959595" },
                          }}
                          fullWidth
                          id='name'
                          label='name'
                          InputProps={{endAdornment: 
                            <>
                            <Button 
                            variant="outlined" 
                            onClick={()=>setOpen(true)}
                            sx={{
                                borderRadius: "20px",
                                color: "#03DAC5",
                              }}
                            >
                              +
                            </Button>
                            <Dialog open={open} onClose={(handleClose)}>
                              <DialogTitle>Exercise Information</DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Enter Exercise Information Here
                                </DialogContentText>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="name"
                                  label="Exercise Name"
                                  fullWidth
                                  variant="standard"
                                  onChange={(e)=> updateExercises({name: e.target.value})}
                                />
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="notes"
                                  label="Notes"
                                  fullWidth
                                  variant="standard"
                                  onChange={(e)=> updateExercises({notes: e.target.value})}
                                />
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox onChange={(e)=> updateExercises({is_pr: e.target.checked})}/>} 
                                    label='Personal Best?'
                                    />
                                </FormGroup>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClose}>Submit</Button>
                              </DialogActions>
                            </Dialog>
                            </>}}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
        </>
    )

    // <>
    //       <input
    //         value={event.title}
    //         onChange={(e) => updateExercises({ title: e.target.value })}
    //       />
    //       {/* ... */}
    //     </>
}

//use one useReducer for each table in whic youre going to add to


// implement modal using below and the W3 schools link 

//   return (
//     <>
//       <input
//         value={event.title}
//         onChange={(e) => updateExercises({ title: e.target.value })}
//       />
//       {/* ... */}
//     </>
//   );
// }