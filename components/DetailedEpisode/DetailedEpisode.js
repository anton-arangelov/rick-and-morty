import React, { useEffect, useState, Fragment } from "react";
import classes from "./DetailedEpisode.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { episodesActions } from "../../store/episodes-slice.js";
import { useDispatch, useSelector } from "react-redux";
import LoopThroughSameItems from "../AllEpisodes/LookThroughSameItems/LoopThroughSameItems";
import Pagination from "../Pagination/Pagination";

const DetailedEpisode = (props) => {
  useEffect(() => {
    let updatedCharacters = [];
    const fetchCharactersHandler = async (url) => {
      const response = await axios.get(url);

      const fetchedCharacters = await response.data;
      updatedCharacters.push(fetchedCharacters);
      updatedCharacters.sort();

      dispatch(
        episodesActions.saveCharacters({
          charactersForEpisode: [...updatedCharacters],
        })
      );
    };
    try {
      allCharacters.map((el) => {
        fetchCharactersHandler(el);
        return el;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const dispatch = useDispatch();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState("1");
  const [postsPerPage] = useState("10");
  let allCharacters = [];
  const stateCharacters = useSelector((state) => state.episodes.charactersForEpisode);

  const indexOfFirstNextPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfFirstNextPost - postsPerPage;
  let currentPosts = stateCharacters.slice(
    indexOfFirstPost,
    indexOfFirstNextPost
  );
  const paginateHandler = (number) => {
    setCurrentPage(number);
  };

  useSelector((state) => state.episodes.episodes).filter((el) => {
    if (el.id === parseInt(params.id)) {
      allCharacters = el.characters;
      dispatch(
        episodesActions.selectEpisodeId({
          selectedEpisodeId: params.id,
        })
      );
    }
    return el;
  });
  return (
    <div className={classes.DetailedEpisode}>
      <p className={classes.Text}>
        Detailed information for episode #{params.id}
      </p>
      <p className={classes.Text}>
        Number of characters who have been seen in the episode:{" "}
        {allCharacters.length}
      </p>
      <p className={classes.Text}>
        All characters who have been seen in the episode are:{" "}
      </p>

      {stateCharacters ? (
        <Fragment>
          <LoopThroughSameItems
            characters={currentPosts}
            shouldNavigateOrigin = {true}
            shouldNavigateLocation = {true}
          />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={stateCharacters.length}
            paginateHandler={paginateHandler}
          />
        </Fragment>
      ) : null}
    </div>
  );
};

export default DetailedEpisode;
