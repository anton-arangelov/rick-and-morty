import React, { Fragment } from "react";
import classes from "./LoopThroughSameItems.module.css";
import { Link } from "react-router-dom";

const LoopThroughSameItems = (props) => {
  const characters = props.characters;
  return (
    <Fragment>
      {characters.map((el) => {
        return (
          <div key={el.id}>
            <div className={classes.Paragraph}>
              <div className={classes.ColumnOne}>
                <p>Name - {el.name}</p>
                <div>
                  <p>Status - {el.status}</p>
                  <p>Species - {el.species}</p>
                  {props.shouldNavigateOrigin ? (
                    <Link
                      className={classes.Link}
                      to={`/origin/${el.id}`}
                    >
                      Origin - {el.origin.name}. Click to see origin
                    </Link>
                  ) : (
                    <p>Origin - {el.origin.name}</p>
                  )}
                  {props.shouldNavigateLocation ? (
                    <Link
                      className={classes.Link}
                      to={`/location/${el.id}`}
                    >
                      Location - {el.location.name}. Click to see location
                    </Link>
                  ) : (
                    <p>Location - {el.location.name}.</p>
                  )}

                  <p>Gender - {el.gender}</p>
                </div>
              </div>
              <div className={classes.ColumnTwo}>
                <img src={el.image} alt="Image" />
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default LoopThroughSameItems;
