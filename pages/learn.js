import Head from "next/head";
import styles from "@/styles/Learn.module.css";
import Navbar from "@/comps/Navbar";
import GroupIcon from "@mui/icons-material/Group";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalculateIcon from "@mui/icons-material/Calculate";

export default function Learn() {
  return (
    <>
      <Head>
        <title>Peak | Learn</title>
      </Head>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.learnHeader}>
          <p className={styles.learnSlogan}>
            Finally, you don&apos;t have to use three apps to do what you want.
          </p>
          <p>
            Peak let&apos;s you do everything you need to in one space so you
            don&apos;t have to hunt for your things. We handle the clutter, you
            enjoy the experience.
          </p>
        </div>
        <div className={styles.content}>
          <div className={styles.whyContent}>
            <p className={styles.contentHeader}>Why Peak?</p>
            <p>
              As lifters, we recognize the need to streamline the way we record
              our workouts. Our unique feed system allows users to share their
              lifts with friends, promoting accountability and growth. This, in
              tandem with our various tracking features, makes Peak the ultimate
              comprehensive workout bookkeeping experience.
            </p>
          </div>
          <div className={styles.offerContent}>
            <p className={styles.contentHeader}>What we offer</p>
            <div className={styles.services}>
              <div className={styles.service}>
                <GroupIcon
                  color="secondary"
                  fontSize="large"
                  sx={{ height: "80px", width: "80px" }}
                />
                <p className={styles.serviceHeader}>Accountability Groups</p>
                <p>
                  Find other passionate people to keep you going to the gym!
                </p>
              </div>
              <div className={styles.service}>
                <CalculateIcon
                  color="secondary"
                  fontSize="large"
                  sx={{ height: "80px", width: "80px" }}
                />
                <p className={styles.serviceHeader}>Calorie Tracker</p>
                <p>
                  Need to keep track of calorie intake to diet or get big? We
                  have you covered.
                </p>
              </div>
              <div className={styles.service}>
                <FitnessCenterIcon
                  color="secondary"
                  fontSize="large"
                  sx={{ height: "80px", width: "80px" }}
                />
                <p className={styles.serviceHeader}>Workout Journal</p>
                <p>
                  Seeing progress is anyone&apos;s motivation for becoming
                  healthier. We make that easy for you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
