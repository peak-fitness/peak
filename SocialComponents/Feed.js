import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/Groups.module.css";
import { useEffect, useState } from "react";
import WorkoutModal from "./WorkoutModal";

export default function Feed({ user, friends }) {
  const [friendWorkouts, setFriendWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const handleModalClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    fetchFriendWorkouts();
  }, [friends]);

  return (
    <div className={styles.groupsContainer}>
      {showModal ? (
        <WorkoutModal
          setShowModal={setShowModal}
          user={user}
          friends={friends}
          friendWorkouts={friendWorkouts}
        />
      ) : null}
      {/* component stuff */}
      <div className={styles.groups}>
        {friendWorkouts.map((workout) => (
          <div key={workout.id} className={styles.workout}>
            <p>{workout.routine}</p>
            <p>{workout.notes}</p>
            <p>{workout.duration}</p>
            <p>{workout.date}</p>
            <p>{workout.username}</p>
            <button onClick={handleModalClick}>View Workout</button>
          </div>
        ))}
        {/* props */}
      </div>
    </div>
  );
}
