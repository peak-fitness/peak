import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/styles/LikedUsersModal.module.css";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";

export default function LikedUsersModal({
  setShowLikeModal,
  currentLikedUsers,
  user,
}) {
  const modalRef = useRef();
  const [usernames, setUsernames] = useState([]);

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowLikeModal(false);
      document.body.classList.remove("modal-open");
    }
  };

  const handleDeleteFalse = () => {
    setShowLikeModal(false);
    document.body.classList.remove("modal-open");
  };

  useEffect(() => {
    document.body.classList.add("modal-open");
  });

  const fetchUsers = useCallback(async () => {
    const usernameArr = [];
    for (const user of currentLikedUsers) {
      const { data, error } = await supabase
        .from("user")
        .select("username, id, avatar_url")
        .match({ id: user.user_id })
        .single();
      usernameArr.push(data);
    }
    setUsernames(usernameArr);
  }, [currentLikedUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div id={styles.modalContainer} className={styles.one}>
      <div
        onClick={closeModal}
        ref={modalRef}
        className={styles.modalBackground}
      >
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3>Likes</h3>
            <hr />
          </div>
          <div className={styles.modalBody}>
            <div className={styles.likedUsers}>
              {usernames.map((likedUser) => {
                return (
                  <div key={likedUser.id} className={styles.likedUser}>
                    <Image
                      className={styles.avatar}
                      loader={() =>
                        `https://cfbogjupbnvkonljmcuq.supabase.co/storage/v1/object/public/profile-pics/${likedUser.avatar_url}`
                      }
                      src={`https://cfbogj_upbnvkonljmcuq.supabase.co/storage/v1/object/public/profile-pics/${likedUser.avatarUrl}`}
                      width={45}
                      height={45}
                      alt="liked user profile picture"
                    />
                    <Link href={`/social/${likedUser.username}`}>
                      {likedUser.username}
                    </Link>
                    {user.id === likedUser.id ? (
                      <Link href={"/profile"} className={styles.viewMyProfile}>
                        <button>My Profile</button>
                      </Link>
                    ) : (
                      <Link
                        href={`/social/${likedUser.username}`}
                        className={styles.viewProfileBtn}
                      >
                        <button>View Profile</button>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button
              className={`${styles.modalBtn} ${styles.modalCancel}`}
              onClick={handleDeleteFalse}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
