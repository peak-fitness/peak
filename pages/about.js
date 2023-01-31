import styles from "@/styles/About.module.css";
import Navbar from "@/comps/Navbar";
import { Link, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function About() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.about}>
          <p className={styles.sectionHeader}>Who we are</p>
          <p>
            We&apos;re a group of like-minded individuals who wanted an app that
            would take care of all of our fitness needs. We found most apps to
            only have one of the many features we wanted, or none at all. Our
            goal with this app is to bring more people closer to their fitness
            goals and make it a more seamless experience for our users to do
            what they love to without fighting the design. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </div>
        <div className={styles.profiles}>
          <div className={styles.profile}>
            <PersonIcon
              color="secondary"
              fontSize="large"
              sx={{ height: "80px", width: "80px" }}
            />
            <p className={styles.name}>Sean Brown</p>
            <div className={styles.socials}>
              <IconButton aria-label="linkedin">
                <Link
                  color="inherit"
                  //   href="https://github.com/capstone-peak"
                  target="_blank"
                >
                  <LinkedInIcon sx={{ color: "#E8E8E8" }} />
                </Link>
              </IconButton>
              <IconButton aria-label="github">
                <Link
                  color="inherit"
                  //   href="https://github.com/capstone-peak"
                  target="_blank"
                >
                  <GitHubIcon sx={{ color: "#E8E8E8" }} />
                </Link>
              </IconButton>
            </div>
          </div>
          <div className={styles.profile}>
            <PersonIcon
              color="secondary"
              fontSize="large"
              sx={{ height: "80px", width: "80px" }}
            />
            <p className={styles.name}>Warren Chan</p>
            <div className={styles.socials}>
              <IconButton aria-label="linkedin">
                <Link
                  color="inherit"
                  //   href="https://github.com/capstone-peak"
                  target="_blank"
                >
                  <LinkedInIcon sx={{ color: "#E8E8E8" }} />
                </Link>
              </IconButton>
              <IconButton aria-label="github">
                <Link
                  color="inherit"
                  //   href="https://github.com/capstone-peak"
                  target="_blank"
                >
                  <GitHubIcon sx={{ color: "#E8E8E8" }} />
                </Link>
              </IconButton>
            </div>
          </div>
          <div className={styles.profile}>
            <PersonIcon
              color="secondary"
              fontSize="large"
              sx={{ height: "80px", width: "80px" }}
            />
            <p className={styles.name}>Bryan Olivo</p>
            <div className={styles.socials}>
              <IconButton aria-label="linkedin">
                <Link
                  color="inherit"
                  //   href="https://github.com/capstone-peak"
                  target="_blank"
                >
                  <LinkedInIcon sx={{ color: "#E8E8E8" }} />
                </Link>
              </IconButton>
              <IconButton aria-label="github">
                <Link
                  color="inherit"
                  //   href="https://github.com/capstone-peak"
                  target="_blank"
                >
                  <GitHubIcon sx={{ color: "#E8E8E8" }} />
                </Link>
              </IconButton>
            </div>
          </div>
          <div className={styles.profile}>
            <PersonIcon
              color="secondary"
              fontSize="large"
              sx={{ height: "80px", width: "80px" }}
            />
            <p className={styles.name}>Jahed Prince</p>
            <div className={styles.socials}>
              <IconButton aria-label="linkedin">
                <Link
                  color="inherit"
                  //   href="https://github.com/capstone-peak"
                  target="_blank"
                >
                  <LinkedInIcon sx={{ color: "#E8E8E8" }} />
                </Link>
              </IconButton>
              <IconButton aria-label="github">
                <Link
                  color="inherit"
                  //   href="https://github.com/capstone-peak"
                  target="_blank"
                >
                  <GitHubIcon sx={{ color: "#E8E8E8" }} />
                </Link>
              </IconButton>
            </div>
          </div>
          <div className={styles.profile}>
            <PersonIcon
              color="secondary"
              fontSize="large"
              sx={{ height: "80px", width: "80px" }}
            />
            <p className={styles.name}>Justin Suh</p>
            <div className={styles.socials}>
              <IconButton aria-label="linkedin">
                <Link
                  color="inherit"
                  //   href="https://github.com/capstone-peak"
                  target="_blank"
                >
                  <LinkedInIcon sx={{ color: "#E8E8E8" }} />
                </Link>
              </IconButton>
              <IconButton aria-label="github">
                <Link
                  color="inherit"
                  //   href="https://github.com/capstone-peak"
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
  );
}
