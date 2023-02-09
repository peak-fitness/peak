/*
 * PROPS
 * @setShowModal: setter for the showModal state. set to true: show modal OR false: hide modal
 * @user: has all the columns on the user table
 * @friends: list of added friends on the current user (id, addressee_id/requester_id, addressee_username/requester_username)
 * @friendWorkouts: List of workouts from the user's friends (id, notes, routine, duration, date, username)
 */
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import styles from "@/styles/socialModal.module.css";

export default function WorkoutModal({
  setShowModal,
  user,
  friends,
  friendWorkouts,
  selectedWorkout,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const getDetails = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("exercises")
        .select(`*, sets (*)`)
        .eq("workout_id", selectedWorkout.workoutId);
      const username = await supabase.from("user").select("username").eq("");
      setWorkoutDetails(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleToggle = () => {
    const el = document.querySelector("body");
    el.classList.toggle("modal-open");
    setShowModal(false);
  };

  useEffect(() => {
    getDetails();
  }, [selectedWorkout]);

  // console.log(user, "User");
  // console.log(friends, "Friends");
  // console.log(friendWorkouts, "Friends Workouts");

  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <div className={styles.btnBox}>
          <Button className={styles.closeBtn} onClick={handleToggle}>
            Close
          </Button>
        </div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : workoutDetails ? (
          workoutDetails.map((exercise) => (
            <div key={exercise.id}>
              <div className={styles.exerciseBox}>
                <h3 className={styles.header}>{exercise.name}</h3>
                {exercise.muscle_group && (
                  <p className={styles.header}>{exercise.muscle_group}</p>
                )}
                {exercise.is_pr && (
                  <p className={styles.header}>Personal Record</p>
                )}
                {exercise.notes && (
                  <p className={styles.header}>{exercise.notes}</p>
                )}
              </div>
              {exercise.sets.map((set, idx) => {
                return (
                  // <div className="setsBox" key={set.id}>
                  <Grid container key={set.id}>
                    <Grid className={styles.setsItem} item xs={4}>
                      <h4>{`Set: ${idx + 1}`}</h4>
                    </Grid>
                    <Grid className={styles.setsItem} item xs={4}>
                      <p>{`Reps: ${set.reps}`}</p>
                    </Grid>
                    <Grid className={styles.setsItem} item xs={4}>
                      <p>{`Weight: ${set.weight}`}</p>
                    </Grid>
                  </Grid>
                  // </div>
                );
              })}
            </div>
          ))
        ) : (
          <h3>{Error ? Error.message : ""}</h3>
        )}
      </div>
    </div>
  );
}
