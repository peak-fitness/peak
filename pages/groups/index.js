import styles from "@/styles/Groups.module.css";
import { IconButton } from "@mui/material";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import Navbar from "@/comps/Navbar";
import { supabase } from "@/lib/supabaseClient";

export default function Groups({ data }) {
  const session = useSession();
  const supabase = useSupabaseClient();

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <>
      <Navbar />
      {console.log(data)}
      <div className={styles.container}>
        <div className={styles.groupContainer}>
          <p className={styles.header}>GROUPS</p>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.filler}>Filler</div>
              <div className={styles.filler}>Filler</div>
              <div className={styles.filler}>Filler</div>
            </div>
            <div className={styles.groupsContainer}>
              <div className={styles.groups}>
                {/* CREATE GROUP */}
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AddCircleOutlinedIcon
                      sx={{ color: "#262626", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Create Group</p>
                  <p className={styles.members}></p>
                </a>
                {/* GROUP 1 */}
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#843732", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>The Boys</p>
                  <p className={styles.members}>8 members</p>
                </a>
                {data &&
                  data.map((group) => (
                    <a
                      key={group.id}
                      href="/groups/:id"
                      className={styles.group}
                    >
                      <IconButton aria-label="group-icon">
                        <AccountCircleIcon
                          sx={{
                            color: "#843732",
                            height: "80px",
                            width: "80px",
                          }}
                        />
                      </IconButton>
                      <p className={styles.groupName}>{group.name}</p>
                      <p className={styles.members}>
                        {group.members.length} members
                      </p>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("groups")
    .select("*, members (*) ");
  console.log("ERROR", error);

  // {
  //   created_at: "2023-02-02T17:19:28.022418+00:00";
  //   desc: "A test description";
  //   id: 1;
  //   name: "test group";
  //   --include statement--
  //   members: [{}, {}]
  // }

  // const {data, error} = await supabase.from("group members").
  return { props: { data } };
}
