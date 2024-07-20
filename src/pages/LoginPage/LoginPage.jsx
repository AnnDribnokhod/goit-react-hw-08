import LoginForm from "../../forms/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";
import Animation from "../../components/Animation/Animation";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.animation}>
        <Animation />
      </div>

      <LoginForm />
    </div>
  );
}
