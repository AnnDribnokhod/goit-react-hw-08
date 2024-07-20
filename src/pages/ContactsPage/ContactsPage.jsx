import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, selectError } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import { TailSpin } from "react-loader-spinner";
import ContactForm from "../../forms/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import styles from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <div className={styles.container}>
        <ContactForm />
        <SearchBox />
      </div>
      {isLoading && (
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="white"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {isError && (
        <div className={styles.error}>
          Oops... Something went wrong. Try reload page.
        </div>
      )}
      <ContactList />
    </div>
  );
}
