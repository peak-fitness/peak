import { supabase } from "./../lib/supabaseClient";

function Hello({ user }) {
  console.log({ user });
  return <h1>TEAM PEAK ex-Sweat Center</h1>;
}

export async function getStaticProps() {
  let { data: user } = await supabase.from("user").select("*");
  return {
    props: {
      user,
    },
  };
}

export default Hello;
