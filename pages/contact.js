import Head from "next/head";
import styles from "@/styles/Contact.module.css";
import Navbar from "@/comps/Navbar";
import { Box, Link, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Peak | Contact</title>
      </Head>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.header}>
          <p>
            You should&apos;t put your health on hold. So we won&apos;t either!
          </p>
        </div>
        <div className={styles.content}>
          <div className={styles.contact}>
            <p className={styles.contactHeader}>Contact Us</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className={styles.contactInfo}>
            <p>help.peak@gmail.com</p>
            <div className={styles.contactIcons}>
              <Box
                sx={{
                  display: "flex",
                  margin: "0 30px 0 15px",
                  justifyContent: "center",
                }}
              >
                <IconButton aria-label="instagram">
                  <Link
                    color="inherit"
                    //   href="https://github.com/capstone-peak"
                    target="_blank"
                  >
                    <InstagramIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
                <IconButton aria-label="facebook">
                  <Link
                    color="inherit"
                    //   href="https://github.com/capstone-peak"
                    target="_blank"
                  >
                    <FacebookIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
                <IconButton aria-label="twitter">
                  <Link
                    color="inherit"
                    //   href="https://github.com/capstone-peak"
                    target="_blank"
                  >
                    <TwitterIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
                <IconButton aria-label="github">
                  <Link
                    color="inherit"
                    href="https://github.com/capstone-peak"
                    target="_blank"
                  >
                    <GitHubIcon sx={{ color: "#E8E8E8" }} />
                  </Link>
                </IconButton>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
