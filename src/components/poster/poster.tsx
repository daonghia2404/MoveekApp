import React, { useState, useEffect } from "react";
import "./poster.scss";
import { StarFillIcon, StarHalfIcon, StarIcon } from "components/icons/icons";
import { Link } from "react-router-dom";
import classNames from "classnames";
import MockupPoster from "assets/images/poster-mockup.jpg";

type Props = {
  id: number;
  image: any;
  name: string;
  genreID: any;
  vote: number;
};

export const Poster = ({ id, image, name, genreID, vote }: Props) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=6434393eb85c0d17f40be4663df87e11&language=en-US"
      )
        .then((res) => res.json())
        .then((data) => setGenres(data.genres));
    };
    getGenres();
  }, []);

  return (
    <Link
      draggable="false"
      to={`/movie-detail/${id}`}
      key={id}
      className={classNames("poster", { loaded: !id })}
    >
      <div className="poster-image">
        {image === "https://image.tmdb.org/t/p/w500null" ? (
          <img src={MockupPoster} alt="" />
        ) : (
          <img src={image} alt="" />
        )}
      </div>
      <h4 className="poster-title">{name}</h4>
      <div className="poster-genre">
        {genreID.length === 0 ? (
          <p>No genre.</p>
        ) : (
          Object.keys(genreID).map((key: any) =>
            genres.map(
              (genre: any) =>
                genre.id === genreID[key] && <p key={genre.id}>{genre.name}</p>
            )
          )
        )}
      </div>
      <div className="rating">
        {Math.floor(vote / 2) < 1 && <StarIcon />}

        {Math.floor(vote / 2) >= 1 && <StarFillIcon />}
        {Math.floor(vote / 2) >= 2 && <StarFillIcon />}
        {Math.floor(vote / 2) >= 3 && <StarFillIcon />}
        {Math.floor(vote / 2) >= 4 && <StarFillIcon />}
        {Math.floor(vote / 2) >= 5 && <StarFillIcon />}

        {(vote / 2) % Math.floor(vote / 2) >= 0.5 && <StarHalfIcon />}

        {`(${vote})`}
      </div>
    </Link>
  );
};
