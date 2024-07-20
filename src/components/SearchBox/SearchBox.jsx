// src/components/SearchBox/SearchBox.jsx
import React from "react";
import styles from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";
export default function SearchBox() {
  const filterValue = useSelector(selectNameFilter);

  const dispatch = useDispatch();

  const handleFilterValue = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.container}>
      <label htmlFor="search">Find contacts by name</label>
      <input
        type="text"
        id="search"
        value={filterValue}
        onChange={handleFilterValue}
        className={styles.input}
      />
    </div>
  );
}
