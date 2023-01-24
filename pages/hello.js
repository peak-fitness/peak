import { supabase } from "./../lib/supabaseClient";

function Hello({ user }) {
  return (
    <div>
      <h1>TEAM PEAK ex-Sweat Center</h1>
      <h3>{user[0].first_name}</h3>
      <h3>{user[0].last_name}</h3>
    </div>
  );
}

export async function getStaticProps() {
  let { data } = await supabase.from("user").select("*");
  console.log(data);
  return {
    props: {
      user: data,
    },
  };
}

export default Hello;
