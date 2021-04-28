import classes from "./Header.module.css";
import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



const Header = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const stateSigned = useSelector((state) => state.episodes.signedIn);

  const searchValueChangeHandler = (e) =>{
      setSearchValue(e.target.value)
  }

  return (
    <div className = {classes.Header}>
      {stateSigned && (
          <Fragment>
        <div className = {classes.Search}>
          <label htmlFor="searchBox">Search your favourite character</label>
          <input
            value={searchValue}
            onChange={searchValueChangeHandler}
          ></input>
          <Link to = {`/search/${searchValue}`} className = {classes.Link} onClick={()=>setSearchValue('')}>Search</Link>
        </div>
      
      <div className={classes.Logout}>
        <p></p>
        <button onClick={props.clicked}>Logout</button>
      </div>
      </Fragment>)}
    </div>
  );
};

export default Header;
