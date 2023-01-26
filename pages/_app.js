import "@/styles/globals.css";
import Layout from "@/comps/Layout";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#161616",
    },
    secondary: {
      main: "#E8E8E8",
    },
    contrast: {
      main: "#03DAC5",
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Layout>
  );
}
