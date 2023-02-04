import { supabase } from "../../lib/supabaseClient.js";
import Navbar from "../../comps/Navbar";
import { useRouter } from "next/router";

// import { Container, Box, Button } from "@mui/material";
// import Container from "@mui/material/Container";
// import Box from "@mui/material/Container";
// import Button from "@mui/material/Container";

export default function Public_Profile(props) {
  const { profile } = props;
  return (
    <>
      <div>
        <h1>{profile}</h1>
      </div>
      {/* <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          borderRadius: "8px",
        }}
      >
        <Container sx={{ backgroundColor: "#262626", marginTop: "3rem" }}>
          <Box>
            <h1>{profile}</h1>
          </Box>
          {/* <Box
            sx={{
              backgroundColor: "#202020",
              padding: "1rem",
            }}
          >
            <Box>
              <h3>{profile.first_name + " " + profile.last_name}</h3>
              <h4>{"@" + profile.username}</h4>
            </Box>
            <Box>
              <Button variant="contained">ADD</Button>
              <Button variant="contained">SHARE</Button>
            </Box>
          </Box>
          <Box>
            <h4>Weight: {profile.current_weight}</h4>
            <h4>Height: {profile.height}</h4>
            <h4>Age: {profile.age}</h4>
            <h4>Bio: {profile.bio}</h4>
          </Box> */}
      {/* </Container> */}
      {/* </Container> } */}
    </>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.query;
  console.log(username);
  // const { data } = await supabase
  //   .from("user")
  //   .select(
  //     "username, first_name, last_name, height, current_weight, age, gender, location, bio, social_medias"
  //   )
  //   .eq("username", username)
  //   .single();
  return { props: { profile: username } };
}
