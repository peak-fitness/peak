import "@/styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Layout from "@/comps/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";

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
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <SessionContextProvider
          supabaseClient={supabase}
          initialSession={pageProps.initialSession}
        >
          <div className="main-container">
            <ToastContainer />
            <Component {...pageProps} />
          </div>
        </SessionContextProvider>
      </ThemeProvider>
    </Layout>
  );
}
