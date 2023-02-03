import styles from "@/styles/Groups.module.css";
import { IconButton } from "@mui/material";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import Navbar from "@/comps/Navbar";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

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
                <Link href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AddCircleOutlinedIcon
                      sx={{ color: "#262626", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Create Group</p>
                  <p className={styles.members}></p>
                </Link>
                {/* GROUP 1 */}
                <Link href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#843732", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>The Boys</p>
                  <p className={styles.members}>8 members</p>
                </Link>
                {data &&
                  data.map((group) => (
                    <Link
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
                    </Link>
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

  // search functionality
  // create group button functionality
  // single group view page
  // content??
  // admins
  // edit settings (name, description)
  // edit users
  // add other admins?
  // creator???

  // const {data, error} = await supabase.from("group members").
  return { props: { data } };
}
