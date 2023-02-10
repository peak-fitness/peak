import Head from "next/head";
import styles from "@/styles/About.module.css";
import Navbar from "@/comps/Navbar";
import { Link, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function About() {
  return (
    <>
      <Head>
        <title>Peak | About</title>
      </Head>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.about}>
            <div className={styles.sectionHeader}>
              <p>
                Meet our team of motivated <i>developers</i>, <i>designers</i>,
                and first-class <i>problem solvers</i>
              </p>
              <p>
                We&apos;re a group of like-minded individuals who wanted an app
                that would take care of all of our fitness needs. Our goal with
                this app is to bring more people closer to their fitness goals
                and make it a more seamless experience for our users to do what
                they love to without fighting the design.
              </p>
            </div>
          </div>
          <p className={styles.meetTeam}>Meet the team at Peak</p>
          <div className={styles.profiles}>
            <div className={styles.profile}>
              <PersonIcon color="secondary" fontSize="large" />
              <p className={styles.name}>Sean Brown</p>
              <div className={styles.socials}>
                <IconButton aria-label="linkedin">
                  <Link
                    color="inherit"
                    href="https://www.linkedin.com/in/seanbrown71/"
                    target="_blank"
                  >
                    <LinkedInIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
                <IconButton aria-label="github">
                  <Link
                    color="inherit"
                    href="https://github.com/sbrown5757"
                    target="_blank"
                  >
                    <GitHubIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
              </div>
            </div>
            <div className={styles.profile}>
              <PersonIcon color="secondary" fontSize="large" />
              <p className={styles.name}>Warren Chan</p>
              <div className={styles.socials}>
                <IconButton aria-label="linkedin">
                  <Link
                    color="inherit"
                    href="https://www.linkedin.com/in/wachan/"
                    target="_blank"
                  >
                    <LinkedInIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
                <IconButton aria-label="github">
                  <Link
                    color="inherit"
                    href="https://github.com/warrenchan13"
                    target="_blank"
                  >
                    <GitHubIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
              </div>
            </div>
            <div className={styles.profile}>
              <PersonIcon color="secondary" fontSize="large" />
              <p className={styles.name}>Bryan Olivo</p>
              <div className={styles.socials}>
                <IconButton aria-label="linkedin">
                  <Link
                    color="inherit"
                    href="https://www.linkedin.com/in/bryanolivo/"
                    target="_blank"
                  >
                    <LinkedInIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
                <IconButton aria-label="github">
                  <Link
                    color="inherit"
                    href="https://github.com/olivob"
                    target="_blank"
                  >
                    <GitHubIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
              </div>
            </div>
            <div className={styles.profile}>
              <PersonIcon color="secondary" fontSize="large" />
              <p className={styles.name}>Jahed Prince</p>
              <div className={styles.socials}>
                <IconButton aria-label="linkedin">
                  <Link
                    color="inherit"
                    href="https://www.linkedin.com/in/jahedprince/"
                    target="_blank"
                  >
                    <LinkedInIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
                <IconButton aria-label="github">
                  <Link
                    color="inherit"
                    href="https://github.com/jahedprince/"
                    target="_blank"
                  >
                    <GitHubIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
              </div>
            </div>
            <div className={styles.profile}>
              <PersonIcon color="secondary" fontSize="large" />
              <p className={styles.name}>Justin Suh</p>
              <div className={styles.socials}>
                <IconButton aria-label="linkedin">
                  <Link
                    color="inherit"
                    href="https://www.linkedin.com/in/justin-suh98/"
                    target="_blank"
                  >
                    <LinkedInIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
                <IconButton aria-label="github">
                  <Link
                    color="inherit"
                    href="https://github.com/justindjsuh"
                    target="_blank"
                  >
                    <GitHubIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
