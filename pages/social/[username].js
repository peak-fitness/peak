import supabase from "../../lib/supabaseClient.js";
import { useRouter } from "next/router";

import { Container, Box, Button } from "@mui/material";

export default function Public_Profile(props) {
  const { profile } = props;
  console.log(profile);
  return (
    <Container
      maxWidth="lg"
      sx={{ backgroundColor: "#262626", borderRadius: "8px" }}
    >
      <Box>
        <Box>
          <h3>{profile.first_name + " " + profile.last_name}</h3>
          <h4>{"@" + profile.username}</h4>
        </Box>
        <Box>
          <Button variant="contained">ADD</Button>
          <Button variant="contained">SHARE</Button>
        </Box>
      </Box>
      <Box></Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.query;
  const { data } = await supabase
    .from("user")
    .select(
      "username, first_name, last_name, height, current_weight, age, gender, location, bio, social_medias"
    )
    .eq("username", username)
    .single();
  return { props: { profile: data } };
}
