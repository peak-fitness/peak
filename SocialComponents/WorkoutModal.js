/*
 * PROPS
 * @setShowModal: setter for the showModal state. set to true: show modal OR false: hide modal
 * @user: has all the columns on the user table
 * @friends: list of added friends on the current user (id, addressee_id/requester_id, addressee_username/requester_username)
 * @friendWorkouts: List of workouts from the user's friends (id, notes, routine, duration, date, username)
 */
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

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

  const getDetails = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("exercises")
        .select()
        .eq("workout_id", selectedWorkout);

      console.log(data);
      setWorkoutDetails(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [selectedWorkout]);

  // console.log(user, "User");
  // console.log(friends, "Friends");
  // console.log(friendWorkouts, "Friends Workouts");

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : <div>{console.log(workoutDetails)}</div> ? (
        <h1>{selectedWorkout}</h1>
      ) : (
        <h1>{}</h1>
      )}
    </div>
  );
}
