import { supabase } from "../../lib/supabaseClient.js";
import { useEffect, useState } from "react";
import Navbar from "../../comps/Navbar";
import { useRouter } from "next/router";

// import { Container, Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Container";
import Button from "@mui/material/Container";

export default function Public_Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const getProfile = async () => {
    const { username } = await router.query;

    const { data, error } = await supabase
      .from("user")
      .select(
        "username, first_name, last_name, height, current_weight, age, gender, location, bio, social_medias"
      )
      .eq("username", username)
      .single();
    console.log(data, "line 25");
    if (error) {
      setError(error);
    } else {
      console.log(data);
      setUser(data);
    }
  };

  useEffect(() => {
    getProfile();
  }, [error]);

  console.log(user);
  return (
    <>
      {/* <div>
        <h1>{profile}</h1>
      </div> */}
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          borderRadius: "8px",
        }}
      >
        <Container sx={{ backgroundColor: "#262626", marginTop: "3rem" }}>
          {/* <Box>
            <h1>{profile}</h1>
          </Box> */}
          {user ? (
            <>
              <Box
                sx={{
                  backgroundColor: "#202020",
                  padding: "1rem",
                }}
              >
                <Box>
                  <h3>{user.first_name + " " + user.last_name}</h3>
                  <h4>{"@" + user.username}</h4>
                </Box>
                <Box>
                  <Button variant="contained">ADD</Button>
                  <Button variant="contained">SHARE</Button>
                </Box>
              </Box>
              <Box>
                <h4>Weight: {user.current_weight}</h4>
                <h4>Height: {user.height}</h4>
                <h4>Age: {user.age}</h4>
                <h4>Bio: {user.bio}</h4>
              </Box>
            </>
          ) : (
            <Box>
              <h2>User does not exist</h2>
            </Box>
          )}
        </Container>
      </Container>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { username } = context.query;
//   console.log(username);
//   // const { data } = await supabase
//   //   .from("user")
//   //   .select(
//   //     "username, first_name, last_name, height, current_weight, age, gender, location, bio, social_medias"
//   //   )
//   //   .eq("username", username)
//   //   .single();
//   return { props: { profile: username } };
// }
