import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/Groups.module.css";
import { useCallback, useEffect, useState } from "react";
import WorkoutModal from "./WorkoutModal";
import TimerIcon from "@mui/icons-material/Timer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  heart: {
    color: "red",
  },
});

export default function Feed({ user, friends }) {
  const [friendWorkouts, setFriendWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const classes = useStyles();
  const [likes, setLikes] = useState({});
  const [liked, setLiked] = useState(false);

  const fetchFriendWorkouts = useCallback(async () => {
    const friendWorkOutArr = [];

    for (const index in friends) {
      if (friends[index].requester_id) {
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
  }, [friends]);

  const handleModalClick = (
    evt,
    workoutUsername,
    workoutDuration,
    workoutDate,
    workoutName
  ) => {
    const el = document.querySelector("body");
    el.classList.toggle("modal-open");
    setSelectedWorkout({
      workoutId: evt.target.value,
      workoutUsername,
      workoutDuration,
      workoutDate,
      workoutName,
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetchFriendWorkouts();
  }, [fetchFriendWorkouts]);

  const handleLikeClick = async (id) => {
    const { data, error } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", user.id)
      .eq("workout_id", id);

    if (data.length === 1) {
      console.log("hi");
    } else {
      await supabase.from("likes").insert({
        user_id: user.id,
        workout_id: id,
      });
    }
    setLiked(true);

    // setLikes(data.length);
    // useEffect with like dependency for re-render
  };

  const getLikes = useCallback(async () => {
    for (const workout of friendWorkouts) {
      const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("workout_id", workout.id);
      if (data) {
        const newState = { ...likes, [workout.id]: data.length };
        setLikes(newState);
      } else {
        const newState = { ...likes, [workout.id]: 0 };
        setLikes(newState);
      }
    }
  }, []);

  useEffect(() => {
    getLikes();
  }, []);

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
              see more workouts!
            </p>
          ) : (
            <>
              {friendWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className={`${styles.workoutContainer} ${styles.myWorkout}`}
                >
                  <div className={styles.workout}>
                    <div className={styles.workoutHeader}>
                      <div className={styles.postHeader}>
                        <AccountCircleIcon
                          id={styles.icon}
                          sx={{
                            color: "#fafafa",
                            height: "40px",
                            width: "40px",
                          }}
                        />
                        <p className={styles.feedUsername}>
                          {workout.username ? workout.username : user.username}
                        </p>
                      </div>
                      <p className={styles.date}>{workout.date}</p>
                    </div>
                    <div className={styles.postContent}>
                      <div className={styles.details}>
                        <p className={styles.routine}>{workout.routine}</p>
                        <div className={styles.duration}>
                          <TimerIcon
                            sx={{
                              color: "#fafafa",
                              height: "20px",
                              width: "20px",
                            }}
                          />
                          <p>{workout.duration} minutes</p>
                        </div>
                      </div>
                      <p>{workout.notes}</p>
                      <button
                        className={styles.viewWorkoutBtn}
                        value={workout.id}
                        onClick={(e) => {
                          handleModalClick(
                            e,
                            workout.username,
                            workout.duration,
                            workout.date,
                            workout.routine
                          );
                        }}
                      >
                        View Workout
                      </button>

                      <FavoriteIcon
                        className={liked ? classes.heart : ""}
                        onClick={() => {
                          handleLikeClick(workout.id);
                          // getLikes(workout.id);
                          // console.log(likes);
                        }}
                      />
                    </div>
                    <div>
                      {likes[workout.id] && likes[workout.id] > 0
                        ? likes[workout.id] === 1
                          ? `${likes[workout.id]} like`
                          : `${likes[workout.id]} likes`
                        : ""}
                    </div>
                  </div>
                </div>
              ))}
              <p className={styles.endOfFeed}>
                <span>You&apos;ve reached the end!</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// const getLikes = async (id) => {
//   const { data, error } = await supabase
//     .from("likes")
//     .select("*")
//     .eq("workout_id", id);
//   if (data) {
//     const newState = { ...likes, [id]: { WLikes: data.length, liked: true } };
//     setLikes(newState);
//   }
// };
