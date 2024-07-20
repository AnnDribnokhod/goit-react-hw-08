import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import styles from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log("RegistrationForm", values);
    dispatch(register(values))
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
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
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ isValid, dirty }) => (
        <Form className={styles.form} autoComplete="off">
          <div className={styles.header}>Registration form</div>
          <label className={styles.label}>
            Username
            <Field type="text" name="name" className={styles.input} />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </label>
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
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
}
