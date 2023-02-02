import styles from "@/styles/Groups.module.css";
import { IconButton } from "@mui/material";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import Navbar from "@/comps/Navbar";

export default function Groups() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <>
      <Navbar />
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
                {/* map over all groups */}
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
                {/* GROUP 2 */}
                <a href="/groups/:id" className={styles.group}>
                  <div className={styles.notification}>
                    <IconButton aria-label="group-icon">
                      <CircleIcon
                        sx={{ color: "#03DAC5", height: "15px", width: "15px" }}
                      />
                    </IconButton>
                  </div>
                  <div className={styles.groupContent}>
                    <IconButton aria-label="group-icon">
                      <AccountCircleIcon
                        sx={{ color: "#348432", height: "80px", width: "80px" }}
                      />
                    </IconButton>
                    <p className={styles.groupName}>Fitness Club</p>
                    <p className={styles.members}>120 members</p>
                  </div>
                </a>
                {/* GROUP 3 */}
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
                {/* GROUP 3 */}
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
                <a href="/groups/:id" className={styles.group}>
                  <IconButton aria-label="group-icon">
                    <AccountCircleIcon
                      sx={{ color: "#328466", height: "80px", width: "80px" }}
                    />
                  </IconButton>
                  <p className={styles.groupName}>Work Group</p>
                  <p className={styles.members}>56 members</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
