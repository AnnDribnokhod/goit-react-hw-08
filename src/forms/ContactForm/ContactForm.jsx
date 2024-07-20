import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";
export default function ContactForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() =>
        toast("The contact was successfully created.", {
          duration: 1000,
          position: "top-center",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        })
      )
      .catch((err) => console.log(err));
    resetForm();
  };

  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Must be at least 3 characters")
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    number: Yup.string().required("Required"),
  });

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isValid, dirty }) => (
          <Form className={styles.form}>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <Field name="name" type="text" className={styles.input} />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="number">
                Number
              </label>
              <Field name="number" type="text" className={styles.input} />
              <ErrorMessage
                name="number"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
                type="submit"
                className={styles.button}
                disabled={!(isValid && dirty)}>
                Add contact
              </button>
              <Toaster />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
