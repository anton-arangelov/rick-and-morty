import React from "react";
import classes from "./Pagination.module.css";

const Pagination = (props) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={classes.Pagination}>
      {pageNumbers.map((el) => {
        return (
          <button
            key={el}
            className={classes.Element}
            onClick={() => props.paginateHandler(el)}
          >
            {el}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
