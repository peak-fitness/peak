import Navbar from "@/comps/Navbar";
import { Box, Button, Checkbox, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Input, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@material-ui/core";
import React, { useReducer, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle"


export default function AddWorkout (){

    const [open, setOpen] = useState(false);
    const [setCount, setSetCount] = useState(1);
    
    // need a reducer for each individual exercise? need to research more
    const [exercises, updateExercises] = useReducer(
        (prev, next) => {
          return { ...prev, ...next };
        },
        { name: "", notes: "", is_pr: false }
    );

    const [set, updateSet] = useReducer(
        (prev, next) => {
            return { ...prev, ...next };
        },
        {id: 1, reps: 1, weight: 0}
    );

    console.log(set);

    const handleSubmit = async() => {
        console.log('temp');
    }

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (e) => {
        if (e.target.name === 'set') updateSet({ id: e.target.value})
        else if (e.target.name === 'reps') {
            e.target.value < 1 ? e.target.value = 1 : e.target.value;
            updateSet({reps: Number(e.target.value)})
        }
        else if (e.target.name === 'weight') {
            e.target.value < 1 ? e.target.value = 0 : e.target.value;
            updateSet({weight: Number(e.target.value)})
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (set.reps === 0) return;
    }

    return(
        <>
        <Container sx={{justifyContent: 'center', minHeight: '100vh'}}>
        <CssBaseline/>
        <Navbar/>
            {/* <Paper elevation={3}
                style={{ backgroundColor: "#202020" }}
                > */}
            <Box>
                <Typography variant='h3'
                align='center'
                sx={{
                    display: 'flex', 
                    fontFamily: 'Montserrat',
                    justifyContent: 'center'
                }}>Add a Workout</Typography>
            </Box>  
            <Box component="form" onSubmit={handleSubmit} 
            sx={{ 
                mt: 3
            }}>
                <Grid container spacing={6}>
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
                                // "&.MuiButton-text": { color: "#808080" },
                                // border: "2px black solid"
                              }}
                            >
                              +
                            </Button>
                            <Dialog open={open} onClose={(handleClose)} fullWidth={true}>
                              <DialogTitle style={{textDecoration: 'underline'}}>Exercise Information</DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Please enter information about your exercise below
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
                                <FormControl>
                                        <InputLabel htmlFor="set-number">Set #</InputLabel>
                                        <Input 
                                        id='set-number'
                                        type='number'
                                        name='set'
                                        value={set.id}
                                        disabled={true}
                                        // onChange={handleChange}
                                        />
                                </FormControl>
                                <FormControl>
                                        <InputLabel htmlFor="rep-count"># of Reps</InputLabel>
                                        <Input
                                        id='rep-count'
                                        type='number'
                                        name='reps'
                                        value={set.reps}
                                        onChange={handleChange}
                                        />
                                </FormControl>
                                <FormControl>
                                        <InputLabel htmlFor='weight'>Weight (lbs)</InputLabel>
                                        <Input
                                        id='weight'
                                        type='number'
                                        name='weight'
                                        value={set.weight}
                                        onChange={handleChange}
                                        />
                                </FormControl>
                                    {/* <InputLabel id='set-count'># of Sets</InputLabel>
                                    <Select
                                        labelId="set-count"
                                        id='sets'
                                        value={setCount}
                                        label='# of Sets'
                                        onChange={(e)=>setSetCount(e.target.value)}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                        </Select> */}
                                        {/* redo this logic, use Jahed's calorie tracker to add a set bar to post and then keep going  */}
                                {/* </FormControl> */}
                                <IconButton onClick={handleClick} style={{marginLeft: '10px'}}>
                                    <AddCircleIcon style={{ fontSize: "30px", color: "green" }}/>
                                </IconButton>
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
            {/* </Paper> */}
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