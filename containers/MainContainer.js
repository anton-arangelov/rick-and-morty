import React, { Fragment, useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import classes from "./MainContainer.module.css";
import DetailedEpisode from "../components/DetailedEpisode/DetailedEpisode.js";
import { useSelector, useDispatch } from "react-redux";
import { episodesActions } from "../store/episodes-slice.js";
import axios from "axios";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import AllEpisodes from "../components/AllEpisodes/AllEpisodes";
import Origin from "../components/Origin/Origin.js";
import Location from "../components/Location/Location.js";
import SearchCharacters from "../components/SearchCharacters/SearchCharacters";
import Spinner from "../ui/Spinner";

const MainContainer = (props) => {
  const [value, setValue] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);

  const dispatch = useDispatch();
  const stateEpisodes = useSelector((state) => state.episodes.episodes);
  const stateSigned = useSelector((state) => state.episodes.signedIn);

  const history = useHistory();

  let updatedEpisodes = [];
  let updatedCharacters = [];

  useEffect(() => {
    const fetchEpisodesHandler = async (url) => {
      const response = await axios.get(url);

      const fetchedEpisode = await response.data;
      updatedEpisodes.push(fetchedEpisode);
      updatedEpisodes.sort((a, b) => {
        return a.id - b.id;
      });
      dispatch(
        episodesActions.saveEpisodes({
          episodes: [...updatedEpisodes],
        })
      );
    };

    const fetchCharactersHandler = async (url) => {
      const response = await axios.get(url);

      const fetchedCharacter = await response.data;
      updatedCharacters.push(fetchedCharacter);
      dispatch(
        episodesActions.saveAllCharacters({
          allCharacters: [...updatedCharacters],
        })
      );
    };

    try {
      for (let i = 1; i <= 41; i++) {
        fetchEpisodesHandler("https://rickandmortyapi.com/api/episode/" + i);
      }
      for (let i = 1; i <= 671; i++) {
        fetchCharactersHandler(
          "https://rickandmortyapi.com/api/character/" + i
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  let existingUsersArray = [];
  let savedUsers = JSON.parse(localStorage.getItem("users")) || "";
  savedUsers.split(",").map((el) => {
    return existingUsersArray.push(el);
  });
  //   checking for already stored names
  // console.log(existingUsersArray);

  const changeValueHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let letters = /^[A-Za-z]+$/;
    let userExists = existingUsersArray.find((el) => {
      return el === value;
    });
    if (userExists) {
      alert("This user already exists");
      return;
    }
    if (value.match(letters)) {
      setInvalidUsername(false);

      dispatch(
        episodesActions.handleStateLogin({
          status: true,
        })
      );

      if (localStorage.length > 0) {
        savedUsers = savedUsers.concat(`,${value}`);
      } else {
        savedUsers = value;
      }
      localStorage.setItem("users", JSON.stringify(savedUsers));
    }
    setInvalidUsername(true);
  };

  const logoutHandler = () => {
    let deletedItem = existingUsersArray.indexOf(value);
    existingUsersArray.splice(deletedItem, 1);

    localStorage.setItem(
      "users",
      JSON.stringify(existingUsersArray.toString())
    );
    dispatch(
      episodesActions.handleStateLogin({
        status: false,
      })
    );
    setInvalidUsername(false);
    setValue("");

    history.push("/");
  };

  return (
    <Fragment>
      <Header clicked={logoutHandler} />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
            {!stateSigned ? (
              <Fragment>
                <Login
                  submited={submitHandler}
                  value={value}
                  changed={changeValueHandler}
                />
                {invalidUsername && (
                  <p className={classes.P}>
                    Username should include only english alphabetic characters
                  </p>
                )}
              </Fragment>
            ) : (
              <Fragment>
                {stateEpisodes ? <AllEpisodes /> : <Spinner />}
              </Fragment>
            )}
        </Route>

        <Route path={`/origin/:charId`} exact>
          <Origin />
        </Route>
        <Route path={`/location/:charId`} exact>
          <Location />
        </Route>
        <Route path="/search/:searchValue" exact>
          <SearchCharacters />
        </Route>
        <Route path="/detail/:id" exact>
          <DetailedEpisode />
        </Route>
        <Route path="*">
          <h1>Page not found</h1>
        </Route>
      </Switch>
    </Fragment>
  );
};

export default MainContainer;
