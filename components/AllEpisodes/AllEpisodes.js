import React, { Fragment, useState } from "react";
import classes from "./AllEpisodes.module.css";
import Episode from "../Episode/Episode.js";
import Pagination from "../Pagination/Pagination.js";

import { useSelector } from "react-redux";

const AllEpisodes = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const stateEpisodes = useSelector((state) => state.episodes.episodes);

  const indexOfFirstNextPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfFirstNextPost - postsPerPage;
  let currentPosts = stateEpisodes.slice(
    indexOfFirstPost,
    indexOfFirstNextPost
  );

  const paginateHandler = (number) => {
    setCurrentPage(number);
  };
  return (
    <Fragment>
      <div className={classes.Episodes}>
        {currentPosts.map((episode) => {
          return (
            <Episode
              key={episode.id}
              id={episode.id}
              name={episode.name}
              airDate={episode.air_date}
            />
          );
        })}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={stateEpisodes.length}
        paginateHandler={paginateHandler}
      />
    </Fragment>
  );
};

export default AllEpisodes;
