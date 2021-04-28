import React, {useState} from "react";
import classes from "./SearchCharacters.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoopThroughSameItems from "../AllEpisodes/LookThroughSameItems/LoopThroughSameItems";
import Pagination from "../Pagination/Pagination";

const SearchCharacters = (props) => {
  const [currentPage, setCurrentPage] = useState("1");
  const [postsPerPage] = useState("10");
  let searchResultArray = [];
  const params = useParams().searchValue;
  const stateAllCharacters = useSelector(
    (state) => state.episodes.allCharacters
  );
  
  stateAllCharacters.map((el) => {
    if (el.name.toLowerCase().includes(params.toLowerCase())) {
      searchResultArray.push(el);
      return el.name
    }
  });

  const indexOfFirstNextPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfFirstNextPost - postsPerPage;
  let currentPosts = searchResultArray.slice(
    indexOfFirstPost,
    indexOfFirstNextPost
  );

  const paginateHandler = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className = {classes.Search}>
        <p className = {classes.Text}>Your results:</p>
      <LoopThroughSameItems
        characters={currentPosts}
        toOrigin={`/origin/`}
        toLocation={`/location/`}
        shouldNavigateOrigin={true}
        shouldNavigateLocation={true}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={searchResultArray.length}
        paginateHandler={paginateHandler}
      />
    </div>
  );
};

export default SearchCharacters;
