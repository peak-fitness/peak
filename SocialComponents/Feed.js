import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/Groups.module.css";
import { useEffect, useState } from "react";
import WorkoutModal from "./WorkoutModal";
import TimerIcon from "@mui/icons-material/Timer";

export default function Feed({ user, friends }) {
  const [friendWorkouts, setFriendWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [scrollContainer, setScrollContainer] = useState(
    document.getElementById("feed-container")
  );
  //   console.log("USER", user);
  //   console.log("FRIENDS", friends);
  const fetchFriendWorkouts = async () => {
    const friendWorkOutArr = [];
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
  };

  //   window.onload = function () {
  //     const feedContainer = document.getElementById("feedContainer");
  //     feedContainer.scrollTop = feedContainer.scrollHeight;
  //   };

  const handleModalClick = (evt) => {
    const el = document.querySelector("body");
    el.classList.toggle("modal-open");
    setSelectedWorkout(evt.target.value);
    setShowModal(true);
  };

  useEffect(() => {
    fetchFriendWorkouts();
  }, [friends]);

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
          {friendWorkouts.map((workout) => (
            <div key={workout.id} className={styles.workoutContainer}>
              <div className={styles.workoutHeader}>
                <p className={styles.feedUsername}>{workout.username}</p>
                <p className={styles.date}>{workout.date}</p>
              </div>

              <div className={styles.workout}>
                <p>{workout.username} just finished their workout!</p>
                <hr />
                <p>Routine: {workout.routine}</p>
                <p>Notes: {workout.notes}</p>
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
                <button
                  className={styles.viewWorkoutBtn}
                  value={workout.id}
                  onClick={handleModalClick}
                >
                  View Workout
                </button>
              </div>
            </div>
          ))}
          {/* props */}
        </div>
      </div>
    </div>
  );
}
