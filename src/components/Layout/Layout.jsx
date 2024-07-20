import AppBar from "../AppBar/AppBar";
import styles from "./Layout.module.css";
import Animation from "../../components/Animation/Animation";
export default function Layout({ children }) {
  return (
    <div>
      <div className={styles.container}>
        <AppBar />
        {children}
      </div>
    </div>
  );
}
