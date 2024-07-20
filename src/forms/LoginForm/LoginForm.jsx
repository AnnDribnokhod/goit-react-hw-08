import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>Log In</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isValid, dirty }) => (
          <Form className={styles.form} autoComplete="off">
            <label className={styles.label}>
              Email
              <Field type="email" name="email" className={styles.input} />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </label>
            <label className={styles.label}>
              Password
              <Field type="password" name="password" className={styles.input} />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </label>
            <button
              type="submit"
              className={styles.button}
              disabled={!(isValid && dirty)}>
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
