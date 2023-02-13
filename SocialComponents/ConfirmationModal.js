import { useEffect, useRef } from "react";
import styles from "@/styles/ConfirmationModal.module.css";
export default function ConfirmationModal({
  modal,
  setModal,
  handleRequestDecline,
}) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setModal(false);
      document.body.classList.remove("modal-open");
    }
  };

  const handleDeleteFalse = () => {
    setModal({ show: false, id: null, requester: "" });
    document.body.classList.remove("modal-open");
  };

  useEffect(() => {
    document.body.classList.add("modal-open");
  });

  return (
    <div id={styles.modalContainer} className={styles.one}>
      <div
        onClick={closeModal}
        ref={modalRef}
        className={styles.modalBackground}
      >
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3>Are you sure?</h3>
          </div>
          <div className={styles.modalBody}>
            <p>Another request will have to be sent if you decline.</p>
            <p>Please be sure to confirm your action before proceeding.</p>
            <hr />
          </div>
          <div className={styles.modalFooter}>
            <button
              className={`${styles.modalBtn} ${styles.modalDelete}`}
              onClick={() => handleRequestDecline(modal.id)}
            >
              Decline Request
            </button>
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
