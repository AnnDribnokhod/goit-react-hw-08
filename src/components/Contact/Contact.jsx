import React from "react";
import styles from "./Contact.module.css";
import { FaUser, FaPhone } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();
  const handleDeleteContact = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() =>
        toast("The contact was successfully deleted.", {
          duration: 1000,
          position: "top-center",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        })
      )
      .catch((err) => console.log(err));
  };
  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <div className={styles.wrapper}>
          <FaUser className={styles.icon} />
          <p>{name}</p>
        </div>
        <div className={styles.wrapper}>
          <FaPhone className={styles.icon} />
          <p>{number}</p>
        </div>
      </div>
      <button className={styles.button} onClick={() => handleDeleteContact()}>
        <MdDeleteForever />
      </button>
      <Toaster />
    </li>
  );
}
