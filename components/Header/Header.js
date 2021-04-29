import classes from "./Header.module.css";
import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

const Header = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const stateSigned = useSelector((state) => state.episodes.signedIn);
  const history = useHistory();

  const searchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };
  const searchHandler = () => {
    if (searchValue.trim().length === 0) {
      return ``;
    } else {
      return `/search/${searchValue}`;
    }
  };

  const clicked = (e) => {
    e.preventDefault();
    setSearchValue("");
    history.push(searchHandler());
  };

  // const keyPress = (e) => {
  //   console.log('herer')
  //   if (e.code === 'Enter') {
  //   console.log('herer')
  //     clicked();
  //   }
  // };

  return (
    <div className={classes.Header}>
      {stateSigned && (
        <Fragment>
          <form className={classes.Search} onSubmit={clicked}>
            <label htmlFor="searchBox">Search your favourite character</label>
            <input
              value={searchValue}
              onChange={searchValueChangeHandler}
            ></input>
            <button className={classes.Link}>
              Search
            </button>
          </form>

          <div className={classes.Logout}>
            <p></p>
            <button className={classes.Button} onClick={props.clicked}>Logout</button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Header;
