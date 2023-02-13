import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/styles/ConfirmationModal.module.css";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function LikedUsersModal({
  setShowLikeModal,
  currentLikedUsers,
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
        .select("username, id")
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
          <div className={styles.modalBody}>
            <ul>
              {usernames.map((user) => {
                return (
                  <>
                    <div key={user.id}>
                      <Link href={`/social/${user.username}`}>
                        {user.username}
                      </Link>
                    </div>
                  </>
                );
              })}
            </ul>
            <hr />
          </div>
          <div className={styles.modalFooter}>
            <button
              className={`${styles.modalBtn} ${styles.modalCancel}`}
              onClick={handleDeleteFalse}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
