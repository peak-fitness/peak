/*
 * PROPS
 * @setShowModal: setter for the showModal state. set to true: show modal OR false: hide modal
 * @user: has all the columns on the user table
 * @friends: list of added friends on the current user (id, addressee_id/requester_id, addressee_username/requester_username)
 * @friendWorkouts: List of workouts from the user's friends (id, notes, routine, duration, date, username)
 */
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import Button from "@mui/material/Button";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import styles from "@/styles/socialModal.module.css";

export default function WorkoutModal({ setShowModal, selectedWorkout }) {
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const [workoutDisplayed, setWorkoutDisplayed] = useState("");
  const [singleWorkout, setSingleWorkout] = useState("");

  const handleToggle = () => {
    const el = document.querySelector("body");
    el.classList.toggle("modal-open");
    setShowModal(false);
  };

  const handleSelector = (e) => {
    setWorkoutDisplayed(e.target.firstChild.textContent);
    const setWorkout = workoutDetails.find(
      (workout) => workout.name === e.target.firstChild.textContent
    );
    setSingleWorkout(setWorkout);
  };

  const getDetails = useCallback(async () => {
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
      console.error(error);
      setError(error);
    }
  }, [selectedWorkout.workoutId]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  useEffect(() => {
    if (workoutDetails) {
      if (!singleWorkout) {
        setWorkoutDisplayed(workoutDetails[0].name);
        setSingleWorkout(workoutDetails[0]);
      }
    }
  }, [workoutDetails, singleWorkout, workoutDisplayed]);

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
        ) : workoutDetails && singleWorkout ? (
          <>
            <div className={styles.exerciseBox}>
              <p className={styles.header}>{selectedWorkout.workoutName}</p>
              <div className={styles.workoutDetails}>
                <div className={styles.duration}>
                  <TimerOutlinedIcon
                    id={styles.icon}
                    className={""}
                    sx={{ color: "#fafafa", height: "20px", width: "20px" }}
                  />
                  <p>{`${Math.floor(selectedWorkout.workoutDuration / 60)}hr ${
                    selectedWorkout.workoutDuration % 60
                  }min`}</p>
                </div>
                <p>{selectedWorkout.workoutDate}</p>
              </div>
            </div>
            <div className={styles.exerciseSelector}>
              {workoutDetails.map((workout) => (
                <div
                  key={workout.id}
                  onClick={handleSelector}
                  className={
                    workoutDisplayed === workout.name
                      ? `${styles.exercise} ${styles.active}`
                      : `${styles.exercise}`
                  }
                >
                  <p>{workout.name}</p>
                  {workout.is_pr && <p className={styles.personalRecord}>PR</p>}
                </div>
              ))}
            </div>
            <div className={styles.workoutContainer}>
              <div className={styles.details}>
                <div className={styles.muscleGroupContainer}>
                  <p className={styles.detailHeader}>Muscle Group</p>
                  {singleWorkout.muscle_group && (
                    <p className={styles.muscleGroup}>
                      {singleWorkout.muscle_group}
                    </p>
                  )}
                </div>
                <div className={styles.notesContainer}>
                  <p className={styles.detailHeader}>Notes</p>
                  <p className={styles.notes}>
                    {singleWorkout.notes !== undefined
                      ? singleWorkout.notes.length > 0
                        ? singleWorkout.notes
                        : "No notes"
                      : ""}
                  </p>
                </div>
              </div>
              <p className={styles.setContainerHeader}>Sets</p>
              <div className={styles.setContainer}>
                {singleWorkout.sets &&
                  singleWorkout.sets.map((set, idx) => {
                    return (
                      <div key={set.id} className={styles.sets}>
                        <p className={styles.setNumber}>{idx + 1}</p>
                        <div className={styles.weightContainer}>
                          <p>Weight</p>
                          <p>{set.weight}</p>
                        </div>
                        <div className={styles.repsContainer}>
                          <p>Reps</p>
                          <p>{set.reps}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <h3>{Error ? Error.message : ""}</h3>
        )}
      </div>
    </div>
  );
}
