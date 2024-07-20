import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import styles from "./UserMenu.module.css";
import { IoMdLogOut } from "react-icons/io";
export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={styles.wrapper}>
      <p className={styles.username}>Welcome, {user.name}</p>
      <button
        className={styles.button}
        type="button"
        onClick={() => dispatch(logOut())}>
        Logout
        <IoMdLogOut />
      </button>
    </div>
  );
}
