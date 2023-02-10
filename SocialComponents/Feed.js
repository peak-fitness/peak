import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/Groups.module.css";
import { useCallback, useEffect, useState } from "react";
import WorkoutModal from "./WorkoutModal";
import TimerIcon from "@mui/icons-material/Timer";

export default function Feed({ user, friends }) {
  const [friendWorkouts, setFriendWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [scrollContainer, setScrollContainer] = useState(
    document.getElementById("feed-container")
  );
  // console.log("USER", user);
  // console.log("WORKOUTSSS", friendWorkouts);
  const fetchFriendWorkouts = useCallback(async () => {
    const friendWorkOutArr = [];
    if (user.id) {
      const userWorkouts = await supabase
        .from("workout")
        .select("*")
        .eq("user_id", user.id);
      if (userWorkouts.data) {
        friendWorkOutArr.push(...userWorkouts.data);
      }
    }
    for (const index in friends) {
      if (friends[index].requester_id) {
        // console.log("-----TEST------");
        const workout = await supabase
          .from("workout")
          .select("id, notes, routine, duration, date")
          .eq("user_id", friends[index].requester_id);
        workout.data.forEach(
          (singleWorkout) =>
            (singleWorkout.username = friends[index].requester_username)
        );
        friendWorkOutArr.push(...workout.data);
      } else {
        const workout = await supabase
          .from("workout")
          .select("id, notes, routine, duration, date")
          .eq("user_id", friends[index].addressee_id);
        workout.data.forEach(
          (singleWorkout) =>
            (singleWorkout.username = friends[index].addressee_username)
        );
        friendWorkOutArr.push(...workout.data);
      }
    }
    setFriendWorkouts(friendWorkOutArr);
    friendWorkOutArr.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }, [friends, user.id]);

  //   window.onload = function () {
  //     const feedContainer = document.getElementById("feedContainer");
  //     feedContainer.scrollTop = feedContainer.scrollHeight;
  //   };

  const handleModalClick = (evt, workoutUsername) => {
    const el = document.querySelector("body");
    el.classList.toggle("modal-open");
    setSelectedWorkout({
      workoutId: evt.target.value,
      workoutUsername,
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetchFriendWorkouts();
  }, [fetchFriendWorkouts]);

  return (
    <div id="feed-container" className={styles.feedContainer}>
      {showModal ? <div className={styles.modalContainer}></div> : null}
      {showModal ? (
        <WorkoutModal
          setShowModal={setShowModal}
          user={user}
          friends={friends}
          friendWorkouts={friendWorkouts}
          selectedWorkout={selectedWorkout}
        />
      ) : null}
      {/* component stuff */}
      <div className={styles.mainFeed}>
        <div className={styles.feed}>
          {friendWorkouts.length === 0 ? (
            <p className={styles.noFeed}>
              Your friends haven&apos;t uploaded any workouts or add friends to
              see their workouts!
            </p>
          ) : (
            friendWorkouts.map((workout) => (
              <div
                key={workout.id}
                className={`${styles.workoutContainer} ${styles.myWorkout}`}
              >
                <div className={styles.workoutHeader}>
                  <p className={styles.feedUsername}>
                    {workout.username ? workout.username : user.username}
                  </p>
                  <p className={styles.date}>{workout.date}</p>
                </div>

                <div className={styles.workout}>
                  <p>Here&apos;s my workout for the day!</p>
                  <hr />
                  {/* <p>Notes: {workout.notes}</p> */}
                  <div className={styles.details}>
                    <p>Routine: {workout.routine}</p>
                    <div className={styles.duration}>
                      <TimerIcon
                        sx={{
                          color: "#fafafa",
                          height: "40px",
                          width: "40px",
                        }}
                      />
                      <p>{workout.duration} minutes</p>
                    </div>
                  </div>
                  <button
                    className={styles.viewWorkoutBtn}
                    value={workout.id}
                    onClick={(e) => {
                      handleModalClick(e, workout.username);
                    }}
                  >
                    View Workout
                  </button>
                </div>
              </div>
            ))
          )}
          {/* props */}
        </div>
      </div>
    </div>
  );
}
