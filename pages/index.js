// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "../comps/Navbar";
import { Container, Box, Grid } from "@mui/material";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid>
          <h1>Accountability, fitness, and hitting PRs.</h1>
          <p>
            MVP Statement here maybe. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </Grid>
      </Container>
    </div>
  );
}
