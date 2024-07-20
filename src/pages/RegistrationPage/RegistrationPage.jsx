import RegistrationForm from "../../forms/RegistrationForm/RegistrationForm";
import styles from "./RegistrationPage.module.css";
import Animation from "../../components/Animation/Animation";
export default function RegistrationPage() {
  return (
    <div className={styles.container}>
      <div className={styles.animation}>
        <Animation />
      </div>

      <RegistrationForm />
    </div>
  );
}
